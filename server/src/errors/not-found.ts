import { CustomError } from "./_custom-error.js";

export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor(message?: string) {
    super(message ?? "the resource requested is not found");
  }
}
