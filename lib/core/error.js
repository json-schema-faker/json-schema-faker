"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ParseError = (function (_super) {
    __extends(ParseError, _super);
    function ParseError(message, path) {
        _super.call(this);
        this.path = path;
        Error.captureStackTrace(this, this.constructor);
        this.name = 'ParseError';
        this.message = message;
        this.path = path;
    }
    return ParseError;
}(Error));
module.exports = ParseError;
