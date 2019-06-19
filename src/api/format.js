import Registry from '../class/Registry';

// instantiate
const registry = new Registry();

/**
 * Custom format API
 *
 * @see https://github.com/json-schema-faker/json-schema-faker#custom-formats
 * @param nameOrFormatMap
 * @param callback
 * @returns {any}
 */
function formatAPI(nameOrFormatMap, callback) {
  if (typeof nameOrFormatMap === 'undefined') {
    return registry.list();
  }

  if (typeof nameOrFormatMap === 'string') {
    if (typeof callback === 'function') {
      registry.register(nameOrFormatMap, callback);
    } else if (callback === null || callback === false) {
      registry.unregister(nameOrFormatMap);
    } else {
      return registry.get(nameOrFormatMap);
    }
  } else {
    registry.registerMany(nameOrFormatMap);
  }
}

export default formatAPI;
