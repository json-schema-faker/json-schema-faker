"use strict";
var $RefParser = require("json-schema-ref-parser");
var traverse = require("./traverse");
var random = require("./random");
var utils = require("./utils");
function isKey(prop) {
    return prop === 'enum' || prop === 'default' || prop === 'required' || prop === 'definitions';
}
// TODO provide types
function run(schema, refs, cwd) {
    var $refs = {};
    if (Array.isArray(refs)) {
        refs.forEach(function (schema) {
            $refs[schema.id] = schema;
        });
    }
    else {
        $refs = refs || {};
    }
    var fixedRefs = {
        order: 300,
        canRead: true,
        read: function (file, callback) {
            callback(null, $refs[file.url] || $refs[file.url.split('/').pop()]);
        }
    };
    // normalize basedir
    cwd = (cwd || process.cwd()).replace(/\/+$/, '') + '/';
    return $RefParser.dereference(cwd, schema, {
        resolve: {
            fixedRefs: fixedRefs
        }
    }).then(function (resolvedSchema) {
        try {
            return traverse(resolvedSchema, [], function reduce(sub, maxReduceDepth) {
                if (typeof maxReduceDepth === 'undefined') {
                    maxReduceDepth = random.number(1, 3);
                }
                if (!sub) {
                    return null;
                }
                if (Array.isArray(sub.allOf)) {
                    var schemas = sub.allOf;
                    delete sub.allOf;
                    // this is the only case where all sub-schemas
                    // must be resolved before any merge
                    schemas.forEach(function (schema) {
                        utils.merge(sub, reduce(schema, maxReduceDepth + 1));
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
    });
}
module.exports = run;
