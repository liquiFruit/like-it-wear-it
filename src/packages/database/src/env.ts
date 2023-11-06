import { config } from "dotenv";
import { join } from "path";

import { parseEnv } from "znv";
import { z } from "zod";

const { error } = config({
  path: join(__dirname, "../.env"),
});

if (error) throw error;

export const { DATABASE_URL, DATABASE_AUTH_TOKEN } = parseEnv(process.env, {
  DATABASE_URL: z.string().min(1),
  DATABASE_AUTH_TOKEN: z.string().min(1).optional(),
});
