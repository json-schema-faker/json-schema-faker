import utils from './utils';
import random from './random';
import ParseError from './error';
import inferType from './infer';
import types from '../types/index';
import optionAPI from '../api/option';

// TODO provide types
function traverse(schema: JsonSchema, path: SchemaPath, resolve: Function, rootSchema?: JsonSchema) {
  schema = resolve(schema);

  if (!schema) {
    return;
  }

  // example values have highest precedence
  if (optionAPI('useExampleValue') && Array.isArray(schema.examples)) {
    return utils.typecast(schema, () => random.pick(schema.examples));
  }

  // default values has higher precedence
  if (optionAPI('useDefaultValue') && 'default' in schema) {
    return schema.default;
  }

  if (schema.not && typeof schema.not === 'object') {
    schema = utils.notValue(schema.not, utils.omitProps(schema, ['not']));
  }

  if (Array.isArray(schema.enum)) {
    return utils.typecast(schema, () => random.pick(schema.enum));
  }

  // thunks can return sub-schemas
  if (typeof schema.thunk === 'function') {
    return traverse(schema.thunk(), path, resolve);
  }

  if (typeof schema.generate === 'function') {
    return utils.typecast(schema, () => schema.generate(rootSchema));
  }

  // TODO remove the ugly overcome
  var type: any = schema.type;

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
        throw new ParseError('unknown primitive ' + utils.short(type), path.concat(['type']));
      } else {
        return optionAPI('defaultInvalidTypeProduct');
      }
    } else {
      try {
        const result = types[type](schema, path, resolve, traverse);

        const required = schema.items
          ? schema.items.required
          : schema.required;

        return utils.clean(result, null, required);
      } catch (e) {
        if (typeof e.path === 'undefined') {
          throw new ParseError(e.message, path);
        }
        throw e;
      }
    }
  }

  var copy = {};

  if (Array.isArray(schema)) {
    copy = [];
  }

  for (var prop in schema) {
    if (typeof schema[prop] === 'object' && prop !== 'definitions') {
      copy[prop] = traverse(schema[prop], path.concat([prop]), resolve, copy);
    } else {
      copy[prop] = schema[prop];
    }
  }

  return copy;
}

export default traverse;
