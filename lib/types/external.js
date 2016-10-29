"use strict";
var utils = require('../core/utils');
var container = require('../class/Container');
var externalType = function externalType(value, path) {
    var libraryName = value.faker ? 'faker' : 'chance', libraryModule = value.faker ? container.get('faker') : container.get('chance'), key = value.faker || value.chance, path = key, args = [];
    if (typeof path === 'object') {
        path = Object.keys(path)[0];
        if (Array.isArray(key[path])) {
            args = key[path];
        }
        else {
            args.push(key[path]);
        }
    }
    var genFunction = utils.getSubAttribute(libraryModule, path);
    if (typeof genFunction !== 'function') {
        throw new Error('unknown ' + libraryName + '-generator for ' + JSON.stringify(key));
    }
    // see #116, #117 - faker.js 3.1.0 introduced local dependencies between generators
    // making jsf break after upgrading from 3.0.1
    var contextObject = libraryModule;
    if (libraryName === 'faker') {
        var fakerModuleName = path.split('.')[0];
        contextObject = libraryModule[fakerModuleName];
    }
    var result = genFunction.apply(contextObject, args);
    return utils.typecast(result, value.type);
};
module.exports = externalType;
