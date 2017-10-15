import Registry from '../class/Registry';

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
      return registry.get(nameOrFormatMap);
    }
  } else {
    registry.registerMany(nameOrFormatMap);
  }
}

export default formatAPI;
