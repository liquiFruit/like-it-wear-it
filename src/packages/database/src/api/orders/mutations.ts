import { PAYMENT_SESSION_TIMEOUT_MS } from "@like-it-wear-it/env"
import { and, eq, gte, inArray, lt, sql } from "drizzle-orm"

import { db } from "../.."
import { carts } from "../../schema/carts"
import { orderProducts } from "../../schema/order-products"
import { DeliveryDetails, orders } from "../../schema/orders"
import { Select as Product, products } from "../../schema/products"

export async function tryCreateOrder(
  userId: string,
  deliveryDetails: DeliveryDetails,
  productIds: Product["id"][],
) {
  try {
    const { order, paymentLink } = await db.transaction(async (tx) => {
      // Sub query representing the products in a user's cart
      const userCartProductsSq = tx
        .select({ productId: carts.productId })
        .from(carts)
        .where(
          and(eq(carts.userId, userId), inArray(carts.productId, productIds)),
        )

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
          deliveryDetails: deliveryDetails,
          totalAmount: availableProducts.reduce(
            (res, ent) => (res += ent.price),
            deliveryDetails.isDelivering ? 100_00 : 0,
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
      await tx
        .update(products)
        .set({ stock: sql`${products.stock} - 1` })
        .where(inArray(products.id, availableProductIds))

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
  try {
    const res = await db.transaction(async (tx) => {
      // Get orders than are expired
      const expiredOrders = await tx
        .select({ id: orders.id })
        .from(orders)
        .where(
          and(
            // Only orders that are unpaid can be expired
            eq(orders.status, "UNPAID"),

            // Dates are stored as numbers and can be compared as such
            lt(orders.paymentDeadline, new Date()),
          ),
        )

      // Return early if there are no expired orders
      if (expiredOrders.length === 0) return "No expired orders" as const

      // Get a list of expired order IDs
      const expiredOrderIds = expiredOrders.map((eo) => eo.id)

      // Mark these orders as expired
      // const expireOrdersRes =
      await tx
        .update(orders)
        .set({
          status: "EXPIRED",
        })
        .where(inArray(orders.id, expiredOrderIds))

      // Get a list of products from expired orders, and the respective amount of stock
      const expiredProducts = await tx
        .select({
          id: orderProducts.productId,
          amount: sql<number>`count(*)`.as("amount"),
        })
        .from(orderProducts)
        .where(inArray(orderProducts.orderId, expiredOrderIds))
        .groupBy(orderProducts.productId)

      // Update these products' stock by the respective amounts
      // TODO: Batch these updates somehow
      expiredProducts.forEach(async (ep) => {
        await tx
          .update(products)
          .set({ stock: sql`${products.stock} + ${ep.amount}` })
          .where(eq(products.id, ep.id))
      })

      return `Successfully released ${expiredProducts.reduce(
        (res, ent) => res + ent.amount,
        0,
      )} item/s of stock.` as const
    })

    return { success: true, result: res }
  } catch (error) {
    return { success: false, error }
  }
}
