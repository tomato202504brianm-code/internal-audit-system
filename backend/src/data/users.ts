export interface User {
  username: string;
  passwordHash: string;
}

/**
 * This simulates a database table
 * In real life, this would be PostgreSQL / MySQL / Mongo
 */
export const users: User[] = [];
