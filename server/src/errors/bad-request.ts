import { CustomError } from "./_custom-error.js";

/**
 * throw this error when there is an extra resource.
 *
 * this error can be domain specific, so a message argument is needed.
 */
export class BadRequest extends CustomError {
  statusCode = 400;
  constructor(message: string, data?: Record<string, unknown>) {
    super(message, data);
  }
}
