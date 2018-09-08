import optionAPI from '../api/option';
import traverse from './traverse';
import random from './random';
import utils from './utils';

import deref from 'deref';
import jsonpath from 'jsonpath';

function pick(data) {
  return Array.isArray(data)
    ? random.pick(data)
    : data;
}

function cycle(data, reverse) {
  if (!Array.isArray(data)) {
    return data;
  }

  const value = reverse
    ? data.pop()
    : data.shift();

  if (reverse) {
    data.unshift(value);
  } else {
    data.push(value);
  }

  return value;
}

function resolve(obj, data, values, property) {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }

  if (!values) {
    values = {};
  }

  if (!data) {
    data = obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(x => resolve(x, data, values, property));
  }

  if (obj.jsonPath) {
    const params = typeof obj.jsonPath !== 'object'
      ? { path: obj.jsonPath }
      : obj.jsonPath;

    params.group = obj.group || params.group || property;
    params.cycle = obj.cycle || params.cycle || false;
    params.reverse = obj.reverse || params.reverse || false;
    params.count = obj.count || params.count || 1;

    const key = `${params.group}__${params.path}`;

    if (!values[key]) {
      if (params.count > 1) {
        values[key] = jsonpath.query(data, params.path, params.count);
      } else {
        values[key] = jsonpath.value(data, params.path);
      }
    }

    if (params.cycle || params.reverse) {
      return cycle(values[key], params.reverse);
    }

    return pick(values[key]);
  }

  Object.keys(obj).forEach(k => {
    obj[k] = resolve(obj[k], data, values, k);
  });

  return obj;
}

// TODO provide types
function run(refs, schema, container) {
  try {
    const result = traverse(schema, [], function reduce(sub, maxReduceDepth, parentSchemaPath) {
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
        var schemas = sub.allOf;

        delete sub.allOf;

        // this is the only case where all sub-schemas
        // must be resolved before any merge
        schemas.forEach(function(subSchema) {
          var _sub = reduce(subSchema, maxReduceDepth + 1, parentSchemaPath);

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
          sub[prop] = reduce(sub[prop], maxReduceDepth, parentSchemaPath.concat(prop));
        }
      }

      // avoid extra calls on sub-schemas, fixes #458
      if (parentSchemaPath) {
        const lastProp = parentSchemaPath[parentSchemaPath.length - 1];

        if (lastProp === 'properties' || lastProp === 'items') {
          return sub;
        }
      }

      return container.wrap(sub);
    });

    if (optionAPI('resolveJsonPath')) {
      return resolve(result);
    }

    return result;
  } catch (e) {
    if (e.path) {
      throw new Error(e.message + ' in ' + '/' + e.path.join('/'));
    } else {
      throw e;
    }
  }
}

export default run;
