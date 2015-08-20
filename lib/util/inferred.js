'use strict';

var inferredProperties = {
  array: [
    'additionalItems',
    'items',
    'maxItems',
    'minItems',
    'uniqueItems'
  ],
  integer: [
    'exclusiveMaximum',
    'exclusiveMinimum',
    'maximum',
    'minimum',
    'multipleOf'
  ],
  object: [
    'additionalProperties',
    'dependencies',
    'maxProperties',
    'minProperties',
    'patternProperties',
    'properties',
    'required'
  ],
  string: [
    'maxLength',
    'menlength',
    'pattern'
  ]
};

inferredProperties.number = inferredProperties.integer;

function mayHaveType(obj, props) {
  return Object.keys(obj).filter(function(prop) {
    return props.indexOf(prop) > -1;
  }).length > 0;
}

module.exports = function(obj, path) {
  // We have to short circuit these objects whose path ends with either of these two properties since they can have
  // property names that match inferred property names (Issue 62)
  if (['additionalProperties', 'properties'].indexOf(path[path.length - 1]) > -1) {
    return;
  } else {
    for (var type in inferredProperties) {
      if (mayHaveType(obj, inferredProperties[type])) {
        return type;
      }
    }
  }
};
