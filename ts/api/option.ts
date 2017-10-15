import OptionRegistry from '../class/OptionRegistry';

// instantiate
var registry = new OptionRegistry();

/**
 * Custom option API
 *
 * @param nameOrOptionMap
 * @returns {any}
 */
function optionAPI(nameOrOptionMap?: string|Object): any {
  if (typeof nameOrOptionMap === 'string') {
    return registry.get(nameOrOptionMap);
  } else {
    return registry.registerMany(nameOrOptionMap);
  }
}

export default optionAPI;
