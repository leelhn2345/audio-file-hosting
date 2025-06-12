import { CustomError } from "./_custom-error.js";

export class UnauthorizedError extends CustomError {
  statusCode = 401;

  constructor(
    message: string = "Unauthorized",
    data?: Record<string, unknown>,
  ) {
    super(message, data);
  }
}
