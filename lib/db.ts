import { Pool } from 'pg';

const g = globalThis as unknown as { pool?: Pool };
export const pool = g.pool ?? new Pool({ connectionString: process.env.DATABASE_URL, max: 5 });
if (process.env.NODE_ENV !== 'production') g.pool = pool;

/** Runs a query, returns [] when the database is not reachable (the site must still render). */
export async function rows<T = Record<string, any>>(sql: string, params: unknown[] = []): Promise<T[]> {
  try {
    return (await pool.query(sql, params)).rows as T[];
  } catch (e) {
    console.error('db error', (e as Error).message);
    return [];
  }
}
