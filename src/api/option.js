import OptionRegistry from '../class/OptionRegistry';

// instantiate
const registry = new OptionRegistry();

/**
 * Custom option API
 *
 * @param nameOrOptionMap
 * @returns {any}
 */
function optionAPI(nameOrOptionMap) {
  if (typeof nameOrOptionMap === 'string') {
    return registry.get(nameOrOptionMap);
  }

  return registry.registerMany(nameOrOptionMap);
}

optionAPI.getDefaults = () => registry.defaults;

export default optionAPI;
