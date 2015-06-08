'use strict';

var random = require('./random'),
    combine = require('./combine');

var ParseError = require('./error');
var inferredProperties = {
  array: [
    'additionalItems',
    'items',
    'maxItems',
    'minItems',
    'uniqueItems'
  ],
  integer: [
    'exclusiveMaximum',
    'exclusiveMinimum',
    'maximum',
    'minimum',
    'multipleOf'
  ],
  object: [
    'additionalProperties',
    'dependencies',
    'maxProperties',
    'minProperties',
    'patternProperties',
    'properties',
    'required'
  ],
  string: [
    'maxLength',
    'menlength',
    'pattern'
  ]
};

inferredProperties.number = inferredProperties.integer;

function reduce(obj) {
  var mix = obj.allOf || obj.anyOf || obj.oneOf;

  if (!(mix && mix.length)) {
    for (var key in obj) {
      var value = obj[key];

      if (typeof value === 'object' && !(key === 'enum' || key === 'required')) {
        reduce(value);
      }
    }

    return;
  }

  if ((obj.oneOf || obj.anyOf) && mix.length) {
    mix = [random.pick(mix)];
  }

  delete obj.allOf;
  delete obj.anyOf;
  delete obj.oneOf;

  var fixed = {};

  mix.forEach(function(value) {
    combine(fixed, value);
  });

  combine(obj, fixed);

  while (obj.allOf || obj.anyOf || obj.oneOf) {
    reduce(obj);
  }
}

function traverse(obj, path) {
  var primitives = require('./primitives');

  var copy = {};

  if (Array.isArray(obj)) {
    copy = [];
  }

  path = path || [];

  reduce(obj);

  if (Array.isArray(obj.enum)) {
    return random.pick(obj.enum);
  }

  var type = obj.type;

  if (Array.isArray(type)) {
    type = random.pick(type);
  } else if (typeof type === 'undefined') {
    // Attempt to infer the type
    var typeProperties;

    for (var key in inferredProperties) {
      typeProperties = inferredProperties[key];

      for (var i = 0; i < typeProperties.length; i++) {
        if (typeof obj[typeProperties[i]] !== 'undefined') {
          type = key;

          break;
        }
      }

      if (typeof type !== 'undefined') {
        break;
      }
    }
  }

  if (typeof type === 'string') {
    if (!primitives[type]) {
      throw new ParseError('unknown primitive ' + JSON.stringify(type), path.concat(['type']));
    }

    try {
      return primitives[type](obj, path);
    } catch (e) {
      if (typeof e.path === 'undefined') {
        throw new ParseError(e.message, path)
      }

      throw e;
    }
  }

  for (var key in obj) {
    var value = obj[key];

    if (typeof value === 'object') {
      copy[key] = traverse(value, path.concat([key]));
    } else {
      copy[key] = value;
    }
  }

  return copy;
}

module.exports = traverse;
