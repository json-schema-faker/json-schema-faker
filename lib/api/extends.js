"use strict";
var container = require('../class/Container');
function extendsAPI(name, callback) {
    container.extend(name, callback);
}
module.exports = extendsAPI;
