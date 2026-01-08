import { Pool } from 'pg';

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'tomato123',
  database: 'audit_db'
});

export const query = (text: string, params?: any[]) => {
  return pool.query(text, params);
};
