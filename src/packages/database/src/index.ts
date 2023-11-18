import { createClient } from "@libsql/client"
import { and, eq, or } from "drizzle-orm"
import { drizzle } from "drizzle-orm/libsql"

import { DATABASE_AUTH_TOKEN, DATABASE_URL } from "./env"

export const db = drizzle(
  createClient({
    url: DATABASE_URL,
    authToken: DATABASE_AUTH_TOKEN,
  }),
)

export * as schema from "./schema"
export const opperators = {
  eq,
  and,
  or,
}
