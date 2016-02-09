var container = require('../util/container'),
    random = require('../util/random'),
    words = require('../generators/words'),
    traverse = require('../util/traverse'),
    hasProps = require('../util/has-props');

var RandExp = container.get('randexp'),
    randexp = RandExp.randexp;

var ParseError = require('../util/error');

module.exports = function(value, path, resolve) {
  var props = {};

  if (!(value.properties || value.patternProperties || value.additionalProperties)) {
    if (hasProps(value, 'minProperties', 'maxProperties', 'dependencies', 'required')) {
      throw new ParseError('missing properties for ' + JSON.stringify(value), path);
    }

    return props;
  }

  var reqProps = value.required || [],
      allProps = value.properties ? Object.keys(value.properties) : [];

  reqProps.forEach(function(key) {
    if (value.properties && value.properties[key]) {
      props[key] = value.properties[key];
    }
  });

  var optProps = allProps.filter(function(prop) {
    return reqProps.indexOf(prop) === -1;
  });

  if (value.patternProperties) {
    optProps = Array.prototype.concat.apply(optProps, Object.keys(value.patternProperties));
  }

  var length = random(value.minProperties, value.maxProperties, 0, optProps.length);

  random.shuffle(optProps).slice(0, length).forEach(function(key) {
    if (value.properties && value.properties[key]) {
      props[key] = value.properties[key];
    } else {
      props[randexp(key)] = value.patternProperties[key];
    }
  });

  var current = Object.keys(props).length,
      sample = typeof value.additionalProperties === 'object' ? value.additionalProperties : {};

  if (current < length) {
    words(length - current).forEach(function(key) {
      props[key + randexp('[a-f\\d]{4,7}')] = sample;
    });
  }

  return traverse(props, path.concat(['properties']), resolve);
};
