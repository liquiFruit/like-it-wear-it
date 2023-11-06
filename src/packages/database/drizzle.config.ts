import type { Config } from "drizzle-kit";

export default {
  schema: "./src/schema.ts",
  out: "./src/migrations",
  driver: "libsql",
  dbCredentials: {
    url: "local.db",
  },
} satisfies Config;
