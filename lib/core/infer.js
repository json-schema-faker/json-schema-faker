"use strict";
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
        'minLength',
        'pattern'
    ]
};
inferredProperties.number = inferredProperties.integer;
var subschemaProperties = [
    'additionalItems',
    'items',
    'additionalProperties',
    'dependencies',
    'patternProperties',
    'properties'
];
/**
 * Iterates through all keys of `obj` and:
 * - checks whether those keys match properties of a given inferred type
 * - makes sure that `obj` is not a subschema; _Do not attempt to infer properties named as subschema containers. The
 * reason for this is that any property name within those containers that matches one of the properties used for
 * inferring missing type values causes the container itself to get processed which leads to invalid output. (Issue 62)_
 *
 * @returns {boolean}
 */
function matchesType(obj, lastElementInPath, inferredTypeProperties) {
    return Object.keys(obj).filter(function (prop) {
        var isSubschema = subschemaProperties.indexOf(lastElementInPath) > -1, inferredPropertyFound = inferredTypeProperties.indexOf(prop) > -1;
        if (inferredPropertyFound && !isSubschema) {
            return true;
        }
    }).length > 0;
}
/**
 * Checks whether given `obj` type might be inferred. The mechanism iterates through all inferred types definitions,
 * tries to match allowed properties with properties of given `obj`. Returns type name, if inferred, or null.
 *
 * @returns {string|null}
 */
function inferType(obj, schemaPath) {
    for (var typeName in inferredProperties) {
        var lastElementInPath = schemaPath[schemaPath.length - 1];
        if (matchesType(obj, lastElementInPath, inferredProperties[typeName])) {
            return typeName;
        }
    }
}
module.exports = inferType;
