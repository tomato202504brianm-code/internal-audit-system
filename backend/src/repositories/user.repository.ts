import { query } from '../db';

export const findUserByUsername = async (username: string) => {
  const result = await query(
    'SELECT id, username, password_hash FROM users WHERE username = $1',
    [username]
  );

  return result.rows[0];
};
