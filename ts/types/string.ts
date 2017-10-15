import thunk from '../generators/thunk';
import ipv4 from '../generators/ipv4';
import dateTime from '../generators/dateTime';
import coreFormat from '../generators/coreFormat';
import format from '../api/format';
import option from '../api/option';

import container from '../class/Container';
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
  var output: string;

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

  if (value.format) {
    output = generateFormat(value);
  } else if (value.pattern) {
    output = randexp(value.pattern);
  } else {
    output = thunk(minLength, maxLength);
  }

  while (output.length < minLength) {
    output += option('random')() > 0.7 ? thunk() : randexp('.+');
  }

  if (output.length > maxLength) {
    output = output.substr(0, maxLength);
  }

  return output;
};

export default stringType;
