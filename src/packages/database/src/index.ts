import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";
// import { DATABASE_URL } from "./env";

const libsql = createClient({
  url: "file:C:/Users/johnr/Documents/web-dev/like-it-wear-it/src/packages/database/local.db",
});
export const db = drizzle(libsql, {
  schema,
});
