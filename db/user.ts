import { runQuery } from "../db.ts";
import type { User } from "./types.ts";

type NewUser = Omit<User, 'id'>;

export async function insertUser(user: NewUser) {
  await runQuery("INSERT INTO public.user(username, email, password, firstname, lastname, signup_method)" +
  `VALUES('${user.username}', '${user.email}', '${user.password}', '${user.firstname}', '${user.lastname}', '${user.signup_method}')`)
}
