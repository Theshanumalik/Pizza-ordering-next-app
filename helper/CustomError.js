export class CustomError extends Error {
  constructor(message, statusCode, stack) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.stack = stack;
  }
}
