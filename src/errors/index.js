exports.BadRequestError = class BadRequestError extends Error {
  constructor(message) {
    super(message);

    this.message = message;
    this.code = 400;
  }
}

exports.NotFoundError = class NotFoundError extends Error {
  constructor(message) {
    super(message);

    this.message = message;
    this.code = 404;
  }
}

exports.UnauthorizedError = class UnauthorizedError extends Error {
  constructor(message) {
    super(message);

    this.message = message;
    this.code = 401;
  }
}
