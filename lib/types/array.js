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
  var count = set.length;

  while ((set.length - tmp.length) > 0) {
    walk(traverse(value.items));

    if (--count < 1) {
      break;
    }
  }

  if (!count) {
    throw new Error('Cannot generate uniqueItems(' + set.length + ') using ' + JSON.stringify(value.items));
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

  var length = random(1, 5);

  if (value.minItems || value.maxItems) {
    var min = value.minItems,
        max = value.maxItems;

    length = random(min, max ? max : (min ? min + length : null));
  }

  while (length--) {
    items.push(traverse(value.items));
  }

  if (value.uniqueItems) {
    return unique(items, value);
  }

  return items;
};
