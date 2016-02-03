// static requires - handle both initial dependency load (deps will be available
// among other modules) as well as they will be included by browserify AST
var container = {
  faker: null,
  chance: null,

  // randexp is required for "pattern" values
  randexp: require('randexp')
};

module.exports = {
  set: function(name, callback) {
    if (typeof container[name] === 'undefined') {
      throw new ReferenceError('"' + name + '" dependency is not allowed.');
    }

    container[name] = callback(container[name]);
  },
  get: function(name) {
    if (typeof container[name] === 'undefined') {
      throw new ReferenceError('"' + name + '" dependency doesn\'t exist.');
    }

    return container[name];
  }
};
