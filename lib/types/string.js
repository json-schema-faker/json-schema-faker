"use strict";
var thunk = require('../generators/thunk');
var ipv4 = require('../generators/ipv4');
var dateTime = require('../generators/dateTime');
var coreFormat = require('../generators/coreFormat');
var format = require('../api/format');
var container = require('../class/Container');
var randexp = container.get('randexp');
function generateFormat(value) {
    switch (value.format) {
        case 'date-time':
            return dateTime();
        case 'ipv4':
            return ipv4();
        case 'regex':
            // TODO: discuss
            return '.+?';
        case 'email':
        case 'hostname':
        case 'ipv6':
        case 'uri':
            return coreFormat(value.format);
        default:
            var callback = format(value.format);
            return callback(container.getAll(), value);
    }
}
var stringType = function stringType(value) {
    if (value.format) {
        return generateFormat(value);
    }
    else if (value.pattern) {
        return randexp(value.pattern);
    }
    else {
        return thunk(value.minLength, value.maxLength);
    }
};
module.exports = stringType;
