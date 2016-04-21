var container = require('./class/Container');
var format = require('./api/format');
var run = require('./core/run');
var jsf = function (schema, refs) {
    return run(schema, refs);
};
jsf.format = format;
// returns itself for chaining
jsf.extend = function (name, cb) {
    container.extend(name, cb);
    return jsf;
};
module.exports = jsf;
