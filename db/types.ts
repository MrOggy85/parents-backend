export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  // deno-lint-ignore camelcase
  signup_method: string;
}
