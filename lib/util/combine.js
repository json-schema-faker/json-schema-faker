'use strict';

function combine(target) {
  var props = Array.prototype.slice.call(arguments, 1);

  props.forEach(function(obj) {
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        target[key] = obj[key];
      }
    }
  });
}

module.exports = combine;
