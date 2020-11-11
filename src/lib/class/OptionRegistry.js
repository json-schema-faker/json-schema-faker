import Registry from './Registry';
import defaults from '../api/defaults';

/**
 * This class defines a registry for custom settings used within JSF.
 */
class OptionRegistry extends Registry {
  constructor() {
    super();
    this.data = { ...defaults };
    this._defaults = defaults;
  }

  get defaults() {
    return { ...this._defaults };
  }
}

export default OptionRegistry;
