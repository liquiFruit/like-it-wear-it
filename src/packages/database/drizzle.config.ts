import type { Config } from "drizzle-kit";
import { DATABASE_URL } from "./src/env";

export default {
  schema: "./src/schema.ts",
  out: "./src/migrations",
  driver: "libsql",
  dbCredentials: {
    url: DATABASE_URL,
  },
} satisfies Config;
