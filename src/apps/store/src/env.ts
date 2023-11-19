import { join } from "node:path"

import { config } from "dotenv"
import { parseEnv } from "znv"
import { z } from "zod"

const envPath = join(new URL(import.meta.url).pathname, "../../.env").replace(
  /^\\/,
  "",
)

const { error } = config({ path: envPath })

if (error) throw error

const schema = {
  NEXTAUTH_SECRET: { schema: z.string().min(1) },
  GITHUB_CLIENT_ID: { schema: z.string().min(1) },
  GITHUB_CLIENT_SECRET: { schema: z.string().min(1) },
  NEXTAUTH_URL: { schema: z.string().min(1) },
}

export const {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  NEXTAUTH_SECRET,
  NEXTAUTH_URL,
} = parseEnv(process.env, schema)
