import { integer, primaryKey, sqliteTable } from "drizzle-orm/sqlite-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"

import { Categories, Products } from "./"

export const productsCategories = sqliteTable(
  "products_categories",
  {
    productId: integer("product_id")
      .notNull()
      .references(() => Products.products.id, { onDelete: "cascade" }),
    categoryId: integer("category_id")
      .notNull()
      .references(() => Categories.categories.id, { onDelete: "cascade" }),
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
