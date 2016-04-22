"use strict";
var Registry = require('../class/Registry');
// instantiate
var registry = new Registry();
/**
 * Custom format API
 *
 * @see https://github.com/json-schema-faker/json-schema-faker#custom-formats
 * @param nameOrFormatMap
 * @param callback
 * @returns {any}
 */
function formatAPI(nameOrFormatMap, callback) {
    if (typeof nameOrFormatMap === 'undefined') {
        return registry.list();
    }
    else if (typeof nameOrFormatMap === 'string') {
        if (typeof callback === 'function') {
            registry.register(nameOrFormatMap, callback);
        }
        else {
            return registry.get(nameOrFormatMap);
        }
    }
    else {
        registry.registerMany(nameOrFormatMap);
    }
}
module.exports = formatAPI;
