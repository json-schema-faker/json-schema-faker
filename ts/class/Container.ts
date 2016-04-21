import randexp = require('randexp');

type Dependency = any;

/**
 * string => extension map object
 */
type Registry = {
  [s: string]: Dependency;
}

/**
 * Container is used to wrap external libraries (faker, chance, randexp) that are used among the whole codebase. These
 * libraries might be configured, customized, etc. and each internal JSF module needs to access those instances instead
 * of pure npm module instances. This class supports consistent access to these instances.
 */
class Container {
  private registry: Registry;

  constructor() {
    // static requires - handle both initial dependency load (deps will be available
    // among other modules) as well as they will be included by browserify AST
    this.registry = {
      faker: null,
      chance: null,
      // randexp is required for "pattern" values
      randexp: randexp
    };
  }

  /**
   * Override dependency given by name
   * @param name
   * @param callback
   */
  public extend(name: string, callback: Function): void {
    if (typeof this.registry[name] === 'undefined') {
      throw new ReferenceError('"' + name + '" dependency is not allowed.');
    }
    this.registry[name] = callback(this.registry[name]);
  }

  /**
   * Returns dependency given by name
   * @param name
   * @returns {Dependency}
   */
  public get(name: string): Dependency {
    if (typeof this.registry[name] === 'undefined') {
      throw new ReferenceError('"' + name + '" dependency doesn\'t exist.');
    } else if (name === 'randexp') {
      return this.registry['randexp'].randexp;
    }
    return this.registry[name];
  }

  /**
   * Returns all dependencies
   *
   * @returns {Registry}
   */
  public getAll(): Registry {
    return {
      faker: this.get('faker'),
      chance: this.get('chance'),
      randexp: this.get('randexp')
    };
  }
}

// TODO move instantiation somewhere else (out from class file)

// instantiate
var container = new Container();

export = container;
