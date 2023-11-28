import { sql } from "drizzle-orm"

export const SQL_TIME_NOW = sql`(strftime('%s', 'now') * 1000 + strftime('%f', 'now') * 1000)`
