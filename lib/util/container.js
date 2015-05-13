'use strict';

// static requires - handle both initial dependency load (deps will be available
// among other modules) as well as they will be included by browserify AST
var container = {
    faker: require('faker'),
    chance: require('chance'),
    randexp: require('randexp')
};

module.exports = {
    set: function(name, value) {
        container[name] = value;
    },
    get: function(name) {
        if (typeof container[name] === 'undefined') {
            throw new ReferenceError('"' + name + '" dependency doesn\'t exist.');
        }
        return container[name];
    }
};
