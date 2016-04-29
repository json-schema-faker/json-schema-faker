"use strict";
var OptionRegistry = require('../class/OptionRegistry');
// instantiate
var registry = new OptionRegistry();
/**
 * Custom option API
 *
 * @param nameOrOptionMap
 * @returns {any}
 */
function optionAPI(nameOrOptionMap) {
    if (typeof nameOrOptionMap === 'string') {
        return registry.get(nameOrOptionMap);
    }
    else {
        return registry.registerMany(nameOrOptionMap);
    }
}
module.exports = optionAPI;
