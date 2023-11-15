import { createClient } from "@libsql/client"
import { drizzle } from "drizzle-orm/libsql"
import { DATABASE_URL, DATABASE_AUTH_TOKEN } from "./env"
import * as schema from "./schema"

export { schema }

export const db = drizzle(
  createClient({
    url: DATABASE_URL,
    authToken: DATABASE_AUTH_TOKEN,
  }),
  {
    schema,
  },
)

export async function createUser(email: string, name: string): Promise<string> {
  return JSON.stringify(
    (await db.insert(schema.users).values({ email, name })).toJSON(),
  )
}

export async function getUsers(): Promise<
  (typeof schema.selectUserSchema._type)[]
> {
  return db.select().from(schema.users)
}
