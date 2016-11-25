"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ParseError = (function (_super) {
    __extends(ParseError, _super);
    function ParseError(message, path) {
        var _this = _super.call(this) || this;
        _this.path = path;
        Error.captureStackTrace(_this, _this.constructor);
        _this.name = 'ParseError';
        _this.message = message;
        _this.path = path;
        return _this;
    }
    return ParseError;
}(Error));
module.exports = ParseError;
