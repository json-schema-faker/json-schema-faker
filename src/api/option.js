import OptionRegistry from '../class/OptionRegistry';

// instantiate
const registry = new OptionRegistry();

/**
 * Custom option API
 *
 * @param nameOrOptionMap
 * @returns {any}
 */
function optionAPI(nameOrOptionMap, optionalValue) {
  if (typeof nameOrOptionMap === 'string') {
    if (typeof optionalValue !== 'undefined') {
      return registry.register(nameOrOptionMap, optionalValue);
    }

    return registry.get(nameOrOptionMap);
  }

  return registry.registerMany(nameOrOptionMap);
}

optionAPI.getDefaults = () => registry.defaults;

export default optionAPI;
