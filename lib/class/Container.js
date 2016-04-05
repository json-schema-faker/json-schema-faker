/// <reference path="../../node_modules/randexp/randexp.d.ts"/>
var randexp = require('randexp');
var Container = (function () {
    function Container() {
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
    Container.prototype.extend = function (name, callback) {
        if (typeof this.registry[name] === 'undefined') {
            throw new ReferenceError('"' + name + '" dependency is not allowed.');
        }
        this.registry[name] = callback(this.registry[name]);
    };
    /**
     * Returns dependency given by name
     * @param name
     * @returns {Dependency}
     */
    Container.prototype.get = function (name) {
        if (typeof this.registry[name] === 'undefined') {
            throw new ReferenceError('"' + name + '" dependency doesn\'t exist.');
        }
        return this.registry[name];
    };
    /**
     * Returns all dependencies
     *
     * @returns {Registry}
     */
    Container.prototype.getAll = function () {
        return {
            faker: this.get('faker'),
            chance: this.get('chance'),
            randexp: this.get('randexp').randexp
        };
    };
    return Container;
})();
// TODO move instantiation somewhere else (out from class file)
// instantiate
var container = new Container();
module.exports = container;
