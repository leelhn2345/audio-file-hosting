import { CustomError } from "./_custom-error.js";

export class NotImplementedError extends CustomError {
  statusCode = 501;

  constructor(message?: string) {
    super(message ?? "this api is not implemented yet.");
  }
}
