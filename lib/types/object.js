'use strict';

var faker = require('faker'),
    Randexp = require('randexp');

var random = require('../util/random'),
    traverse = require('../util/traverse'),
    hasProps = require('../util/has-props');

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

  reqs.forEach(function(key, index) {
    if (value.properties && value.properties[key]) {
      props[key] = value.properties[key];
    }

    base.splice(index, 1);
  });

  if (value.patternProperties) {
    base = Array.prototype.concat.apply(base, Object.keys(value.patternProperties));
  }

  var length = random(value.minProperties, value.maxProperties, 1, 5);

  random.shuffle(base).slice(0, length).forEach(function(key) {
    if (value.properties && value.properties[key]) {
      props[key] = value.properties[key];
    } else {
      props[Randexp.randexp(key)] = value.patternProperties[key];
    }
  });

  if (value.minProperties || value.maxProperties || value.additionalProperties) {
    var current = Object.keys(props).length;

    if (current < length) {
      var sample = typeof value.additionalProperties === 'object' ? value.additionalProperties : {};

      faker.lorem.words(length - current).forEach(function(key) {
        props[key + Randexp.randexp('\\w{1,10}')] = sample;
      });
    }
  }

  return traverse(props);
};
