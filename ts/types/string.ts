import thunk = require('../generators/thunk');
import ipv4 = require('../generators/ipv4');
import dateTime = require('../generators/dateTime');
import coreFormat = require('../generators/coreFormat');
import format = require('../api/format');

import container = require('../class/Container');
var randexp = container.get('randexp');

function generateFormat(value: IStringSchema): string {
  switch (value.format) {
    case 'date-time':
      return dateTime();
    case 'ipv4':
      return ipv4();
    case 'regex':
      // TODO: discuss
      return '.+?';
    case 'email':
    case 'hostname':
    case 'ipv6':
    case 'uri':
      return coreFormat(value.format);
    default:
      var callback: Function = format(value.format);
      return callback(container.getAll(), value);
  }
}

var stringType: FTypeGenerator = function stringType(value: IStringSchema): string {
  if (value.format) {
    return generateFormat(value);
  } else if (value.pattern) {
    return randexp(value.pattern);
  } else {
    return thunk(value.minLength, value.maxLength);
  }
};

export = stringType;
