import thunk from '../generators/thunk';
import ipv4 from '../generators/ipv4';
import dateTime from '../generators/dateTime';
import coreFormat from '../generators/coreFormat';
import optionAPI from '../api/option';
import format from '../api/format';
import random from '../core/random';
import utils from '../core/utils';

function generateFormat(value: IStringSchema, invalid: () => string): string {
  var callback: Function = format(value.format);

  if (typeof callback === 'function') {
    return callback(value);
  }

  switch (value.format) {
    case 'date-time':
    case 'datetime':
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

  output = utils.typecast(value, opts => {
    if (value.format) {
      return generateFormat(value, () => thunk(opts.minLength, opts.maxLength) );
    }

    if (value.pattern) {
      return random.randexp(value.pattern);
    }

    return thunk(opts.minLength, opts.maxLength);
  });

  return output;
};

export default stringType;
