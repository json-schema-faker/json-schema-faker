import container = require('../class/Container');

function extendAPI(name: string, callback: Function): any {
  container.extend(name, callback);
}

export = extendAPI;
