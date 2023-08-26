import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
import { env } from "@/env.mjs";
dotenv.config();

export default {
  schema: "./db/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config;
