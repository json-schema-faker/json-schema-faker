// static requires - handle both initial dependency load (deps will be available
// among other modules) as well as they will be included by browserify AST
var Chance = require('chance');

var container = {
  faker: require('faker'),
  chance: new Chance(),
  randexp: require('randexp')
};

module.exports = {
  set: function(name, callback) {
    if (typeof container[name] === 'undefined') {
      throw new ReferenceError('"' + name + '" dependency doesn\'t exist.');
    }

    container[name] = callback(container[name]);
  },
  get: function(name) {
    return container[name];
  }
};
