'use strict';

var container = require('./util/container'),
    traverse = require('./util/traverse'),
    formats = require('./util/formats'),
    random = require('./util/random');

var deref = require('deref'),
    deepExtend = require('deep-extend');

function generate(schema, refs, ex) {
  var $ = deref();

  try {
    return traverse($(schema, refs, ex), [], function reduce(sub) {
      var id = sub.$ref;

      delete sub.$ref;

      if (id) {
        deepExtend(sub, $.util.findByRef(id, $.refs));
      }

      var mix = sub.anyOf || sub.oneOf || sub.allOf || [];

      if ((sub.oneOf || sub.anyOf) && mix.length) {
        mix = [random.pick(mix)];
      }

      delete sub.anyOf;
      delete sub.oneOf;
      delete sub.allOf;

      mix.forEach(function(s) {
        deepExtend(sub, reduce(s));
      });

      for (var key in sub) {
        var value = sub[key];

        if (typeof value === 'object' && !(key === 'enum' || key === 'required')) {
          sub[key] = reduce(value);
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
