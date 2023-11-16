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
  DATABASE_URL: { schema: z.string().min(1) },
  DATABASE_AUTH_TOKEN: { schema: z.string().min(1) },
}

export const { DATABASE_URL, DATABASE_AUTH_TOKEN } = parseEnv(
  process.env,
  schema,
)
