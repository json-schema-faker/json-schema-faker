import random = require('../core/random');
import utils = require('../core/utils');
import ParseError = require('../core/error');

// TODO provide types
function unique(path, items, value, sample, resolve, traverseCallback: Function) {
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
  var limit: number = 100;

  while (tmp.length !== items.length) {
    walk(traverseCallback(value.items || sample, path, resolve));

    if (!limit--) {
      break;
    }
  }

  return tmp;
}

type Result = any;

// TODO provide types
var arrayType: FTypeGenerator = function arrayType(value: IArraySchema, path: SchemaPath, resolve: Function, traverseCallback: Function): Result[] {
  var items: Result[] = [];

  if (!(value.items || value.additionalItems)) {
    if (utils.hasProperties(value, 'minItems', 'maxItems', 'uniqueItems')) {
      throw new ParseError('missing items for ' + JSON.stringify(value), path);
    }

    return items;
  }

  if (Array.isArray(value.items)) {
    return Array.prototype.concat.apply(items, value.items.map(function(item, key) {
      return traverseCallback(item, path.concat(['items', key]), resolve);
    }));
  }

  var length: number = random.number(value.minItems, value.maxItems, 1, 5),
      // TODO below looks bad. Should additionalItems be copied as-is?
      sample: Object = typeof value.additionalItems === 'object' ? value.additionalItems : {};

  for (var current = items.length; current < length; current++) {
    items.push(traverseCallback(value.items || sample, path.concat(['items', current]), resolve));
  }

  if (value.uniqueItems) {
    return unique(path.concat(['items']), items, value, sample, resolve, traverseCallback);
  }

  return items;
};

export = arrayType;
