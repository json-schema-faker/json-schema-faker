import util from '../core/utils';

// dynamic proxy for custom generators
function proxy(gen) {
  return (value, schema, property, rootSchema) => {
    let fn = value;
    let args = [];

    // support for nested object, first-key is the generator
    if (typeof value === 'object') {
      fn = Object.keys(value)[0];

      // treat the given array as arguments,
      if (Array.isArray(value[fn])) {
        // if the generator is expecting arrays they should be nested, e.g. `[[1, 2, 3], true, ...]`
        args = value[fn];
      } else {
        args.push(value[fn]);
      }
    }

    // support for keypaths, e.g. "internet.email"
    const props = fn.split('.');

    // retrieve a fresh dependency
    let ctx = gen();

    while (props.length > 1) {
      ctx = ctx[props.shift()];
    }

    // retrieve last value from context object
    value = typeof ctx === 'object' ? ctx[props[0]] : ctx;

    // invoke dynamic generators
    if (typeof value === 'function') {
      value = value.apply(ctx, args.map(x => util.template(x, rootSchema)));
    }

    // test for pending callbacks
    if (Object.prototype.toString.call(value) === '[object Object]') {
      Object.keys(value).forEach(key => {
        if (typeof value[key] === 'function') {
          throw new Error(`Cannot resolve value for '${property}: ${fn}', given: ${value}`);
        }
      });
    }

    return value;
  };
}

/**
 * Container is used to wrap external generators (faker, chance, casual, etc.) and its dependencies.
 *
 * - `jsf.extend('faker')` will enhance or define the given dependency.
 * - `jsf.define('faker')` will provide the "faker" keyword support.
 *
 * RandExp is not longer considered an "extension".
 */
class Container {
  constructor() {
    // dynamic requires - handle all dependencies
    // they will NOT be included on the bundle
    this.registry = {};
    this.support = {};
  }

  /**
   * Unregister extensions
   * @param name
   */
  reset(name) {
    if (!name) {
      this.registry = {};
      this.support = {};
    } else {
      delete this.registry[name];
      delete this.support[name];
    }
  }

  /**
   * Override dependency given by name
   * @param name
   * @param callback
   */
  extend(name, callback) {
    this.registry[name] = callback(this.registry[name]);

    // built-in proxy (can be overridden)
    if (!this.support[name]) {
      this.support[name] = proxy(() => this.registry[name]);
    }
  }

  /**
   * Set keyword support by name
   * @param name
   * @param callback
   */
  define(name, callback) {
    this.support[name] = callback;
  }

  /**
   * Returns dependency given by name
   * @param name
   * @returns {Dependency}
   */
  get(name) {
    if (typeof this.registry[name] === 'undefined') {
      throw new ReferenceError(`'${name}' dependency doesn't exist.`);
    }
    return this.registry[name];
  }

  /**
   * Apply a custom keyword
   * @param schema
   */
  wrap(schema) {
    const keys = Object.keys(schema);
    const context = {};

    let length = keys.length;

    while (length--) { // eslint-disable-line
      const fn = keys[length].replace(/^x-/, '');
      const gen = this.support[fn];

      if (typeof gen === 'function') {
        Object.defineProperty(schema, 'generate', {
          configurable: false,
          enumerable: false,
          writable: false,
          value: rootSchema => gen.call(context, schema[keys[length]], schema, keys[length], rootSchema), // eslint-disable-line
        });
        break;
      }
    }

    return schema;
  }
}

export default Container;
