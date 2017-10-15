import deref from 'deref';

import container from '../class/Container';
import traverse from './traverse';
import random from './random';
import utils from './utils';

function isKey(prop: string): boolean {
  return prop === 'enum' || prop === 'default' || prop === 'required' || prop === 'definitions';
}

// TODO provide types
function run(schema, refs?, ex?) {
  var $ = deref();
  var _ = {};

  try {
    return traverse($(schema, refs, ex), [], function reduce(sub, maxReduceDepth) {
      if (typeof maxReduceDepth === 'undefined') {
        maxReduceDepth = random.number(1, 3);
      }

      if (!sub) {
        return null;
      }

      if (typeof sub.$ref === 'string') {
          var id = sub.$ref;

          // match and increment seen references
          if (!_[id]) {
            _[id] = 0;
          }

          _[id] += 1;

          // cleanup
          delete sub.$ref;

          if (_[id] > maxReduceDepth) {
            delete sub.oneOf;
            delete sub.anyOf;
            delete sub.allOf;
            return sub;
          }

          utils.merge(sub, $.util.findByRef(id, $.refs));
      }

      if (Array.isArray(sub.allOf)) {
        var schemas: JsonSchema[] = sub.allOf;

        delete sub.allOf;

        // this is the only case where all sub-schemas
        // must be resolved before any merge
        schemas.forEach(function(schema: JsonSchema) {
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
  } catch (e) {
    if (e.path) {
      throw new Error(e.message + ' in ' + '/' + e.path.join('/'));
    } else {
      throw e;
    }
  }
}

export default run;
