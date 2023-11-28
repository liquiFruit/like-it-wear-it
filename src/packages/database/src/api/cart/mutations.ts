import { and, eq, sql } from "drizzle-orm"

import { db } from "../.."
import { carts } from "../../../src/schema/carts"
import { Select as Product } from "../../../src/schema/products"

const insertProductToCart = db
  .insert(carts)
  .values({
    productId: sql.placeholder("productId"),
    userId: sql.placeholder("userId"),
  })
  .prepare()

const deleteProductFromCart = db
  .delete(carts)
  .where(
    and(
      eq(carts.userId, sql.placeholder("userId")),
      eq(carts.productId, sql.placeholder("productId")),
    ),
  )
  .prepare()

export async function addProductToCart(
  userId: string,
  productId: Product["id"],
) {
  return insertProductToCart.execute({ userId, productId })
}

export async function removeProductFromCart(
  userId: string,
  productId: Product["id"],
) {
  return deleteProductFromCart.execute({ userId, productId })
}
