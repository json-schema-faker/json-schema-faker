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
    var max = 100;

    return traverse($(schema, refs, ex), [], function reduce(sub) {
      if (!max) {
        delete sub.$ref;
        delete sub.oneOf;
        delete sub.anyOf;
        delete sub.allOf;
        return sub;
      }

      if (sub.$ref) {
        var id = sub.$ref;

        delete sub.$ref;

        max--;

        merge(sub, reduce($.util.findByRef(id, $.refs)));
      }

      if (sub.allOf) {
        var schemas = sub.allOf;

        delete sub.allOf;

        schemas.forEach(function(s) {
          merge(sub, reduce(s));
        });
      }

      if (sub.oneOf || sub.anyOf) {
        var mix = sub.oneOf || sub.anyOf;

        delete sub.anyOf;
        delete sub.oneOf;

        merge(sub, reduce(random.pick(mix)));
      }

      for (var prop in sub) {
        if ((Array.isArray(sub[prop]) || typeof sub[prop] === 'object') && !isKey(prop)) {
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
