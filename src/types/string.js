import thunk from '../generators/thunk';
import ipv4 from '../generators/ipv4';
import dateTime from '../generators/dateTime';
import date from '../generators/date';
import time from '../generators/time';
import coreFormat from '../generators/coreFormat';
import optionAPI from '../api/option';
import format from '../api/format';
import random from '../core/random';
import utils from '../core/utils';

function generateFormat(value, invalid) {
  const callback = format(value.format);

  if (typeof callback === 'function') {
    return callback(value);
  }

  switch (value.format) {
    case 'date-time':
    case 'datetime':
      return dateTime();
    case 'date':
      return date();
    case 'time':
      return time();
    case 'ipv4':
      return ipv4();
    case 'regex':
      // TODO: discuss
      return '.+?';
    case 'email':
    case 'hostname':
    case 'ipv6':
    case 'uri':
    case 'uri-reference':
    case 'iri':
    case 'iri-reference':
    case 'idn-email':
    case 'idn-hostname':
    case 'json-pointer':
    case 'uri-template':
    case 'uuid':
      return coreFormat(value.format);
    default:
      if (typeof callback === 'undefined') {
        if (optionAPI('failOnInvalidFormat')) {
          throw new Error(`unknown registry key ${utils.short(value.format)}`);
        } else {
          return invalid();
        }
      }

      throw new Error(`unsupported format '${value.format}'`);
  }
}

function stringType(value) {
  // here we need to force type to fix #467
  const output = utils.typecast('string', value, opts => {
    if (value.format) {
      return generateFormat(value, () => thunk(opts.minLength, opts.maxLength));
    }

    if (value.pattern) {
      return random.randexp(value.pattern);
    }

    return thunk(opts.minLength, opts.maxLength);
  });

  return output;
}

export default stringType;
