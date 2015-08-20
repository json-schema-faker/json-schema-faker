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
  // Do not attempt to infer properties named additionalProperties or properties containers.  The reason for this is
  // that any property name within those containers that matches one of the properties used for inferring missing type
  // values causes the container itself to get processed which leads to invalid output.  (Issue 62)
  if (['additionalProperties', 'properties'].indexOf(path[path.length -1]) > -1) {
    // The only way a container is encountered is if there is an odd number of path segments and the parent path
    // segment is not either additionalProperties or properties.
    if (path.length % 2 !== 0 || ['additionalProperties', 'properties'].indexOf(path[path.length - 2]) === -1) {
      return;
    }
  }

  for (var type in inferredProperties) {
    if (mayHaveType(obj, inferredProperties[type])) {
      return type;
    }
  }
};
