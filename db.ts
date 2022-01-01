import AppError from "./AppError.ts";
import { Client, PostgresError } from "./deps.ts";

const DB_USER = Deno.env.get("DB_USER");
if (!DB_USER) {
  console.error('env DB_USER not set');
  Deno.exit(1)
}
const DB_PASSWORD = Deno.env.get("DB_PASSWORD");
if (!DB_PASSWORD) {
  console.error('env DB_PASSWORD not set');
  Deno.exit(1)
}
const DB_NAME = Deno.env.get("DB_NAME");
if (!DB_NAME) {
  console.error('env DB_NAME not set');
  Deno.exit(1)
}
const DB_HOST = Deno.env.get("DB_HOST");
if (!DB_HOST) {
  console.error('env DB_HOST not set');
  Deno.exit(1)
}
const DB_PORT = Deno.env.get("DB_PORT");
if (!DB_PORT) {
  console.error('env DB_PORT not set');
  Deno.exit(1)
}

async function connect() {
  const client = new Client({
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    hostname: DB_HOST,
    port: DB_PORT,
  });
  await client.connect();
  return client;
}

async function runQuery(q: string) {
  const client = await connect();

  try {
    const result = await client.queryArray(q)
    return result;
  } catch (error) {
    if (error instanceof PostgresError ) {
      console.error('PostgresError 2', error.name, error.message, error.fields, error.stack);
      throw new AppError('', 500)
    }

  }
  finally {
    await client.end();
  }
}

export async function getNumber() {
  const client = await connect();

  const result = await client.queryArray<Array<number>>("SELECT * FROM test");
  await client.end();

  return result.rows[0][0];
}

export async function insertUser() {
  await runQuery("INSERT INTO public.  user(id, username, email, password, firstname, lastname, signup_method)" +
  "VALUES(2, 'hello_user2', 'hello2@email.com', 'secret', 'Hello', 'World', 'test')")
}
