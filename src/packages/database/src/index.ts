import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { DATABASE_URL, DATABASE_AUTH_TOKEN } from "./env";
import * as schema from "./schema";

const libsql = createClient({
  url: DATABASE_URL,
  authToken: DATABASE_AUTH_TOKEN,
});

export const db = drizzle(libsql, {
  schema,
});

export { schema };
