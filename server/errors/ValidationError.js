class ValidationError extends Error {
  constructor(error) {
    super("Validation error");
    this.status = "ValidationError";
    this.statusCode = 422;
    this.error = error;
  }
}

module.exports = ValidationError;
