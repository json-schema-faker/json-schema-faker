'use strict';

var container = require('./util/container'),
    traverse = require('./util/traverse'),
    formats = require('./util/formats'),
    random = require('./util/random'),
    merge = require('./util/merge');

var deref = require('deref');

function isKey(prop) {
  return prop === 'enum' || prop === 'required' || prop === 'definitions';
}

function generate(schema, refs, ex) {
  var $ = deref();

  try {
    var seen = {};

    return traverse($(schema, refs, ex), [], function reduce(sub) {
      var schemas = sub.anyOf || sub.oneOf || sub.allOf || [];

      var arity = Math.round(Math.random() * 2);

      var id = sub.$ref;

      delete sub.$ref;
      delete sub.anyOf;
      delete sub.oneOf;
      delete sub.allOf;

      if (id) {
        if (!seen[id]) {
          seen[id] = 0;
        } else if (seen[id] > arity) {
          return sub;
        }

        seen[id] += 1;

        merge(sub, $.util.findByRef(id, $.refs));
      }

      if ((sub.oneOf || sub.anyOf) && schemas.length) {
        schemas = [random.pick(schemas)];
      }

      schemas.forEach(function(s) {
        merge(sub, reduce(s));
      });

      for (var prop in sub) {
        if (typeof sub[prop] === 'object' && !isKey(prop)) {
          sub[prop] = reduce(sub[prop]);
        }
      }

      return sub;
    });
  } catch (e) {
    if (e.path) {
      throw new Error(e.message + ' in ' + '/' + e.path.join('/'));
    } else {
      throw e;
    }
  }
}

generate.formats = formats;
generate.extend = container.set;

module.exports = generate;
