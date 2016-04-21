"use strict";
/**
 * This class defines a registry for custom formats used within JSF.
 */
var FormatRegistry = (function () {
    function FormatRegistry() {
        // empty by default
        this.registry = {};
    }
    /**
     * Registers custom format
     */
    FormatRegistry.prototype.register = function (name, callback) {
        this.registry[name] = callback;
    };
    /**
     * Register many formats at one shot
     */
    FormatRegistry.prototype.registerMany = function (formats) {
        for (var name in formats) {
            this.registry[name] = formats[name];
        }
    };
    /**
     * Returns element by registry key
     */
    FormatRegistry.prototype.get = function (name) {
        var format = this.registry[name];
        if (typeof format !== 'function') {
            throw new Error('unknown format generator ' + JSON.stringify(name));
        }
        return format;
    };
    /**
     * Returns the whole registry content
     */
    FormatRegistry.prototype.list = function () {
        return this.registry;
    };
    return FormatRegistry;
}());
module.exports = FormatRegistry;
