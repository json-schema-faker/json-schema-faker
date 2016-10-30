"use strict";
var deref = require('deref');
var traverse = require('./traverse');
var random = require('./random');
var utils = require('./utils');
function isKey(prop) {
    return prop === 'enum' || prop === 'default' || prop === 'required' || prop === 'definitions';
}
// TODO provide types
function run(schema, refs, ex) {
    var $ = deref();
    try {
        return traverse($(schema, refs, ex), [], function reduce(sub, maxReduceDepth) {
            if (typeof maxReduceDepth === 'undefined') {
                maxReduceDepth = random.number(0, 3);
            }
            if (!sub) {
                return {};
            }
            if (typeof sub.$ref === 'string') {
                var id = sub.$ref;
                delete sub.$ref;
                if (maxReduceDepth <= 0) {
                    delete sub.$ref;
                    delete sub.oneOf;
                    delete sub.anyOf;
                    delete sub.allOf;
                    return sub;
                }
                maxReduceDepth -= 1;
                utils.merge(sub, $.util.findByRef(id, $.refs));
            }
            if (Array.isArray(sub.allOf)) {
                var schemas = sub.allOf;
                delete sub.allOf;
                // this is the only case where all sub-schemas
                // must be resolved before any merge
                schemas.forEach(function (schema) {
                    utils.merge(sub, reduce(schema, maxReduceDepth));
                });
            }
            if (Array.isArray(sub.oneOf || sub.anyOf)) {
                var mix = sub.oneOf || sub.anyOf;
                delete sub.anyOf;
                delete sub.oneOf;
                utils.merge(sub, random.pick(mix));
            }
            for (var prop in sub) {
                if ((Array.isArray(sub[prop]) || typeof sub[prop] === 'object') && !isKey(prop)) {
                    sub[prop] = reduce(sub[prop], maxReduceDepth);
                }
            }
            return sub;
        });
    }
    catch (e) {
        if (e.path) {
            throw new Error(e.message + ' in ' + '/' + e.path.join('/'));
        }
        else {
            throw e;
        }
    }
}
module.exports = run;
