class AuthenticationError extends Error {
  constructor(error, statusCode = 403) {
    super("Authentication error");
    this.status = "AuthenticationError";
    this.statusCode = statusCode;
    this.error = error;
  }
}

module.exports = AuthenticationError;
