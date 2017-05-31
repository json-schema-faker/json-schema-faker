import thunk from '../generators/thunk';
import ipv4 from '../generators/ipv4';
import dateTime from '../generators/dateTime';
import coreFormat from '../generators/coreFormat';
import optionAPI from '../api/option';
import format from '../api/format';
import utils from '../core/utils';

function generateFormat(value: IStringSchema, invalid: () => string): string {
  var callback: Function = format(value.format);

  if (typeof callback === 'function') {
    return callback(value);
  }

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
      if (typeof callback === 'undefined') {
        if (optionAPI('failOnInvalidFormat')) {
          throw new Error('unknown registry key ' + utils.short(value.format));
        } else {
          return invalid();
        }
      }

      throw new Error('unsupported format "' + value.format + '"');
  }
}

var stringType: FTypeGenerator = function stringType(value: IStringSchema): string {
  var output: string;

  var minLength = value.minLength;
  var maxLength = value.maxLength;

  if (optionAPI('maxLength')) {
    // Don't allow user to set max length above our maximum
    if (maxLength && maxLength > optionAPI('maxLength')) {
      maxLength = optionAPI('maxLength');
    }

    // Don't allow user to set min length above our maximum
    if (minLength && minLength > optionAPI('maxLength')) {
      minLength = optionAPI('maxLength');
    }
  }

  if (value.format) {
    output = generateFormat(value, () => thunk(minLength, maxLength) );
  } else if (value.pattern) {
    output = utils.randexp(value.pattern);
  } else {
    output = thunk(minLength, maxLength);
  }

  while (output.length < minLength) {
    output += Math.random() > 0.7 ? thunk() : utils.randexp('.+');
  }

  if (output.length > maxLength) {
    output = output.substr(0, maxLength);
  }

  return output;
};

export default stringType;
