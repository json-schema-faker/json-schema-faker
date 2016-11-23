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
    var requiredProperties = value.required || [];
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

    var min = Math.max(value.minProperties || 0, requiredProperties.length);
    var max = Math.max(value.maxProperties || random.number(min, min + 5));

    patternPropertyKeys.concat(propertyKeys).forEach(function(_key) {
      if (requiredProperties.indexOf(_key) === -1) {
        requiredProperties.push(_key);
      }
    });

    // properties are read from right-to-left
    var _props = requiredProperties.slice(0, random.number(min, max));

    _props.forEach(function(key) {
      // first ones are the required properies
      if (properties[key]) {
        props[key] = properties[key];
      } else {
        var found;

        // then try patternProperties
        patternPropertyKeys.forEach(function (_key) {
          if (key.match(new RegExp(_key))) {
            found = true;
            props[key] = patternProperties[_key];
          }
        });

        if (!found) {
          if (patternProperties[key]) {
              props[randexp(key)] = patternProperties[key];
          }
          else if (additionalProperties) {
              // otherwise we can use additionalProperties?
              props[words(1) + randexp('[a-f\\d]{4,7}')] = additionalProperties;
          }
        }
      }
    });

  return traverseCallback(props, path.concat(['properties']), resolve);
};

export = objectType;
