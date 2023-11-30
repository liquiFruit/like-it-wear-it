import { integer, primaryKey, sqliteTable } from "drizzle-orm/sqlite-core"

import { orders } from "./orders"
import { products } from "./products"

export const orderProducts = sqliteTable(
  "order_products",
  {
    orderId: integer("order_id")
      .notNull()
      .references(() => orders.id),

    productId: integer("product_id")
      .notNull()
      .references(() => products.id),
  },
  ({ orderId, productId }) => ({
    pk: primaryKey({ name: "id", columns: [orderId, productId] }),
  }),
)
