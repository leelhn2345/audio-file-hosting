export abstract class CustomError extends Error {
  abstract statusCode: number;
  data?: Record<string, unknown>;

  constructor(message: string, data?: Record<string, unknown>) {
    super(message);
    this.name = new.target.name;
    this.data = data;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
