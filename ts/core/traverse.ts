import random = require('./random');
import ParseError = require('./error');
import inferType = require('./infer');
import types = require('../types/index');
import option = require('../api/option');

function isExternal(schema: IGeneratorSchema): boolean {
  return schema.faker || schema.chance;
}

function reduceExternal(schema: IGeneratorSchema, path: SchemaPath): IGeneratorSchema {
  if (schema['x-faker']) {
    schema.faker = schema['x-faker'];
  }
  if (schema['x-chance']) {
    schema.chance = schema['x-chance'];
  }

  var fakerUsed: boolean = schema.faker !== undefined,
    chanceUsed: boolean = schema.chance !== undefined;
  if (fakerUsed && chanceUsed) {
    throw new ParseError('ambiguous generator when using both faker and chance: ' + JSON.stringify(schema), path);
  }

  return schema;
}

// TODO provide types
function traverse(schema: JsonSchema, path: SchemaPath, resolve: Function) {
  resolve(schema);

  if (Array.isArray(schema.enum)) {
    return random.pick(schema.enum);
  }

  if (option('useDefaultValue') && schema.default) {
    return schema.default;
  }

  // TODO remove the ugly overcome
  var type: any = schema.type;

  if (Array.isArray(type)) {
    type = random.pick(type);
  } else if (typeof type === 'undefined') {
    // Attempt to infer the type
    type = inferType(schema, path) || type;
  }

  schema = reduceExternal(schema, path);
  if (isExternal(schema)) {
    type = 'external';
  }

  if (typeof type === 'string') {
    if (!types[type]) {
      if (option('failOnInvalidTypes')) {
        throw new ParseError('unknown primitive ' + JSON.stringify(type), path.concat(['type']));
      } else {
        return option('defaultInvalidTypeProduct');
      }
    } else {
      try {
        return types[type](schema, path, resolve, traverse);
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

export = traverse;
