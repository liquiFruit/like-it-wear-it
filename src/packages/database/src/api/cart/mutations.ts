import { sql } from "drizzle-orm"

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

export async function addProductToCart(
  userId: string,
  productId: Product["id"],
) {
  return insertProductToCart.execute({ userId, productId })
}
