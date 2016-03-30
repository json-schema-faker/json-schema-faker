import random = require('../core/random');
import traverse = require('../core/traverse');
import utils = require('../core/utils');
import ParseError = require('../core/error');

function unique(path, items, value, sample, resolve) {
  var tmp = [],
      seen = [];

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
    walk(traverse(value.items || sample, path, resolve));

    if (!limit--) {
      break;
    }
  }

  return tmp;
}

function arrayType(value, path, resolve) {
  var items = [];

  if (!(value.items || value.additionalItems)) {
    if (utils.hasProperties(value, 'minItems', 'maxItems', 'uniqueItems')) {
      throw new ParseError('missing items for ' + JSON.stringify(value), path);
    }

    return items;
  }

  if (Array.isArray(value.items)) {
    return Array.prototype.concat.apply(items, value.items.map(function(item, key) {
      return traverse(item, path.concat(['items', key]), resolve);
    }));
  }

  var length = random.number(value.minItems, value.maxItems, 1, 5),
      sample = typeof value.additionalItems === 'object' ? value.additionalItems : {};

  for (var current = items.length; current < length; current += 1) {
    items.push(traverse(value.items || sample, path.concat(['items', current]), resolve));
  }

  if (value.uniqueItems) {
    return unique(path.concat(['items']), items, value, sample, resolve);
  }

  return items;
}

export = arrayType;