import { DATABASE_AUTH_TOKEN, DATABASE_URL } from "@like-it-wear-it/env"
import type { Config } from "drizzle-kit"

export default {
  schema: "./src/schema/*",
  out: "./src/migrations",
  driver: "turso",
  dbCredentials: {
    url: DATABASE_URL,
    authToken: DATABASE_AUTH_TOKEN,
  },
} satisfies Config
