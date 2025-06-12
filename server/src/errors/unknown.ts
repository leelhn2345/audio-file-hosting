import { CustomError } from "./_custom-error.js";

/**
 * Generic error class that can be used for any custom errors.
 *
 * Please use this error sparingly.
 */
export class UnknownError extends CustomError {
  statusCode = 500;

  constructor(message: string = "unknown error") {
    super(`Error: ${message}`);
  }
}
