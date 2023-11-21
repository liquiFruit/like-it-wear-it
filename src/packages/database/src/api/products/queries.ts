import { eq, sql } from "drizzle-orm"

import { db, schema } from "../.."

const allItemsInStock = db
  .select()
  .from(schema.Products.products)
  .where(sql`"products"."stock_quantity" > 0`)
  .prepare()

export async function getAllProductsInStock() {
  return await allItemsInStock.execute()
}

const byId = db
  .select()
  .from(schema.Products.products)
  .where(eq(schema.Products.products.id, sql.placeholder("id")))
  .prepare()

export async function getProductById(id: number) {
  return (await byId.execute({ id })).at(0)
}
