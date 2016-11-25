"use strict";
var utils = require("../core/utils");
var container = require("../class/Container");
var externalType = function externalType(value, path) {
    var libraryName = value.faker ? 'faker' : (value.chance ? 'chance' : 'casual'), libraryModule = container.get(libraryName), key = value.faker || value.chance || value.casual, path = key, args = [];
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
    try {
        // see #116, #117 - faker.js 3.1.0 introduced local dependencies between generators
        // making jsf break after upgrading from 3.0.1
        var contextObject = libraryModule;
        if (libraryName === 'faker') {
            var parts = path.split('.');
            while (parts.length > 1) {
                contextObject = libraryModule[parts.shift()];
            }
            genFunction = contextObject[parts[0]];
        }
    }
    catch (e) {
        throw new Error('cannot resolve ' + libraryName + '-generator for ' + JSON.stringify(key));
    }
    if (typeof genFunction !== 'function') {
        if (libraryName === 'casual') {
            return utils.typecast(genFunction, value.type);
        }
        throw new Error('unknown ' + libraryName + '-generator for ' + JSON.stringify(key));
    }
    var result = genFunction.apply(contextObject, args);
    return utils.typecast(result, value.type);
};
module.exports = externalType;
