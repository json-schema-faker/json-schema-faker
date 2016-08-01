"use strict";
var container = require('./class/Container');
var format = require('./api/format');
var option = require('./api/option');
var run = require('./core/run');
var jsf = function (schema, refs) {
    return run(schema, refs);
};
jsf.format = format;
jsf.option = option;
// returns itself for chaining
jsf.extend = function (name, cb) {
    container.extend(name, cb);
    return jsf;
};
jsf.version = '0.3.6';
module.exports = jsf;
