import { JSONPath } from 'jsonpath-plus';

import optionAPI from '../api/option';
import traverse from './traverse';
import random from './random';
import utils from './utils';

function isEmpty(value) {
  return Object.prototype.toString.call(value) === '[object Object]' && !Object.keys(value).length;
}

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

function clean(obj, isArray) {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj
      .map(value => clean(value, true))
      .filter(value => typeof value !== 'undefined');
  }

  Object.keys(obj).forEach(k => {
    if (!isEmpty(obj[k])) {
      const value = clean(obj[k]);

      if (!isEmpty(value)) {
        obj[k] = value;
      }
    } else {
      delete obj[k];
    }
  });

  if (!Object.keys(obj).length && isArray) {
    return undefined;
  }

  return obj;
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
        values[key] = JSONPath(params.path, data).slice(0, params.count);
      } else {
        values[key] = JSONPath(params.path, data);
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
  let depth = 0;

  try {
    const result = traverse(utils.clone(schema), [], function reduce(sub, index, rootPath, parentSchema) {
      if (typeof sub.generate === 'function') {
        return sub;
      }

      // cleanup
      const _id = sub.$id || sub.id;

      if (typeof _id === 'string') {
        delete sub.id;
        delete sub.$id;
        delete sub.$schema;
      }

      if (typeof sub.$ref === 'string') {
        if (index !== null && parentSchema && parentSchema.required) {
          if (parentSchema.required.includes(index)) return sub;
        }

        if (sub.$ref === '#' || (++depth > random.number(0, 1))) {
          delete sub.$ref;
          return sub;
        }

        let ref;

        if (sub.$ref.indexOf('#/') === -1) {
          ref = refs[sub.$ref] || null;
        }

        if (sub.$ref.indexOf('#/definitions/') === 0) {
          ref = schema.definitions[sub.$ref.split('#/definitions/')[1]] || null;
        }

        if (typeof ref !== 'undefined') {
          if (!ref && optionAPI('ignoreMissingRefs') !== true) {
            throw new Error(`Reference not found: ${sub.$ref}`);
          }

          utils.merge(sub, ref || {});
        }

        // just remove the reference
        delete sub.$ref;
        return sub;
      }

      if (Array.isArray(sub.allOf)) {
        const schemas = sub.allOf;

        delete sub.allOf;

        // this is the only case where all sub-schemas
        // must be resolved before any merge
        schemas.forEach(subSchema => {
          const _sub = reduce(subSchema, null, rootPath);

          // call given thunks if present
          utils.merge(sub, typeof _sub.thunk === 'function'
            ? _sub.thunk(sub)
            : _sub);
        });
      }

      if (Array.isArray(sub.oneOf || sub.anyOf)) {
        const mix = sub.oneOf || sub.anyOf;

        // test every value from the enum against each-oneOf
        // schema, only values that validate once are kept
        if (sub.enum && sub.oneOf) {
          sub.enum = sub.enum.filter(x => utils.validate(x, mix));
        }

        return {
          thunk(rootSchema) {
            const copy = utils.omitProps(sub, ['anyOf', 'oneOf']);
            const fixed = random.pick(mix);

            utils.merge(copy, fixed);

            // remove additional properties from merged schemas
            mix.forEach(omit => {
              if (omit.required && omit !== fixed) {
                omit.required.forEach(key => {
                  if (copy.properties && !copy.required.includes(key)) {
                    delete copy.properties[key];
                  }

                  if (rootSchema && rootSchema.properties) {
                    delete rootSchema.properties[key];
                  }
                });
              }
            });

            return copy;
          },
        };
      }

      Object.keys(sub).forEach(prop => {
        if ((Array.isArray(sub[prop]) || typeof sub[prop] === 'object') && !utils.isKey(prop)) {
          sub[prop] = reduce(sub[prop], prop, rootPath.concat(prop), parentSchema);
        }
      });

      // avoid extra calls on sub-schemas, fixes #458
      if (rootPath) {
        const lastProp = rootPath[rootPath.length - 1];

        if (lastProp === 'properties' || lastProp === 'items') {
          return sub;
        }
      }

      return container.wrap(sub);
    });

    if (optionAPI('resolveJsonPath')) {
      return resolve(clean(result));
    }

    return clean(result);
  } catch (e) {
    if (e.path) {
      throw new Error(`${e.message} in /${e.path.join('/')}`);
    } else {
      throw e;
    }
  }
}

export default run;
