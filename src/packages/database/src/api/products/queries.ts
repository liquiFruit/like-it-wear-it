import { eq, sql } from "drizzle-orm"

import { db } from "../.."
import { products } from "../../schema/products"

const allItemsInStock = db
  .select()
  .from(products)
  .where(sql`"products"."stock_quantity" > 0`)
  .prepare()

export async function getAllProductsInStock() {
  return await allItemsInStock.execute()
}

const byId = db
  .select()
  .from(products)
  .where(eq(products.id, sql.placeholder("id")))
  .prepare()

export async function getProductById(id: number) {
  return (await byId.execute({ id })).at(0)
}
