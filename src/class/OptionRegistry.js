import Registry from './Registry';

const defaults = {};

defaults.defaultInvalidTypeProduct = null;
defaults.defaultRandExpMax = 10;

defaults.ignoreProperties = [];
defaults.ignoreMissingRefs = false;
defaults.failOnInvalidTypes = true;
defaults.failOnInvalidFormat = true;

defaults.alwaysFakeOptionals = false;
defaults.optionalsProbability = false;
defaults.fixedProbabilities = false;
defaults.useExamplesValue = false;
defaults.useDefaultValue = false;
defaults.requiredOnly = false;

defaults.minItems = 0;
defaults.maxItems = null;
defaults.minLength = 0;
defaults.maxLength = null;

defaults.resolveJsonPath = false;
defaults.reuseProperties = false;
defaults.fillProperties = true;

defaults.random = Math.random;

/**
 * This class defines a registry for custom settings used within JSF.
 */
class OptionRegistry extends Registry {
  constructor() {
    super();
    this.data = Object.assign({}, defaults);
    this._defaults = defaults;
  }

  get defaults() {
    return Object.assign({}, this._defaults);
  }
}

export default OptionRegistry;
