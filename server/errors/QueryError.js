class QueryError extends Error {
  constructor(message, statusCode = 500) {
    super("Query error");
    this.status = "QueryError";
    this.statusCode = statusCode;
    this.message = message;
  }
}

module.exports = QueryError;
