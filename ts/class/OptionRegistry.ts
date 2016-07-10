import Registry = require('./Registry');

type Option = boolean;

/**
 * This class defines a registry for custom formats used within JSF.
 */
class OptionRegistry extends Registry<Option> {

  constructor() {
    super();
    this.data['failOnInvalidTypes'] = true;
    this.data['defaultInvalidTypeProduct'] = null;
    this.data['useDefaultValue'] = false;
  }
}

export = OptionRegistry;
