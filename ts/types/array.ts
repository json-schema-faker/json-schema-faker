import random from '../core/random';
import utils from '../core/utils';
import ParseError from '../core/error';
import option from '../api/option';

// TODO provide types
function unique(path: SchemaPath, items, value, sample, resolve, traverseCallback: Function) {
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

  // see http://stackoverflow.com/a/38355228/769384
  // after type guards support subproperties (in TS 2.0) we can simplify below to (value.items instanceof Array)
  // so that value.items.map becomes recognized for typescript compiler
  var tmpItems = value.items;
  if (tmpItems instanceof Array) {
    return Array.prototype.concat.apply(items, tmpItems.map(function(item, key) {
      var itemSubpath: SchemaPath = path.concat(['items', key + '']);
      return traverseCallback(item, itemSubpath, resolve);
    }));
  }

  var minItems = value.minItems;
  var maxItems = value.maxItems;

  if (option('defaultMinItems') && minItems === undefined) {
    // fix boundaries
    minItems = !maxItems
      ? option('defaultMinItems')
      : Math.min(option('defaultMinItems'), maxItems);
  }

  if (option('maxItems')) {
    // Don't allow user to set max items above our maximum
    if (maxItems && maxItems > option('maxItems')) {
      maxItems = option('maxItems');
    }

    // Don't allow user to set min items above our maximum
    if (minItems && minItems > option('maxItems')) {
      minItems = maxItems;
    }
  }

  var length: number = random.number(minItems, maxItems, 1, 5),
      // TODO below looks bad. Should additionalItems be copied as-is?
      sample: Object = typeof value.additionalItems === 'object' ? value.additionalItems : {};

  for (var current: number = items.length; current < length; current++) {
    var itemSubpath: SchemaPath = path.concat(['items', current + '']);
    var element = traverseCallback(value.items || sample, itemSubpath, resolve);
    items.push(element);
  }

  if (value.uniqueItems) {
    return unique(path.concat(['items']), items, value, sample, resolve, traverseCallback);
  }

  return items;
};

export default arrayType;
