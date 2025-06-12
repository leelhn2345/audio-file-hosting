import { CustomError } from "./_custom-error.js";

export class ServiceUnavailable extends CustomError {
  statusCode = 503;

  constructor(message: string = "Service unavailable") {
    super(message);
  }
}
