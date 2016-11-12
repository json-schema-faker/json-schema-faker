import container = require('../class/Container');
import random = require('../core/random');
import words = require('../generators/words');
import utils = require('../core/utils');
import ParseError = require('../core/error');

var randexp = container.get('randexp');

// TODO provide types
var objectType: FTypeGenerator = function objectType(value: IObjectSchema, path, resolve, traverseCallback: Function): Object {
  var props = {};

    var properties = value.properties || {};
    var patternProperties = value.patternProperties || {};
    var allowsAdditional = value.additionalProperties === false ? false : true;

    var propertyKeys = Object.keys(properties);
    var patternPropertyKeys = Object.keys(patternProperties);

    var additionalProperties = allowsAdditional
      ? (value.additionalProperties === true ? {} : value.additionalProperties)
      : null;

    if (
        !allowsAdditional &&
        propertyKeys.length === 0 &&
        patternPropertyKeys.length === 0 &&
        utils.hasProperties(value, 'minProperties', 'maxProperties', 'dependencies', 'required')
    ) {
        throw new ParseError('missing properties for:\n' + JSON.stringify(value, null, '  '), path);
    }

    var requiredKeys = value.required || [];

    requiredKeys.forEach(function(key) {
        if (properties[key]) {
            props[key] = properties[key];
        } else {
            var schema = {};
            patternPropertyKeys.forEach(function(pattern) {
                if (key.match(new RegExp(pattern, 'i'))) {
                    var source = patternProperties[pattern];
                    for (var _key in source) {
                        if (Object.prototype.hasOwnProperty.call(source, _key)) {
                            schema[_key] = source[_key];
                        }
                    }
                }
            });

            if (Object.keys(schema).length === 0) {
                schema = additionalProperties;
            }

            props[key] = schema;
        }
    });

    var potentialPropertyKeys = propertyKeys.filter(function (prop) {
        return requiredKeys.indexOf(prop) === -1;
    });

    var min = Math.max((value.minProperties || 0) - requiredKeys.length, 0);
    var max = Math.max((value.maxProperties || 0) - requiredKeys.length, 0);

    if (typeof value.maxProperties === 'undefined') {
        max = potentialPropertyKeys.length + patternPropertyKeys.length;
    }

    var keyCount = 0;
    var maxKeyCount = random.number(min, max);

    var tries = 0;
    var maxTries = maxKeyCount * 3;

    var propSpace = potentialPropertyKeys.length + patternPropertyKeys.length;
    if (allowsAdditional && patternPropertyKeys.length === 0) {
        propSpace += 1;
    }

    var index, _key;
    while (keyCount < maxKeyCount && tries < maxTries && propSpace > 0) {
        index = random.number(0, propSpace - 1);
        if (index < potentialPropertyKeys.length) {
            _key = potentialPropertyKeys.splice(index, 1);
            props[_key] = properties[_key];
            propSpace -= 1;
            keyCount += 1;
        } else if (index < potentialPropertyKeys.length + patternPropertyKeys.length) {
            index -= potentialPropertyKeys.length;
            _key = patternPropertyKeys[index];
            var final = randexp(_key);
            if (!props[final]) {
                props[final] = patternProperties[_key];
                keyCount += 1;
            }
        } else if (allowsAdditional) {
            _key = words(1) + randexp('[a-f\\d]{4,7}');
            props[_key] = additionalProperties;
            keyCount += 1;
        }
        tries += 1;
    }

    if (keyCount < min) {
        throw new ParseError(
            'properties constraints were too strong to successfully generate a valid object for:\n' +
            JSON.stringify(value, null, '  '),
            path
        );
    }

  return traverseCallback(props, path.concat(['properties']), resolve);
};

export = objectType;
