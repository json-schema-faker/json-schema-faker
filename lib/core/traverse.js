var random = require('./random');
var ParseError = require('./error');
var inferType = require('./infer');
var types = require('../types/index');
// TODO provide types
function traverse(schema, path, resolve) {
    resolve(schema);
    if (Array.isArray(schema.enum)) {
        return random.pick(schema.enum);
    }
    // TODO remove the ugly overcome
    var type = schema.type;
    if (Array.isArray(type)) {
        type = random.pick(type);
    }
    else if (typeof type === 'undefined') {
        // Attempt to infer the type
        type = inferType(schema, path) || type;
    }
    if (schema.faker || schema.chance) {
        type = 'external';
    }
    if (typeof type === 'string') {
        if (!types[type]) {
            throw new ParseError('unknown primitive ' + JSON.stringify(type), path.concat(['type']));
        }
        try {
            return types[type](schema, path, resolve, traverse);
        }
        catch (e) {
            if (typeof e.path === 'undefined') {
                throw new ParseError(e.message, path);
            }
            throw e;
        }
    }
    var copy = {};
    if (Array.isArray(schema)) {
        copy = [];
    }
    for (var prop in schema) {
        if (typeof schema[prop] === 'object' && prop !== 'definitions') {
            copy[prop] = traverse(schema[prop], path.concat([prop]), resolve);
        }
        else {
            copy[prop] = schema[prop];
        }
    }
    return copy;
}
module.exports = traverse;
