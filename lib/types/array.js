'use strict';

var random = require('../util/random'),
    traverse = require('../util/traverse');

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
  if (!value.items) {
    throw new Error('Missing items for array "' + JSON.stringify(value) + '"');
  }

  var items = [],
      length = random(1, 5);

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
