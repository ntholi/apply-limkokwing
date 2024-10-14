import * as schema from './schema';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';

const queryClient = postgres(process.env.AUTH_DRIZZLE_URL!);
export const db = drizzle(queryClient, { schema });
