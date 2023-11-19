import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"

export const categories = sqliteTable("categories", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
})

export const insertSchema = createInsertSchema(categories)
export const selectSchema = createSelectSchema(categories)

export type Insert = z.infer<typeof insertSchema>
export type Select = z.infer<typeof selectSchema>
