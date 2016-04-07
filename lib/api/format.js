var FormatRegistry = require('../class/FormatRegistry');
// instantiate
var registry = new FormatRegistry();
/**
 * Custom formats API
 *
 * @see https://github.com/json-schema-faker/json-schema-faker#custom-formats
 * @param name
 * @param callback
 * @returns {any}
 */
function formatAPI(name, callback) {
    if (callback) {
        registry.register(name, callback);
    }
    else if (typeof name === 'object') {
        registry.registerMany(name);
    }
    else if (name) {
        return registry.get(name);
    }
    else {
        return registry.list();
    }
}
module.exports = formatAPI;
