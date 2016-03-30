"use strict";
var FormatRegistry = require('../class/FormatRegistry');
// instantiate
var registry = new FormatRegistry();
function formatsAPI(name, callback) {
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
module.exports = formatsAPI;
