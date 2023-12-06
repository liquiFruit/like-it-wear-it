import { join } from "path"

import { config } from "dotenv"
import { parseEnv } from "znv"
import { z } from "zod"

if (process.env["NODE_ENV"] === "development") {
  const envPath = join(new URL(import.meta.url).pathname, "../../.env").replace(
    /^\\/,
    "",
  )

  const { error } = config({ path: envPath })

  if (error) {
    console.error("Error occurred while loading env vars")
    console.log(error)
    process.exit()
  }
}

const schema = {
  DATABASE_URL: { schema: z.string().min(1) },
  DATABASE_AUTH_TOKEN: { schema: z.string().min(1) },
  PAYMENT_SESSION_TIMEOUT_MS: { schema: z.number() },
}

try {
  parseEnv(process.env, schema)
} catch (error) {
  console.error("Error processing env")
  console.log(error)

  process.exit()
}

export const { DATABASE_URL, DATABASE_AUTH_TOKEN, PAYMENT_SESSION_TIMEOUT_MS } =
  parseEnv(process.env, schema)
