import utils from './utils';
import random from './random';
import ParseError from './error';
import inferType from './infer';
import types from '../types/index';
import optionAPI from '../api/option';

// TODO provide types
function traverse(schema: JsonSchema, path: SchemaPath, resolve: Function) {
  schema = resolve(schema);

  if (!schema) {
    return;
  }

  if (optionAPI('useDefaultValue') && 'default' in schema) {
    return schema.default;
  }

  if (Array.isArray(schema.enum)) {
    return random.pick(schema.enum);
  }

  // thunks can return sub-schemas
  if (typeof schema.thunk === 'function') {
    return traverse(schema.thunk(), path, resolve);
  }

  if (typeof schema.generate === 'function') {
    return utils.typecast(schema.generate(), schema);
  }

  // TODO remove the ugly overcome
  var type: any = schema.type;

  if (Array.isArray(type)) {
    type = random.pick(type);
  } else if (typeof type === 'undefined') {
    // Attempt to infer the type
    type = inferType(schema, path) || type;
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
        return utils.clean(types[type](schema, path, resolve, traverse), null, schema.required);
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
      copy[prop] = traverse(schema[prop], path.concat([prop]), resolve);
    } else {
      copy[prop] = schema[prop];
    }
  }

  return copy;
}

export default traverse;
