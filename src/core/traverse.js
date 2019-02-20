import utils from './utils';
import random from './random';
import ParseError from './error';
import inferType from './infer';
import types from '../types/index';
import optionAPI from '../api/option';

// TODO provide types
function traverse(schema, path, resolve, rootSchema) {
  schema = resolve(schema, undefined, path);

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
      return schema.default;
    }

    if ('template' in schema) {
      return utils.template(schema.template, rootSchema);
    }
  }

  if (schema.not && typeof schema.not === 'object') {
    schema = utils.notValue(schema.not, utils.omitProps(schema, ['not']));
  }

  if ('const' in schema) {
    return schema.const;
  }

  if (Array.isArray(schema.enum)) {
    return utils.typecast(null, schema, () => random.pick(schema.enum));
  }

  // thunks can return sub-schemas
  if (typeof schema.thunk === 'function') {
    return traverse(schema.thunk(), path, resolve);
  }

  if (typeof schema.generate === 'function') {
    return utils.typecast(null, schema, () => schema.generate(rootSchema));
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
        return optionAPI('defaultInvalidTypeProduct');
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
      copy[prop] = traverse(schema[prop], path.concat([prop]), resolve, copy);
    } else {
      copy[prop] = schema[prop];
    }
  });

  return copy;
}

export default traverse;
