'use strict';

var random = require('./random'),
    combine = require('./combine');

var ParseError = require('./error');

var inferredType = require('./inferred');

var primitives = null;

var deref = require('deref');

function traverse(obj, path, resolve) {
  var copy = {};

  if (Array.isArray(obj)) {
    copy = [];
  }

  if (Array.isArray(obj.enum)) {
    return random.pick(obj.enum);
  }

  var type = obj.type;

  if (Array.isArray(type)) {
    type = random.pick(type);
  } else if (typeof type === 'undefined') {
    // Attempt to infer the type
    type = inferredType(obj, path) || type;
  }

  if (typeof type === 'string') {
    if (!primitives[type]) {
      throw new ParseError('unknown primitive ' + JSON.stringify(type), path.concat(['type']));
    }

    try {
      return primitives[type](obj, path, resolve);
    } catch (e) {
      if (typeof e.path === 'undefined') {
        throw new ParseError(e.message, path)
      }

      throw e;
    }
  }

  if (obj.$ref) {
    resolve(obj.$ref);
  }

  for (var key in obj) {
    var value = obj[key];

    if (typeof value === 'object') {
      copy[key] = traverse(value, path.concat([key]), resolve);
    } else {
      copy[key] = value;
    }
  }

  return copy;
}

module.exports = function(schema, keypath, resolve) {
  primitives = primitives || require('./primitives');

  return traverse.apply(null, arguments);
};
