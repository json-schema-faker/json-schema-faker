"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Registry = require("./Registry");
/**
 * This class defines a registry for custom formats used within JSF.
 */
var OptionRegistry = (function (_super) {
    __extends(OptionRegistry, _super);
    function OptionRegistry() {
        var _this = _super.call(this) || this;
        _this.data['failOnInvalidTypes'] = true;
        _this.data['defaultInvalidTypeProduct'] = null;
        _this.data['useDefaultValue'] = false;
        _this.data['requiredOnly'] = false;
        _this.data['maxItems'] = null;
        _this.data['maxLength'] = null;
        _this.data['defaultMinItems'] = 0;
        _this.data['defaultRandExpMax'] = 10;
        _this.data['alwaysFakeOptionals'] = false;
        return _this;
    }
    return OptionRegistry;
}(Registry));
module.exports = OptionRegistry;
