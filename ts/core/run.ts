import traverse from './traverse';
import random from './random';
import utils from './utils';

import deref from 'deref';

// TODO provide types
function run(refs: any, schema: JsonSchema, container: Container) {
  try {
    return traverse(schema, [], function reduce(sub, maxReduceDepth) {
      if (typeof maxReduceDepth === 'undefined') {
        maxReduceDepth = random.number(1, 3);
      }

      if (!sub) {
        return null;
      }

      if (typeof sub.generate === 'function') {
        return sub;
      }

      // cleanup
      if (sub.id && typeof sub.id === 'string') {
        delete sub.id;
        delete sub.$schema;
      }

      if (typeof sub.$ref === 'string') {
        if (sub.$ref === '#') {
          delete sub.$ref;
          return sub;
        }

        if (sub.$ref.indexOf('#/') === -1) {
          var ref = deref.util.findByRef(sub.$ref, refs);

          if (!ref) {
            throw new Error('Reference not found: ' + sub.$ref);
          }

          return ref;
        }

        // just remove the reference
        delete sub.$ref;
        return sub;
      }

      if (Array.isArray(sub.allOf)) {
        var schemas: JsonSchema[] = sub.allOf;

        delete sub.allOf;

        // this is the only case where all sub-schemas
        // must be resolved before any merge
        schemas.forEach(function(subSchema: JsonSchema) {
          var _sub = reduce(subSchema, maxReduceDepth + 1);

          // call given thunks if present
          utils.merge(sub, typeof _sub.thunk === 'function'
            ? _sub.thunk()
            : _sub);
        });
      }

      if (Array.isArray(sub.oneOf || sub.anyOf)) {
        var mix = sub.oneOf || sub.anyOf;

        // test every value from the enum against each-oneOf
        // schema, only values that validate once are kept
        if (sub.enum && sub.oneOf) {
          sub.enum = sub.enum.filter(x => utils.validate(x, mix));
        }

        delete sub.anyOf;
        delete sub.oneOf;

        return {
          thunk() {
            var copy = utils.merge({}, sub);

            utils.merge(copy, random.pick(mix));

            return copy;
          },
        };
      }

      for (var prop in sub) {
        if ((Array.isArray(sub[prop]) || typeof sub[prop] === 'object') && !utils.isKey(prop)) {
          sub[prop] = reduce(sub[prop], maxReduceDepth);
        }
      }

      return container.wrap(sub);
    });
  } catch (e) {
    if (e.path) {
      throw new Error(e.message + ' in ' + '/' + e.path.join('/'));
    } else {
      throw e;
    }
  }
}

export default run;
