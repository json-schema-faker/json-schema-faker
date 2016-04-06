import FormatRegistry = require('../class/FormatRegistry');

// instantiate
var registry = new FormatRegistry();

function formatAPI(name: string, callback?: Function): any {
  if (callback) {
    registry.register(name, callback);
  } else if (typeof name === 'object') {
    registry.registerMany(name);
  } else if (name) {
    return registry.get(name);
  } else {
    return registry.list();
  }
}

export = formatAPI;
