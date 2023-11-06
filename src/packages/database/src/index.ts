import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import { users } from "./schema";
import { DATABASE_URL } from "./env";

const libsql = createClient({
  url: DATABASE_URL,
});
const db = drizzle(libsql);

async function main() {
  const r = (await db.select().from(users)).length;

  console.log(r);
}

main();
