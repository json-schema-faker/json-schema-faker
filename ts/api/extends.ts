import container = require('../class/Container');

function extendsAPI(name: string, callback: Function): any {
  container.extend(name, callback);
}

export = extendsAPI;
