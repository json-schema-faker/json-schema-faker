"use strict";
/**
 * This class defines a registry for custom formats used within JSF.
 */
var Registry = (function () {
    function Registry() {
        // empty by default
        this.data = {};
    }
    /**
     * Registers custom format
     */
    Registry.prototype.register = function (name, callback) {
        this.data[name] = callback;
    };
    /**
     * Register many formats at one shot
     */
    Registry.prototype.registerMany = function (formats) {
        for (var name in formats) {
            this.data[name] = formats[name];
        }
    };
    /**
     * Returns element by registry key
     */
    Registry.prototype.get = function (name) {
        var format = this.data[name];
        return format;
    };
    /**
     * Returns the whole registry content
     */
    Registry.prototype.list = function () {
        return this.data;
    };
    return Registry;
}());
module.exports = Registry;
