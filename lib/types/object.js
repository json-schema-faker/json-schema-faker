'use strict';

var faker = require('faker'),
    Randexp = require('randexp');

var random = require('../util/random'),
    traverse = require('../util/traverse'),
    hasProps = require('../util/has-props');

function shuffle(obj) {
  var copy = obj.slice(),
      length = obj.length;

  for (; length > 0;) {
    var key = Math.floor(Math.random() * length),
        tmp = copy[--length];

    copy[length] = copy[key];
    copy[key] = tmp;
  }

  return copy;
}

module.exports = function(value) {
  var props = {};

  if (!(value.properties || value.patternProperties || value.additionalProperties)) {
    if (hasProps(value, 'minProperties', 'maxProperties', 'dependencies', 'required')) {
      throw new Error('Missing properties for object "' + JSON.stringify(value) + '"');
    }

    return props;
  }

  var reqs = value.required || [],
      base = value.properties ? Object.keys(value.properties) : [];

  reqs.forEach(function(key) {
    if (value.properties && value.properties[key]) {
      props[key] = value.properties[key];
    }

    base.splice(base.indexOf(key), 1);
  });

  if (value.patternProperties) {
    base = Array.prototype.concat.apply(base, Object.keys(value.patternProperties));
  }

  var length = random(value.minProperties, value.maxProperties, 1, 5),
      sample = typeof value.additionalProperties === 'object' ? value.additionalProperties : {};

  shuffle(base).slice(0, length).forEach(function(key) {
    if (value.properties && value.properties[key]) {
      props[key] = value.properties[key];
    } else {
      props[Randexp.randexp(key)] = value.patternProperties[key];
    }
  });

  var current = Object.keys(props).length;

  faker.lorem.words(length - current).forEach(function(key) {
    props[key + Randexp.randexp('\\w+')] = sample;
  });

  return traverse(props);
};
