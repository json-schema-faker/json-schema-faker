'use strict';

var random = require('./random'),
    combine = require('./combine');

function traverse(obj) {
  var primitives = require('./primitives');

  var copy = {};

  if (Array.isArray(obj)) {
    copy = [];
  }

  var mix = obj.allOf || obj.anyOf || obj.oneOf;

  if (mix) {
    var fixed = {};

    if (obj.oneOf || obj.anyOf) {
      var offset = random(0, mix.length),
          length = 1;

      mix.splice(offset, length);
    }

    delete obj.allOf;
    delete obj.anyOf;
    delete obj.oneOf;

    mix.forEach(function(value) {
      combine(fixed, value);
    });

    combine(obj, fixed);
  }

  if (obj.enum) {
    return obj.enum[random(0, obj.enum.length - 1)];
  }

  if (obj.type) {
    if (!primitives[obj.type]) {
      throw new Error('Unknown primitive "' + obj.type + '"');
    }

    return primitives[obj.type](obj);
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
