import { join } from "path"

import { config } from "dotenv"
import { parseEnv } from "znv"
import { z } from "zod"

console.log("[ENV] Loading env...")

// Try load env vars from a file in development
if (!process.env["NODE_ENV"] || process.env["NODE_ENV"] === "development") {
  const envPath = join(
    new URL(import.meta.url).pathname,
    "../../../../.env",
  ).replace(/^\\/, "")

  const { error } = config({ path: envPath })

  if (error) {
    console.error("[ENV] Error occurred while loading env: ", error.message)
    console.error(error)
    process.exit()
  }
}

const Z_STRING = z.string().min(1)
const Z_NUMBER = z.number()

export const {} = parseEnv(process.env, {})
