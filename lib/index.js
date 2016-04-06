var container = require('./class/Container');
var formats = require('./api/formats');
var run = require('./core/run');
var jsf = function (schema, refs) {
    return run(schema, refs);
};
jsf.formats = formats;
// returns itself for chaining
jsf.extend = function (name, cb) {
    container.extend(name, cb);
    return jsf;
};
module.exports = jsf;
