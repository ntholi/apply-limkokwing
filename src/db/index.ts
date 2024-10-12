import 'dotenv/config';
import { drizzle } from 'drizzle-orm/connect';

export const db = drizzle('node-postgres', {
  connection: process.env.DATABASE_URL!,
  casing: 'snake_case',
});
