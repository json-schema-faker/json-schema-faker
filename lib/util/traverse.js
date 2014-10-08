'use strict';

var primitives = require('./primitives');

function traverse(obj) {
  var copy = {};

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
