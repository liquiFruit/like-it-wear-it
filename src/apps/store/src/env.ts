import { join } from "path"

import { config } from "dotenv"
import { parseEnv } from "znv"
import { z } from "zod"

if (process.env.NODE_ENV === "development") {
  const envPath = join(new URL(import.meta.url).pathname, "../../.env").replace(
    /^\\/,
    "",
  )

  console.warn(`[DEV] Loading: ${envPath}`)
  const { error } = config({ path: envPath })

  if (error) {
    console.error("Error loading environment")
    console.log(error)
    process.exit(1)
  }
}

const schema = {
  NEXTAUTH_SECRET: { schema: z.string().min(1) },
  GITHUB_CLIENT_ID: { schema: z.string().min(1) },
  GITHUB_CLIENT_SECRET: { schema: z.string().min(1) },
  NEXTAUTH_URL: { schema: z.string().min(1) },
}

try {
  parseEnv(process.env, schema)
} catch (error) {
  console.error("Error processing env")
  console.log(error)

  process.exit()
}

export const {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  NEXTAUTH_SECRET,
  NEXTAUTH_URL,
} = parseEnv(process.env, schema)
