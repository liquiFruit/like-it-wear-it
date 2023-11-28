import { blob, integer, sqliteTable, text } from "drizzle-orm/sqlite-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"

import { SQL_TIME_NOW } from "../util"

export const products = sqliteTable("products", {
  id: integer("id").primaryKey(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(SQL_TIME_NOW),

  name: text("name").notNull(),
  description: text("description").notNull(),

  price: integer("price_in_cents").notNull(),
  stock: integer("stock_quantity").notNull().default(1),

  images: blob("images", { mode: "json" }).notNull().$type<string[]>(),
})

export const insertSchema = createInsertSchema(products).extend({
  images: z
    .array(z.string())
    .min(1, { message: "Requires at least one image." }),
})
export const selectSchema = createSelectSchema(products).extend({
  images: z.array(z.string()).min(1),
})

export type Insert = z.infer<typeof insertSchema>
export type Select = z.infer<typeof selectSchema>
