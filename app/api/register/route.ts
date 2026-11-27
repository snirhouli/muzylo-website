import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { randomUUID } from 'crypto';
import { pool } from '@/lib/db';

export async function POST(req: Request) {
  const b = await req.json().catch(() => ({}));
  const username = String(b.username ?? '').trim();
  const email = String(b.email ?? '').trim();
  const password = String(b.password ?? '');
  const fail = (message: string, status = 400) => NextResponse.json({ message }, { status });

  if (!/^[A-Za-z0-9]{4,10}$/.test(username)) return fail('Username must be 4-10 letters or digits.');
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || email.length > 60) return fail('Invalid email.');
  if (password.length < 8 || password.length > 20) return fail('Password needs 8-20 characters.');
  if (password !== b.repeat) return fail('The passwords do not match.');

  try {
    const dup = await pool.query(`SELECT 1 FROM data."Account" WHERE "LoginName" = $1 OR lower("EMail") = lower($2) LIMIT 1`, [username, email]);
    if (dup.rowCount) return fail('Username or email already in use.', 409);
    await pool.query(
      `INSERT INTO data."Account" ("Id","LoginName","PasswordHash","SecurityCode","EMail","RegistrationDate","State","TimeZone","VaultPassword","IsVaultExtended")
       VALUES ($1,$2,$3,'',$4,now(),0,0,'',false)`,
      [randomUUID(), username, await hash(password, 10), email],
    );
    return NextResponse.json({ message: 'Account created. You can log in to the game now.' }, { status: 201 });
  } catch (e) {
    console.error('register', (e as Error).message);
    return fail('Could not create the account. Try again later.', 500);
  }
}
