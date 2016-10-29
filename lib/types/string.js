"use strict";
var thunk = require('../generators/thunk');
var ipv4 = require('../generators/ipv4');
var dateTime = require('../generators/dateTime');
var coreFormat = require('../generators/coreFormat');
var format = require('../api/format');
var option = require('../api/option');
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
        var minLength = value.minLength;
        var maxLength = value.maxLength;
        if (option('maxLength')) {
            // Don't allow user to set max length above our maximum
            if (maxLength && maxLength > option('maxLength')) {
                maxLength = option('maxLength');
            }
            // Don't allow user to set min length above our maximum
            if (minLength && minLength > option('maxLength')) {
                minLength = option('maxLength');
            }
        }
        return thunk(minLength, maxLength);
    }
};
module.exports = stringType;
