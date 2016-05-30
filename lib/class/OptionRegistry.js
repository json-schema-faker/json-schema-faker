"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Registry = require('./Registry');
/**
 * This class defines a registry for custom formats used within JSF.
 */
var OptionRegistry = (function (_super) {
    __extends(OptionRegistry, _super);
    function OptionRegistry() {
        _super.call(this);
        this.data['failOnInvalidTypes'] = true;
        this.data['defaultInvalidTypeProduct'] = null;
        this.data['useDefaultValue'] = false;
    }
    return OptionRegistry;
}(Registry));
module.exports = OptionRegistry;
