import utils from './utils';
import random from './random';
import ParseError from './error';
import inferType from './infer';
import types from '../types/index';
import optionAPI from '../api/option';

function getMeta({ $comment: comment, title, description }) {
  return Object.fromEntries(
    Object.entries({ comment, title, description })
      .filter(([, value]) => value),
  );
}

// TODO provide types
function traverse(schema, path, resolve, rootSchema) {
  schema = resolve(schema, null, path);

  if (!schema) {
    return;
  }

  const context = getMeta(schema);

  // default values has higher precedence
  if (path[path.length - 1] !== 'properties') {
    // example values have highest precedence
    if (optionAPI('useExamplesValue') && Array.isArray(schema.examples)) {
      // include `default` value as example too
      const fixedExamples = schema.examples
        .concat('default' in schema ? [schema.default] : []);

      return { value: utils.typecast(null, schema, () => random.pick(fixedExamples)), context };
    }

    if (optionAPI('useDefaultValue') && 'default' in schema) {
      if (schema.default !== '' || !optionAPI('replaceEmptyByRandomValue')) {
        return { value: schema.default, context };
      }
    }

    if ('template' in schema) {
      return { value: utils.template(schema.template, rootSchema), context };
    }

    if ('const' in schema) {
      return { value: schema.const, context };
    }
  }

  if (schema.not && typeof schema.not === 'object') {
    schema = utils.notValue(schema.not, utils.omitProps(schema, ['not']));

    // build new object value from not-schema!
    if (schema.type && schema.type === 'object') {
      const { value, context: innerContext } = traverse(schema, path.concat(['not']), resolve, rootSchema);
      return { value: utils.clean(value, schema, false), context: { ...context, ...innerContext } };
    }
  }

  // thunks can return sub-schemas
  if (typeof schema.thunk === 'function') {
    // result is already cleaned in thunk
    return { value: traverse(schema.thunk(rootSchema), path, resolve), context };
  }

  if (typeof schema.generate === 'function') {
    const retval = utils.typecast(null, schema, () => schema.generate(rootSchema, path));
    const type = retval === null ? 'null' : typeof retval;
    if (type === schema.type
      || (Array.isArray(schema.type) && schema.type.includes(type))
      || (type === 'number' && schema.type === 'integer')
      || (Array.isArray(retval) && schema.type === 'array')) {
      return { value: retval, context };
    }
  }

  if (typeof schema.pattern === 'string') {
    return { value: utils.typecast('string', schema, () => random.randexp(schema.pattern)), context };
  }

  if (Array.isArray(schema.enum)) {
    return { value: utils.typecast(null, schema, () => random.pick(schema.enum)), context };
  }

  // short-circuit as we don't plan generate more values!
  if (schema.jsonPath) {
    return { value: schema, context };
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
          return { value: types[value](schema, path, resolve, traverse), context };
        }

        return { value, context };
      }
    } else {
      try {
        const innerResult = types[type](schema, path, resolve, traverse);
        if (Array.isArray(innerResult)) {
          return {
            value: innerResult.map(({ value }) => value),
            context: {
              ...context,
              ...innerResult.map(({ context: c }) => c),
            },
          };
        } if (type === 'object') {
          return { value: innerResult.value, context: { ...context, ...innerResult.context } };
        }
        return { value: innerResult, context };
      } catch (e) {
        if (typeof e.path === 'undefined') {
          throw new ParseError(e.stack, path);
        }
        throw e;
      }
    }
  }

  let valueCopy = {};
  let contextCopy = { ...context };

  if (Array.isArray(schema)) {
    valueCopy = [];
  }

  Object.keys(schema).forEach(prop => {
    if (typeof schema[prop] === 'object' && prop !== 'definitions') {
      const { value, context: innerContext } = traverse(schema[prop], path.concat([prop]), resolve, valueCopy);
      valueCopy[prop] = utils.clean(value, schema[prop], false);
      contextCopy[prop] = innerContext;
    } else {
      valueCopy[prop] = schema[prop];
    }
  });

  return { value: valueCopy, context: contextCopy };
}

export default traverse;
