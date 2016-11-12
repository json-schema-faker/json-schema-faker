import thunk = require('../generators/thunk');
import format = require('../api/format');
import option = require('../api/option');

import container = require('../class/Container');
var randexp = container.get('randexp');

var stringType: FTypeGenerator = function stringType(value: IStringSchema): string {
  if (value.format) {
    var callback: Function = format(value.format);
    return callback(container.getAll(), value);
  } else if (value.pattern) {
    return randexp(value.pattern);
  } else {
    var minLength = value.minLength;
    var maxLength = value.maxLength;

    if (option('maxLength')) {
      // Don't allow user to set max length above our maximum
      if (maxLength && maxLength > option('maxLength')) {
        maxLength = option('maxLength');
      }

      // Don't allow user to set min length above our maximum
      if (minLength && minLength > option('maxLength')) {
        minLength = option('maxLength');
      }
    }

    return thunk(minLength, maxLength);
  }
};

export = stringType;
