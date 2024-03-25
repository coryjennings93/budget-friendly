/**
 * Abstract Class AppError.
 *
 * @class AppError
 * @extends {Error}
 */

class AppError extends Error {
  constructor(message) {
    super(message);
    if (this.constructor === AppError) {
      throw new Error("Abstract classes can't be instantiated.");
    }
    if (this.errorCode === undefined) {
      throw new Error("Need to define errorCode.");
    }
    if (this.errorType === undefined) {
      throw new Error("Need to define errorType.");
    }
    Object.setPrototypeOf(this, AppError.prototype);
  }
  // should return an array of objects {message: string, property?: string}
  serializeErrors() {
    throw new Error("serializeErrors must be implemented by subclass.");
  }
}

module.exports = AppError;
