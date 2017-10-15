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
var VERSION="0.4.4";
jsf.version = VERSION;
