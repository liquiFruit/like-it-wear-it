import { integer, primaryKey, sqliteTable } from "drizzle-orm/sqlite-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"

import { categories } from "./categories"
import { products } from "./products"

export const productsCategories = sqliteTable(
  "products_categories",
  {
    productId: integer("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    categoryId: integer("category_id")
      .notNull()
      .references(() => categories.id, { onDelete: "cascade" }),
  },
  (table) => ({
    pk: primaryKey({
      name: "id",
      columns: [table.productId, table.categoryId],
    }),
  }),
)

export const insertSchema = createInsertSchema(productsCategories)
export const selectSchema = createSelectSchema(productsCategories)

export type Insert = z.infer<typeof insertSchema>
export type Select = z.infer<typeof selectSchema>
