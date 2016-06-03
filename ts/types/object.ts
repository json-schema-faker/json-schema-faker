import container = require('../class/Container');
import random = require('../core/random');
import words = require('../generators/words');
import utils = require('../core/utils');
import ParseError = require('../core/error');

var randexp = container.get('randexp');

// TODO provide types
var objectType: FTypeGenerator = function objectType(value: IObjectSchema, path, resolve, traverseCallback: Function): Object {
  var props = {};

  if (value.additionalProperties === false && !(value.properties || value.patternProperties)) {
    if (utils.hasProperties(value, 'minProperties', 'maxProperties', 'dependencies', 'required')) {
      throw new ParseError('missing properties for ' + JSON.stringify(value), path);
    }

    return props;
  }

  var reqProps: string[] = value.required || [],
      allProps: string[] = value.properties ? Object.keys(value.properties) : [],
      sample = typeof value.additionalProperties === 'object' ? value.additionalProperties : {};

  reqProps.forEach(function(key) {
    if (value.properties && value.properties[key]) {
      props[key] = value.properties[key];
    } else {
        var schema = {};
        Object.keys(value.patternProperties || {}).forEach(function(pattern) {
          if (key.match(pattern)) {
              for (var key in value.patternProperties[pattern]) {
                  if (value.patternProperties[pattern].hasOwnProperty(key)) {
                      schema[key] = value.patternProperties[pattern][key];
                  }
              }
          }
      });

        if (Object.keys(schema).length === 0) {
          schema = sample;
        }
        props[key] = schema;
    }
  });

  var optProps = allProps.filter(function(prop) {
    return reqProps.indexOf(prop) === -1;
  });

  if (value.patternProperties) {
    optProps = Array.prototype.concat.apply(optProps, Object.keys(value.patternProperties));
  }

  var length: number = random.number(value.minProperties, value.maxProperties, 0, optProps.length);

  random.shuffle(optProps).slice(0, length).forEach(function(key) {
    if (value.properties && value.properties[key]) {
      props[key] = value.properties[key];
    } else {
      props[randexp(key)] = value.patternProperties[key];
    }
  });

  var current = Object.keys(props).length;

  if (current < length) {
    words(length - current).forEach(function(key) {
      props[key + randexp('[a-f\\d]{4,7}')] = sample;
    });
  }

  return traverseCallback(props, path.concat(['properties']), resolve);
};

export = objectType;
