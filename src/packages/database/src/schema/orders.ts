import { blob, integer, sqliteTable, text } from "drizzle-orm/sqlite-core"
import { createInsertSchema, createSelectSchema, jsonSchema } from "drizzle-zod"
import { z } from "zod"

import { SQL_TIME_NOW } from "../util"
import { users } from "./auth"
import { selectSchema as selectProductSchema } from "./products"

export const orders = sqliteTable("orders", {
  id: integer("id").primaryKey(),

  userId: text("user_id")
    .notNull()
    .references(() => users.id),

  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(SQL_TIME_NOW),

  totalAmount: integer("total_amount").notNull(),

  deliveryDetails: blob("deliveryDetails", { mode: "json" })
    .notNull()
    .$type<DeliveryDetails>(),

  /**
   * Create a hard cutoff timestamp indicating when the order must be paid by.
   */
  paymentDeadline: integer("payment_deadline", { mode: "timestamp" }).notNull(),
})

export const deliveryDetailsSchema = z.union([
  z.object({
    isDelivering: z.literal(false),
    details: z.undefined(),
  }),

  z.object({
    isDelivering: z.literal(true),
    details: z.object({
      address: z.string(),
      instructions: z.string(),
    }),
  }),
])
export type DeliveryDetails = z.infer<typeof deliveryDetailsSchema>

export const insertOrderSchema = createInsertSchema(orders).extend({
  deliveryDetails: deliveryDetailsSchema,
  totalAmount: z.undefined(),
  paymentDeadline: z.undefined(),
  userId: z.undefined(),
})

export const selectOrderSchema = createSelectSchema(orders).extend({
  products: z.array(selectProductSchema),
  deliveryDetails: deliveryDetailsSchema,
})

export type NewOrder = z.infer<typeof insertOrderSchema>
export type Order = z.infer<typeof selectOrderSchema>
