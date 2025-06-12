import { CustomError } from "./_custom-error.js";

/**
 * throw this error when users aren't supposed to use the API.
 */
export class ForbiddenError extends CustomError {
  statusCode = 403;
  constructor(msg?: string) {
    super(
      msg ??
        "Access denied: You do not have the necessary permissions to perform this action.",
    );
  }
}
