var random = require('./random');

var ParseError = require('./error');

var inferredType = require('./inferred');

var primitives = null;

function traverse(obj, path, resolve) {
  resolve(obj);

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
        throw new ParseError(e.message, path);
      }

      throw e;
    }
  }

  for (var prop in obj) {
    if (typeof obj[prop] === 'object' && prop !== 'definitions') {
      copy[prop] = traverse(obj[prop], path.concat([prop]), resolve);
    } else {
      copy[prop] = obj[prop];
    }
  }

  return copy;
}

module.exports = function() {
  primitives = primitives || require('./primitives');

  return traverse.apply(null, arguments);
};
