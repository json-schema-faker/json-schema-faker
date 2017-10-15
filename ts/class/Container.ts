import RandExp from 'randexp';
import option from '../api/option';

// set maximum default, see #193
RandExp.prototype.max = 10;

// same implementation as the original except using our random
RandExp.prototype.randInt = (a, b) =>
  a + Math.floor(option('random')() * (1 + b - a));

type Dependency = any;

/**
 * string => extension map object
 */
type Registry = {
  [s: string]: Dependency;
};

/**
 * Container is used to wrap external libraries (faker, chance, casual, randexp) that are used among the whole codebase. These
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
      casual: null,
      // randexp is required for "pattern" values
      randexp: RandExp
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
      var RandExp_ = this.registry['randexp'];

      // wrapped generator
      return function (pattern): string {
        var re = new RandExp_(pattern);

        // apply given setting
        re.max = option('defaultRandExpMax');

        return re.gen();
      };
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
      randexp: this.get('randexp'),
      casual: this.get('casual')
    };
  }
}

// TODO move instantiation somewhere else (out from class file)

// instantiate
var container = new Container();

export default container;
