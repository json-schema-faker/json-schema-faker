import Registry from './Registry';

type Option = boolean|number|Function;

/**
 * This class defines a registry for custom formats used within JSF.
 */
class OptionRegistry extends Registry<Option> {

  constructor() {
    super();
    this.data['failOnInvalidTypes'] = true;
    this.data['defaultInvalidTypeProduct'] = null;
    this.data['useDefaultValue'] = false;
    this.data['requiredOnly'] = false;
    this.data['maxItems'] = null;
    this.data['maxLength'] = null;
    this.data['defaultMinItems'] = 0;
    this.data['defaultRandExpMax'] = 10;
    this.data['alwaysFakeOptionals'] = false;
    this.data['random'] = Math.random;
  }
}

export default OptionRegistry;
