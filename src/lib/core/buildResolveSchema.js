import optionAPI from '../api/option';
import random from './random';
import utils from './utils';

const buildResolveSchema = ({
  refs,
  schema,
  container,
  refDepthMax,
  refDepthMin,
}) => {
  const recursiveUtil = {};
  const seenRefs = {};

  let depth = 0;
  let lastRef;

  recursiveUtil.resolveSchema = (sub, index, rootPath) => {
    // prevent null sub from default/example null values to throw
    if (sub === null || sub === undefined) {
      return null;
    }

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
      const maxDepth = Math.max(refDepthMin, refDepthMax) - 1;

      // increasing depth only for repeated refs seems to be fixing #258
      if (sub.$ref === '#' || seenRefs[sub.$ref] < 0 || (lastRef === sub.$ref && ++depth > maxDepth)) {
        delete sub.$ref;
        return sub;
      }

      if (typeof seenRefs[sub.$ref] === 'undefined') {
        seenRefs[sub.$ref] = random.number(refDepthMin, refDepthMax) - 1;
      }

      lastRef = sub.$ref;

      let ref;

      if (sub.$ref.indexOf('#/') === -1) {
        ref = refs[sub.$ref] || null;
      } else {
        ref = utils.getLocalRef(schema, sub.$ref) || null;
      }

      if (typeof ref !== 'undefined') {
        if (!ref && optionAPI('ignoreMissingRefs') !== true) {
          throw new Error(`Reference not found: ${sub.$ref}`);
        }

        seenRefs[sub.$ref] -= 1;
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
        const _sub = recursiveUtil.resolveSchema(subSchema, null, rootPath);

        // call given thunks if present
        utils.merge(sub, typeof _sub.thunk === 'function'
          ? _sub.thunk(sub)
          : _sub);
        if (Array.isArray(sub.allOf)) {
          recursiveUtil.resolveSchema(sub, index, rootPath);
        }
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
                const includesKey = copy.required && copy.required.includes(key);
                if (copy.properties && !includesKey) {
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
        sub[prop] = recursiveUtil.resolveSchema(sub[prop], prop, rootPath.concat(prop));
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
  };

  return recursiveUtil;
};

export default buildResolveSchema;
