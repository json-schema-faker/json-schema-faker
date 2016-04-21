<<<<<<< HEAD
"use strict";
var random = require('../core/random');
var traverse = require('../core/traverse');
var utils = require('../core/utils');
var ParseError = require('../core/error');
function unique(path, items, value, sample, resolve) {
=======
var random = require('../core/random');
var utils = require('../core/utils');
var ParseError = require('../core/error');
// TODO provide types
function unique(path, items, value, sample, resolve, traverseCallback) {
>>>>>>> develop
    var tmp = [], seen = [];
    function walk(obj) {
        var json = JSON.stringify(obj);
        if (seen.indexOf(json) === -1) {
            seen.push(json);
            tmp.push(obj);
        }
    }
    items.forEach(walk);
    // TODO: find a better solution?
    var limit = 100;
    while (tmp.length !== items.length) {
<<<<<<< HEAD
        walk(traverse(value.items || sample, path, resolve));
=======
        walk(traverseCallback(value.items || sample, path, resolve));
>>>>>>> develop
        if (!limit--) {
            break;
        }
    }
    return tmp;
}
<<<<<<< HEAD
function arrayType(value, path, resolve) {
=======
// TODO provide types
function arrayType(value, path, resolve, traverseCallback) {
>>>>>>> develop
    var items = [];
    if (!(value.items || value.additionalItems)) {
        if (utils.hasProperties(value, 'minItems', 'maxItems', 'uniqueItems')) {
            throw new ParseError('missing items for ' + JSON.stringify(value), path);
        }
        return items;
    }
    if (Array.isArray(value.items)) {
        return Array.prototype.concat.apply(items, value.items.map(function (item, key) {
<<<<<<< HEAD
            return traverse(item, path.concat(['items', key]), resolve);
=======
            return traverseCallback(item, path.concat(['items', key]), resolve);
>>>>>>> develop
        }));
    }
    var length = random.number(value.minItems, value.maxItems, 1, 5), sample = typeof value.additionalItems === 'object' ? value.additionalItems : {};
    for (var current = items.length; current < length; current += 1) {
<<<<<<< HEAD
        items.push(traverse(value.items || sample, path.concat(['items', current]), resolve));
    }
    if (value.uniqueItems) {
        return unique(path.concat(['items']), items, value, sample, resolve);
=======
        items.push(traverseCallback(value.items || sample, path.concat(['items', current]), resolve));
    }
    if (value.uniqueItems) {
        return unique(path.concat(['items']), items, value, sample, resolve, traverseCallback);
>>>>>>> develop
    }
    return items;
}
module.exports = arrayType;
