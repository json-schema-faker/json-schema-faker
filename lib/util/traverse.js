'use strict';

var random = require('./random'),
    combine = require('./combine');

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

function traverse(obj) {
  var primitives = require('./primitives');

  var copy = {};

  if (Array.isArray(obj)) {
    copy = [];
  }

  reduce(obj);

  if (Array.isArray(obj.enum)) {
    return random.pick(obj.enum);
  }

  var type = obj.type;

  if (Array.isArray(type)) {
    type = random.pick(type);
  }

  if (typeof type === 'string') {
    if (!primitives[type]) {
      throw new Error('Unknown primitive "' + type + '"');
    }

    return primitives[type](obj);
  }

  for (var key in obj) {
    var value = obj[key];

    if (typeof value === 'object') {
      copy[key] = traverse(value);
    } else {
      copy[key] = value;
    }
  }

  return copy;
}

module.exports = traverse;
