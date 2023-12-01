import { sql } from "drizzle-orm"

export const SQL_TIME_NOW = sql`(strftime('%s', 'now') || substr(strftime('%f', 'now'), 4))`
