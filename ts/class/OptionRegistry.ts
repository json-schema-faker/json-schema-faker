import Registry from './Registry';

type Option = boolean|number|Function;

/**
 * This class defines a registry for custom settings used within JSF.
 */
class OptionRegistry extends Registry<Option> {

  constructor() {
    super();
    this.data['defaultInvalidTypeProduct'] = null;
    this.data['defaultRandExpMax'] = 10;

    this.data['ignoreProperties'] = [];
    this.data['ignoreMissingRefs'] = false;
    this.data['failOnInvalidTypes'] = true;
    this.data['failOnInvalidFormat'] = true;

    this.data['alwaysFakeOptionals'] = false;
    this.data['useDefaultValue'] = false;
    this.data['requiredOnly'] = false;

    this.data['minItems'] = 0;
    this.data['maxItems'] = null;
    this.data['maxLength'] = null;

    this.data['reuseProperties'] = false;
    this.data['fillProperties'] = true;

    this.data['random'] = Math.random;
  }
}

export default OptionRegistry;
