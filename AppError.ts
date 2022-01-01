import { HttpError, Status } from "./deps.ts";

class AppError extends HttpError {
  constructor(message: string, status: Status) {
    super();

    this.message = message;
    this.status = status;
  }
}

export default AppError;
