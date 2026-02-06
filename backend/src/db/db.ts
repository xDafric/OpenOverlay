import { env } from "@/config/config.js";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: env.database.connectionUrl,
});

export const db = drizzle(pool);
