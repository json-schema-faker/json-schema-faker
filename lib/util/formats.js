'use strict';

var registry = {};

module.exports = function(name, callback) {
  if (callback) {
    registry[name] = callback;
  } else if (typeof name === 'object') {
    for (var method in name) {
      registry[method] = name[method];
    }
  } else {
    return registry[name];
  }

  return registry;
};
