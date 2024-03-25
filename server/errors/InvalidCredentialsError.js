class InvalidCredentialsError extends Error {
  constructor(message) {
    super(message);
    this.status = "InvalidCredentialsError";
    this.statusCode = 422;
  }
}

module.exports = InvalidCredentialsError;
