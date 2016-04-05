/// <reference path="../../node_modules/randexp/randexp.d.ts"/>

import randexp = require('randexp');

type Dependency = any;

/**
 * string => extension map object
 */
type Registry = {
  [s: string]: Dependency;
}

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
      randexp: this.get('randexp').randexp
    };
  }
}

// TODO move instantiation somewhere else (out from class file)

// instantiate
var container = new Container();

export = container;
