declare type ErrorInterface = Error;

declare class Error implements ErrorInterface {
  name: string;
  message: string;
  static captureStackTrace(object: Object, objectConstructor?: Function): void;
}

class ParseError extends Error {
  constructor(message: string, public path: StackTrace) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = 'ParseError';
    this.message = message;
    this.path = path;
  }
}

export default ParseError;
