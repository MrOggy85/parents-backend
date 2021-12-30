import { Client } from "./deps.ts";

async function connect() {
  const client = new Client({
    user: Deno.env.get("DB_USER"),
    password: Deno.env.get("DB_PASSWORD"),
    database: Deno.env.get("DB_NAME"),
    hostname: Deno.env.get("DB_HOST"),
    port: Deno.env.get("DB_PORT"),
  });
  await client.connect();
  return client;
}

export async function getNumber() {
  const client = await connect();

  const result = await client.queryArray<Array<number>>("SELECT * FROM test");
  await client.end();

  return result.rows[0][0];
}

export async function insertUser() {
  const client = await connect();

  const result = await client.queryArray(
    "INSERT INTO public.  user(id, username, email, password, firstname, lastname, signup_method)" +
      "VALUES(2, 'hello_user2', 'hello2@email.com', 'secret', 'Hello', 'World', 'test')",
  );

  console.log("result", result);

  await client.end();
}
