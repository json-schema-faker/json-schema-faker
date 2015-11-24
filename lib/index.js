'use strict';

var container = require('./util/container'),
    traverse = require('./util/traverse'),
    formats = require('./util/formats'),
    random = require('./util/random');

var deref = require('deref'),
    deepExtend = require('deep-extend');

function reduce(obj) {
  var mix = obj.anyOf || obj.oneOf || obj.allOf;

  if (!(mix && mix.length)) {
    for (var key in obj) {
      var value = obj[key];

      if (typeof value === 'object' && !(key === 'enum' || key === 'required')) {
        reduce(value);
      }
    }

    return;
  }

  if ((obj.oneOf || obj.anyOf) && mix.length) {
    mix = [random.pick(mix)];
  }

  mix = obj.allOf || mix;

  delete obj.anyOf;
  delete obj.oneOf;
  delete obj.allOf;

  var fixed = {};

  mix.forEach(function(sub) {
    deepExtend(fixed, sub);
  });

  deepExtend(obj, fixed);
}


function generate(schema, refs, ex) {
  var $ = deref();

  try {
    return traverse($(schema, refs, ex), [], function re(sub) {
      var id = sub.$ref;

      delete sub.$ref;

      if (id) {
        deepExtend(sub, $.util.findByRef(id, $.refs));
      }

      if (sub.allOf) {
        sub.allOf.forEach(function(s) {
          deepExtend(sub, re(s));
        });

        delete sub.allOf;
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
