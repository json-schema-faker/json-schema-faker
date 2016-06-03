"use strict";
var _boolean = require('./boolean');
var _null = require('./null');
var _array = require('./array');
var _integer = require('./integer');
var _number = require('./number');
var _object = require('./object');
var _string = require('./string');
var _external = require('./external');
var typeMap = {
    boolean: _boolean,
    null: _null,
    array: _array,
    integer: _integer,
    number: _number,
    object: _object,
    string: _string,
    external: _external
};
module.exports = typeMap;
