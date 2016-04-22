"use strict";
var container = require('../class/Container');
/**
 * Extending dependencies
 *
 * @see https://github.com/json-schema-faker/json-schema-faker#extending-dependencies
 * @param name
 * @param callback
 */
function extendAPI(name, callback) {
    container.extend(name, callback);
}
module.exports = extendAPI;
