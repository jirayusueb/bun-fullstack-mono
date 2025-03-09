import { env } from '@/env';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

// Create PostgreSQL connection
const client = postgres(env.DATABASE_URL);

// Create Drizzle client
export const db = drizzle(client);
