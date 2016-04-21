import container = require('../class/Container');

/**
 * Extending dependencies
 *
 * @see https://github.com/json-schema-faker/json-schema-faker#extending-dependencies
 * @param name
 * @param callback
 */
function extendAPI(name: string, callback: Function): void {
  container.extend(name, callback);
}

export = extendAPI;
