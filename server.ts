import { insertUser } from "./db.ts";
import { Application, isHttpError, Status } from './deps.ts'

function errorHandler(app: Application<Record<string, any>>) {
  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      if (isHttpError(err)) {
        switch (err.status) {
          case Status.NotFound:
            ctx.response.status = 404;
            ctx.response.body = "Not Found"
            break;
          case Status.InternalServerError:
            ctx.response.status = 500;
            ctx.response.body = "Internal Server Error"
            break;
          default:
            // handle other statuses
        }
      } else {
        // rethrow if you can't handle the error
        throw err;
      }
    }
  });
}

async function server() {
  const app = new Application();

  errorHandler(app);

  app.use(async (ctx) => {
    await insertUser();
    ctx.response.body = "Hello World!";
  });

  await app.listen({ port: 8000 });
}

export default server;
