'use strict';

var random = require('../util/random'),
    traverse = require('../util/traverse'),
    hasProps = require('../util/has-props');

function unique(set, value, sample) {
  var tmp = [],
      seen = [];

  function walk(obj) {
    var json = JSON.stringify(obj);

    if (seen.indexOf(json) === -1) {
      seen.push(json);
      tmp.push(obj);
    }
  }

  set.forEach(walk);

  // TODO: find a better solution?
  var limit = 100;

  while (tmp.length !== set.length) {
    walk(traverse(value.items || sample));

    if (!limit--) {
      break;
    }
  }

  return tmp;
}

module.exports = function(value) {
  var items = [];

  if (!(value.items || value.additionalItems)) {
    if (hasProps(value, 'minItems', 'maxItems', 'uniqueItems')) {
      throw new Error('Missing items for array "' + JSON.stringify(value) + '"');
    }

    return items;
  }

  if (Array.isArray(value.items)) {
    return Array.prototype.concat.apply(items, value.items.map(traverse));
  }

  var length = random(value.minItems, value.maxItems, 1, 5),
      sample = typeof value.additionalItems === 'object' ? value.additionalItems : {};

  for (var current = items.length; current < length; current += 1) {
    items.push(traverse(value.items || sample));
  }

  if (value.uniqueItems) {
    return unique(items, value, sample);
  }

  return items;
};
