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

export const {
  DATABASE_AUTH_TOKEN,
  DATABASE_URL,
  PAYMENT_SESSION_TIMEOUT_MS,
  NEXTAUTH_SECRET,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  NEXTAUTH_URL,
} = parseEnv(process.env, {
  DATABASE_URL: Z_STRING,
  DATABASE_AUTH_TOKEN: Z_STRING,
  PAYMENT_SESSION_TIMEOUT_MS: Z_NUMBER,

  NEXTAUTH_SECRET: Z_STRING,
  GITHUB_CLIENT_ID: Z_STRING,
  GITHUB_CLIENT_SECRET: Z_STRING,
  NEXTAUTH_URL: Z_STRING,
})

console.log("[ENV] Success!")
