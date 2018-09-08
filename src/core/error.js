class ParseError extends Error {
  constructor(message, path) {
    super();
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
    this.name = 'ParseError';
    this.message = message;
    this.path = path;
  }
}

export default ParseError;
