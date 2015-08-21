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

var subschemaProperties = [
  'additionalItems', 'items', 'additionalProperties', 'dependencies', 'patternProperties', 'properties'
];

inferredProperties.number = inferredProperties.integer;

function mayHaveType(obj, path, props) {
  return Object.keys(obj).filter(function(prop) {
    if (props.indexOf(prop) > -1 && subschemaProperties.indexOf(path[path.length - 1]) === -1) {
      return true;
    }
  }).length > 0;
}

module.exports = function(obj, path) {
  for (var type in inferredProperties) {
    if (mayHaveType(obj, path, inferredProperties[type])) {
      return type;
    }
  }
};
