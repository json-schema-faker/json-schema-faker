"use strict";
var container = require('../class/Container');
var random = require('../core/random');
var words = require('../generators/words');
var utils = require('../core/utils');
var ParseError = require('../core/error');
var randexp = container.get('randexp');
// TODO provide types
var objectType = function objectType(value, path, resolve, traverseCallback) {
    var props = {};
    if (!(value.properties || value.patternProperties || value.additionalProperties)) {
        if (utils.hasProperties(value, 'minProperties', 'maxProperties', 'dependencies', 'required')) {
            throw new ParseError('missing properties for ' + JSON.stringify(value), path);
        }
        return props;
    }
    var reqProps = value.required || [], allProps = value.properties ? Object.keys(value.properties) : [];
    reqProps.forEach(function (key) {
        if (value.properties && value.properties[key]) {
            props[key] = value.properties[key];
        }
    });
    var optProps = allProps.filter(function (prop) {
        return reqProps.indexOf(prop) === -1;
    });
    if (value.patternProperties) {
        optProps = Array.prototype.concat.apply(optProps, Object.keys(value.patternProperties));
    }
    var length = random.number(value.minProperties, value.maxProperties, 0, optProps.length);
    random.shuffle(optProps).slice(0, length).forEach(function (key) {
        if (value.properties && value.properties[key]) {
            props[key] = value.properties[key];
        }
        else {
            props[randexp(key)] = value.patternProperties[key];
        }
    });
    var current = Object.keys(props).length, sample = typeof value.additionalProperties === 'object' ? value.additionalProperties : {};
    if (current < length) {
        words(length - current).forEach(function (key) {
            props[key + randexp('[a-f\\d]{4,7}')] = sample;
        });
    }
    return traverseCallback(props, path.concat(['properties']), resolve);
};
module.exports = objectType;
