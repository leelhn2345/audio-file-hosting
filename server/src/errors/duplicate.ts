import { CustomError } from "./_custom-error.js";

export class DuplicatedError extends CustomError {
  statusCode = 409;

  constructor(message: string) {
    super(message);
  }
}
