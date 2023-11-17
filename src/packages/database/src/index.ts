import { createClient } from "@libsql/client"
import { drizzle } from "drizzle-orm/libsql"

import { DATABASE_AUTH_TOKEN, DATABASE_URL } from "./env"
import * as schema from "./schema"

export const db = drizzle(
  createClient({
    url: DATABASE_URL,
    authToken: DATABASE_AUTH_TOKEN,
  }),
  {
    schema,
  },
)
