// static requires - handle both initial dependency load (deps will be available
// among other modules) as well as they will be included by browserify AST
var container = {};

var Chance = require('chance');

container.faker = require('faker');
container.chance = new Chance();
container.randexp = require('randexp');

function hasContainer(name) {
  if (typeof container[name] === 'undefined') {
    throw new ReferenceError('"' + name + '" dependency doesn\'t exist.');
  }
}

module.exports = {
  set: function(name, callback) {
    hasContainer(name);
    container[name] = callback(container[name]);
  },
  get: function(name) {
    hasContainer(name);
    return container[name];
  }
};
