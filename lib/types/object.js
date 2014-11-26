'use strict';

var traverse = require('../util/traverse'),
    hasProps = require('../util/has-props');

module.exports = function(value) {
  var props = {};

  if (!value.properties) {
    if (hasProps(value, 'minProperties', 'maxProperties', 'additionalProperties', 'patternProperties', 'dependencies', 'required')) {
      throw new Error('Missing properties for object "' + JSON.stringify(value) + '"');
    }

    return props;
  }

  var reqs = value.required || [];

  for (var key in value.properties) {
    var skip = Math.random() > 0.5;

    if (!(skip && reqs.indexOf(key) === -1)) {
      props[key] = value.properties[key];
    }
  }

  return traverse(props);
};
