import { createClient } from "@libsql/client"
import { DATABASE_AUTH_TOKEN, DATABASE_URL } from "@like-it-wear-it/env"
import { drizzle } from "drizzle-orm/libsql"

import { categories } from "./schema/categories"
import { productsCategories } from "./schema/product-category"
import { products } from "./schema/products"

export const db = drizzle(
  createClient({
    url: DATABASE_URL,
    authToken: DATABASE_AUTH_TOKEN,
  }),
  {
    logger: true,
    schema: {
      products,
      categories,
      productsCategories,
    },
  },
)

export { and, eq, or, inArray, gte } from "drizzle-orm"
