import { lt, sql } from "drizzle-orm"

import { and, db, eq, gte, inArray } from "../.."
import { PAYMENT_SESSION_TIMEOUT_MS } from "../../env"
import { carts } from "../../schema/carts"
import { orderProducts } from "../../schema/order-products"
import { DeliveryDetails, NewOrder, orders } from "../../schema/orders"
import { products } from "../../schema/products"

export async function tryCreateOrder(userId: string, newOrder: NewOrder) {
  try {
    const { order, paymentLink } = await db.transaction(async (tx) => {
      // Sub query representing the products in a user's cart
      const userCartProductsSq = tx
        .select({ productId: carts.productId })
        .from(carts)
        .where(eq(carts.userId, userId))

      // Get only in-stock products from a user's cart
      const availableProducts = await tx
        .select()
        .from(products)
        .where(
          and(inArray(products.id, userCartProductsSq), gte(products.stock, 1)),
        )

      // Check if there is at least one product
      if (availableProducts.length === 0)
        throw new Error("No available products in order")

      // Grab a list of the IDs
      const availableProductIds = availableProducts.map((p) => p.id)

      // Create an order from these products
      const [order] = await tx
        .insert(orders)
        .values({
          userId,
          deliveryDetails: newOrder.deliveryDetails,
          totalAmount: availableProducts.reduce(
            (res, ent) => (res += ent.price),
            newOrder.deliveryDetails.isDelivering ? 100_00 : 0,
          ),
          paymentDeadline: new Date(
            Date.now() + PAYMENT_SESSION_TIMEOUT_MS + 30_000,
          ),
        })
        .returning()

      if (!order) throw new Error("Failed to create order")

      // Remove these products from the cart,
      await tx
        .delete(carts)
        .where(
          and(
            eq(carts.userId, userId),
            inArray(carts.productId, availableProductIds),
          ),
        )

      // and add them to the order-products table
      await tx.insert(orderProducts).values(
        availableProductIds.map((pid) => ({
          orderId: order.id,
          productId: pid,
        })),
      )

      // Decrease stock by one
      await tx.update(products).set({ stock: sql`${products.stock} - 1` })

      // Create payment link and store it in its own table
      const paymentLink = await "http://google.com"

      // return the order and payment link
      return {
        order,
        paymentLink,
      }
    })

    return {
      success: true,
      order,
      paymentLink,
    }
  } catch (error) {
    // TODO: Add error handling here to report which part of the transaction failed
    return { success: false, error }
  }
}

export async function cleanUpExpiredOrders() {
  const expiredOrdersSq = db
    .select({ id: orders.id })
    .from(orders)
    .where(lt(orders.paymentDeadline, new Date()))

  const expiredOrdersProductsSq = db
    .select()
    .from(products)
    .where(
      inArray(
        products.id,
        db
          .select()
          .from(orderProducts)
          .where(inArray(orderProducts.orderId, expiredOrdersSq)),
      ),
    )

  const expireOrders = db
    .update(orders)
    .set({
      status: "EXPIRED",
    })
    .where(inArray(orders.id, expiredOrdersSq))

  const releaseProducts = db
    .update(products)
    .set({ stock: sql`${products.stock} + 1` })
    .where(inArray(products.id, expiredOrdersProductsSq))

  await db.batch([expireOrders, releaseProducts])
}
