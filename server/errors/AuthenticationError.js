class AuthenticationError extends Error {
  constructor(message, statusCode = 403) {
    super("Authentication error");
    this.status = "AuthenticationError";
    this.statusCode = statusCode;
    this.message = message;
  }
}

module.exports = AuthenticationError;
