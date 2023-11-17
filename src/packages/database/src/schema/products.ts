import { sql } from "drizzle-orm"
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

export const table = sqliteTable("products", {
  id: integer("id").primaryKey(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),

  name: text("name").notNull(),
  description: text("name").notNull(),

  price: integer("price_in_cents").notNull(),
  stock: integer("stock_quantity").notNull().default(1),
})

export const insertSchema = createInsertSchema(table)
export const selectSchema = createSelectSchema(table)

export type Insert = typeof insertSchema._type
export type Select = typeof selectSchema._type
