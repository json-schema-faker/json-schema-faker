import random = require('./random');
import ParseError = require('./error');
import inferType = require('./infer');
import primitives = require('./primitives');

function traverse(schema: JsonSchema, path, resolve) {
  resolve(schema);

  var copy = {};

  if (Array.isArray(schema)) {
    copy = [];
  }

  if (Array.isArray(schema.enum)) {
    return random.pick(schema.enum);
  }

  var type = schema.type;

  if (Array.isArray(type)) {
    type = random.pick(type);
  } else if (typeof type === 'undefined') {
    // Attempt to infer the type
    type = inferType(schema, path) || type;
  }

  if (typeof type === 'string') {
    if (!primitives[type]) {
      throw new ParseError('unknown primitive ' + JSON.stringify(type), path.concat(['type']));
    }

    try {
      return primitives[type](schema, path, resolve, traverse);
    } catch (e) {
      if (typeof e.path === 'undefined') {
        throw new ParseError(e.message, path);
      }

      throw e;
    }
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

export = traverse;
