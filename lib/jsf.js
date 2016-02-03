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

      if (typeof sub.$ref === 'string') {
        var id = sub.$ref;

        delete sub.$ref;

        max--;

        merge(sub, $.util.findByRef(id, $.refs));
      }

      if (Array.isArray(sub.allOf)) {
        var schemas = sub.allOf;

        delete sub.allOf;

        // this is the only case where all sub-schemas
        // must be resolved before any merge
        schemas.forEach(function(s) {
          merge(sub, reduce(s));
        });
      }

      if (Array.isArray(sub.oneOf || sub.anyOf)) {
        var mix = sub.oneOf || sub.anyOf;

        delete sub.anyOf;
        delete sub.oneOf;

        merge(sub, random.pick(mix));
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

// returns itself for chaining
generate.extend = function(name, cb) {
  container.set(name, cb);
  return generate;
};

module.exports = generate;
