import Registry from './Registry';

type Option = boolean|number|Function;

/**
 * This class defines a registry for custom settings used within JSF.
 */
class OptionRegistry extends Registry<Option> {
  constructor() {
    super();
    this.data = this.defaults;
  }

  get defaults() {
    const data = {};

    data['defaultInvalidTypeProduct'] = null;
    data['defaultRandExpMax'] = 10;

    data['ignoreProperties'] = [];
    data['ignoreMissingRefs'] = false;
    data['failOnInvalidTypes'] = true;
    data['failOnInvalidFormat'] = true;

    data['alwaysFakeOptionals'] = false;
    data['optionalsProbability'] = 0.0;
    data['useDefaultValue'] = false;
    data['useExampleValue'] = false;
    data['requiredOnly'] = false;

    data['minItems'] = 0;
    data['maxItems'] = null;
    data['maxLength'] = null;

    data['resolveJsonPath'] = false;
    data['reuseProperties'] = false;
    data['fillProperties'] = true;

    data['random'] = Math.random;

    return data;
  }
}

export default OptionRegistry;
