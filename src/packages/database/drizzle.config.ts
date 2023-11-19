import type { Config } from "drizzle-kit"

import { DATABASE_AUTH_TOKEN, DATABASE_URL } from "./src/env"

export default {
  schema: "./src/schema/*",
  out: "./src/migrations",
  driver: "turso",
  dbCredentials: {
    url: DATABASE_URL,
    authToken: DATABASE_AUTH_TOKEN,
  },
} satisfies Config
