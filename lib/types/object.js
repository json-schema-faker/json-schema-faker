'use strict';

var Randexp = require('randexp');

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

  if (!(value.properties || value.patternProperties)) {
    if (hasProps(value, 'minProperties', 'maxProperties', 'additionalProperties', 'dependencies', 'required')) {
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

  var min = value.minProperties || 0,
      max = random(min, value.maxProperties || (min + 1));

  shuffle(base).slice(0, max).forEach(function(key) {
    if (value.properties && value.properties[key]) {
      props[key] = value.properties[key];
    } else {
      props[Randexp.randexp(key)] = value.patternProperties[key];
    }
  });

  return traverse(props);
};
