'use strict';

var random = require('../util/random'),
    traverse = require('../util/traverse'),
    hasProps = require('../util/has-props');

function unique(set, value) {
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
    walk(traverse(value.items));

    if (!limit--) {
      break;
    }
  }

  return tmp;
}

module.exports = function(value) {
  var items = [];

  if (!value.items) {
    if (hasProps(value, 'minItems', 'maxItems', 'uniqueItems', 'additionalItems')) {
      throw new Error('Missing items for array "' + JSON.stringify(value) + '"');
    }

    return items;
  }

  if (Array.isArray(value.items)) {
    return value.items.map(traverse);
  }

  var length = Math.abs(random(value.minItems || 1, value.maxItems || 5));

  while (length-- > 0) {
    items.push(traverse(value.items));
  }

  if (value.uniqueItems) {
    return unique(items, value);
  }

  return items;
};
