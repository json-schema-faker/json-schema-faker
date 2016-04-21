type Format = Function;

/**
 * string => format map object
 */
type Registry = {
  [s: string]: Format;
}

/**
 * This class defines a registry for custom formats used within JSF.
 */
class FormatRegistry {
  private registry: Registry;

  constructor() {
    // empty by default
    this.registry = {};
  }

  /**
   * Registers custom format
   */
  public register(name: string, callback: Format): void {
    this.registry[name] = callback;
  }

  /**
   * Register many formats at one shot
   */
  public registerMany(formats: Object): void {
    for (var name in formats) {
      this.registry[name] = formats[name];
    }
  }

  /**
   * Returns element by registry key
   */
  public get(name: string): Format {
    var format: Format = this.registry[name];
    if (typeof format !== 'function') {
      throw new Error('unknown format generator ' + JSON.stringify(name));
    }
    return format;
  }

  /**
   * Returns the whole registry content
   */
  public list(): Registry {
    return this.registry;
  }

}

export = FormatRegistry;
