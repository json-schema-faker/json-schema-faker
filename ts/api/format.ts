import Registry = require('../class/Registry');
import coreFormat = require('../generators/coreFormat');
import dateTime = require('../generators/dateTime');
import ipv4 = require('../generators/ipv4');

type Format = Function;

// instantiate
var registry = new Registry<Format>();

/**
 * Custom format API
 *
 * @see https://github.com/json-schema-faker/json-schema-faker#custom-formats
 * @param nameOrFormatMap
 * @param callback
 * @returns {any}
 */
function formatAPI(nameOrFormatMap?: string|Object, callback?: Format): any {
  if (typeof nameOrFormatMap === 'undefined') {
    return registry.list();
  } else if (typeof nameOrFormatMap === 'string') {
    if (typeof callback === 'function') {
      registry.register(nameOrFormatMap, callback);
    } else {
      switch (nameOrFormatMap) {
        case 'date-time':
          return () => dateTime();
        case 'ipv4':
          return () => ipv4();
        case 'regex':
          // TODO: discuss
          return () => '.+?';
        case 'email':
        case 'hostname':
        case 'ipv6':
        case 'uri':
          return () => coreFormat(nameOrFormatMap);
        default:
          return registry.get(nameOrFormatMap);
      }
    }
  } else {
    registry.registerMany(nameOrFormatMap);
  }
}

export = formatAPI;
