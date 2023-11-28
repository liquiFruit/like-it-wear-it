import { sql } from "drizzle-orm"
import { integer, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

import { users } from "./auth"
import { Select as Product, products } from "./products"

export const carts = sqliteTable(
  "carts",
  {
    productId: integer("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),

    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),

    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .notNull()
      .default(sql`(strftime('%s', 'now'))`),
  },
  (table) => ({
    pk: primaryKey({
      name: "id",
      columns: [table.productId, table.userId],
    }),
  }),
)

export const insertSchema = createInsertSchema(carts)
export const selectSchema = createSelectSchema(carts)

export type CartProduct = Product & {
  addedAt: (typeof selectSchema._type)["createdAt"]
}
