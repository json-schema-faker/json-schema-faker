import utils from './utils';
import random from './random';
import ParseError from './error';
import inferType from './infer';
import types from '../types/index';
import optionAPI from '../api/option';

// TODO provide types
function traverse(schema, path, resolve, rootSchema) {
  schema = resolve(schema, null, path);

  if (!schema) {
    return;
  }

  // default values has higher precedence
  if (path[path.length - 1] !== 'properties') {
    // example values have highest precedence
    if (optionAPI('useExamplesValue') && Array.isArray(schema.examples)) {
      // include `default` value as example too
      const fixedExamples = schema.examples
        .concat('default' in schema ? [schema.default] : []);

      return utils.typecast(null, schema, () => random.pick(fixedExamples));
    }

    if (optionAPI('useDefaultValue') && 'default' in schema) {
      if (schema.default !== '' || !optionAPI('replaceEmptyByRandomValue')) {
        return schema.default;
      }
    }

    if ('template' in schema) {
      return utils.template(schema.template, rootSchema);
    }

    if ('const' in schema) {
      return schema.const;
    }
  }

  if (schema.not && typeof schema.not === 'object') {
    schema = utils.notValue(schema.not, utils.omitProps(schema, ['not']));

    // build new object value from not-schema!
    if (schema.type && schema.type === 'object') {
      const traverseResult = traverse(schema, path.concat(['not']), resolve, rootSchema);
      return utils.clean(traverseResult, schema, false);
    }
  }

  // thunks can return sub-schemas
  if (typeof schema.thunk === 'function') {
    // result is already cleaned in thunk
    return traverse(schema.thunk(rootSchema), path, resolve);
  }

  if (typeof schema.generate === 'function') {
    return utils.typecast(null, schema, () => schema.generate(rootSchema));
  }

  if (typeof schema.pattern === 'string') {
    return utils.typecast('string', schema, () => random.randexp(schema.pattern));
  }

  if (Array.isArray(schema.enum)) {
    return utils.typecast(null, schema, () => random.pick(schema.enum));
  }

  // short-circuit as we don't plan generate more values!
  if (schema.jsonPath) {
    return schema;
  }

  // TODO remove the ugly overcome
  let type = schema.type;

  if (Array.isArray(type)) {
    type = random.pick(type);
  } else if (typeof type === 'undefined') {
    // Attempt to infer the type
    type = inferType(schema, path) || type;

    if (type) {
      schema.type = type;
    }
  }

  if (typeof type === 'string') {
    if (!types[type]) {
      if (optionAPI('failOnInvalidTypes')) {
        throw new ParseError(`unknown primitive ${utils.short(type)}`, path.concat(['type']));
      } else {
        const value = optionAPI('defaultInvalidTypeProduct');

        if (typeof value === 'string' && types[value]) {
          return types[value](schema, path, resolve, traverse);
        }

        return value;
      }
    } else {
      try {
        return types[type](schema, path, resolve, traverse);
      } catch (e) {
        if (typeof e.path === 'undefined') {
          throw new ParseError(e.stack, path);
        }
        throw e;
      }
    }
  }

  let copy = {};

  if (Array.isArray(schema)) {
    copy = [];
  }

  Object.keys(schema).forEach(prop => {
    if (typeof schema[prop] === 'object' && prop !== 'definitions') {
      const traverseResult = traverse(schema[prop], path.concat([prop]), resolve, copy);
      copy[prop] = utils.clean(traverseResult, schema[prop], false);
    } else {
      copy[prop] = schema[prop];
    }
  });

  return copy;
}

export default traverse;
