type Dependency = any;

/**
 * string => extension map object
 */
type Registry = {
  [s: string]: Dependency;
};

/**
 * Container is used to wrap external generators (faker, chance, casual, etc.) and its dependencies.
 *
 * - `jsf.extend('faker')` will enhance or define the given dependency.
 * - `jsf.define('faker')` will provide the "faker" keyword support.
 *
 * RandExp is not longer considered an "extension".
 */
class Container {
  private registry: Registry;
  private support: Registry;

  constructor() {
    // dynamic requires - handle all dependencies
    // they will NOT be included on the bundle
    this.registry = {};
    this.support = {};
  }

  /**
   * Override dependency given by name
   * @param name
   * @param callback
   */
  public extend(name: string, callback: Function): void {
    this.registry[name] = callback(this.registry[name]);
  }

  /**
   * Set keyword support by name
   * @param name
   * @param callback
   */
  public define(name: string, callback: Function): void {
    this.support[name] = callback;
  }

  /**
   * Returns dependency given by name
   * @param name
   * @returns {Dependency}
   */
  public get(name: string): Dependency {
    if (typeof this.registry[name] === 'undefined') {
      throw new ReferenceError('"' + name + '" dependency doesn\'t exist.');
    }
    return this.registry[name];
  }

  /**
   * Apply registered keywords
   * @param schema
   */
  public run(schema: JsonSchema): any {
    var props = Object.keys(schema);
    var length = props.length;

    while (length--) {
      var gen = this.support[props[length]];
      var value = schema[props[length]];

      if (typeof gen === 'function') {
        return () => gen(value);
      }
    }

    return schema;
  }
}

export default Container;
