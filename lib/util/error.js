function ParseError(message, path) {
  this.message = message;
  this.path = path;
  this.name = 'ParseError';
}

ParseError.prototype = Error.prototype;

module.exports = ParseError;
