import { User } from "../db/types.ts";
import { insertUser } from "../db/user.ts";
import { Router } from "../deps.ts";

const PATH = '/user';

const router = new Router()
  .get(`${PATH}/`, (ctx) => {
    ctx.response.body = `Forum: ${ctx.params.forumId}`;
  })
  .post(`${PATH}/signup`, async (ctx) => {
    const result = ctx.request.body({ type: 'json'})
    const user = await result.value as User;

    await insertUser(user);
    ctx.response.body =
      'Success';
  });

  export default router;
