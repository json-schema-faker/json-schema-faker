function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var tslib_1 = require('tslib');
var RandExp = _interopDefault(require('randexp'));
var deref = _interopDefault(require('deref'));
var jsonpath = _interopDefault(require('jsonpath'));
var $RefParser = _interopDefault(require('json-schema-ref-parser'));

function template(value, schema) {
    if (Array.isArray(value)) {
        return value.map(function (x) { return template(x, schema); });
    }
    if (typeof value === 'string') {
        value = value.replace(/#\{([\w.-]+)\}/g, function (_, $1) { return schema[$1]; });
    }
    return value;
}
// dynamic proxy for custom generators
function proxy(gen) {
    return function (value, schema, property, rootSchema) {
        var fn = value;
        var args = [];
        // support for nested object, first-key is the generator
        if (typeof value === 'object') {
            fn = Object.keys(value)[0];
            // treat the given array as arguments,
            if (Array.isArray(value[fn])) {
                // if the generator is expecting arrays they should be nested, e.g. `[[1, 2, 3], true, ...]`
                args = value[fn];
            }
            else {
                args.push(value[fn]);
            }
        }
        // support for keypaths, e.g. "internet.email"
        var props = fn.split('.');
        // retrieve a fresh dependency
        var ctx = gen();
        while (props.length > 1) {
            ctx = ctx[props.shift()];
        }
        // retrieve last value from context object
        value = typeof ctx === 'object' ? ctx[props[0]] : ctx;
        // invoke dynamic generators
        if (typeof value === 'function') {
            value = value.apply(ctx, args.map(function (x) { return template(x, rootSchema); }));
        }
        // test for pending callbacks
        if (Object.prototype.toString.call(value) === '[object Object]') {
            for (var key in value) {
                if (typeof value[key] === 'function') {
                    throw new Error('Cannot resolve value for "' + property + ': ' + fn + '", given: ' + value);
                }
            }
        }
        return value;
    };
}
/**
 * Container is used to wrap external generators (faker, chance, casual, etc.) and its dependencies.
 *
 * - `jsf.extend('faker')` will enhance or define the given dependency.
 * - `jsf.define('faker')` will provide the "faker" keyword support.
 *
 * RandExp is not longer considered an "extension".
 */
var Container = /** @class */ (function () {
    function Container() {
        // dynamic requires - handle all dependencies
        // they will NOT be included on the bundle
        this.registry = {};
        this.support = {};
    }
    /**
     * Override dependency given by name
     * @param name
     * @param callback
     */
    Container.prototype.extend = function (name, callback) {
        var _this = this;
        this.registry[name] = callback(this.registry[name]);
        // built-in proxy (can be overridden)
        if (!this.support[name]) {
            this.support[name] = proxy(function () { return _this.registry[name]; });
        }
    };
    /**
     * Set keyword support by name
     * @param name
     * @param callback
     */
    Container.prototype.define = function (name, callback) {
        this.support[name] = callback;
    };
    /**
     * Returns dependency given by name
     * @param name
     * @returns {Dependency}
     */
    Container.prototype.get = function (name) {
        if (typeof this.registry[name] === 'undefined') {
            throw new ReferenceError('"' + name + '" dependency doesn\'t exist.');
        }
        return this.registry[name];
    };
    /**
     * Apply a custom keyword
     * @param schema
     */
    Container.prototype.wrap = function (schema) {
        var keys = Object.keys(schema);
        var length = keys.length;
        var context = {};
        while (length--) {
            var fn = keys[length].replace(/^x-/, '');
            var gen = this.support[fn];
            if (typeof gen === 'function') {
                Object.defineProperty(schema, 'generate', {
                    configurable: false,
                    enumerable: false,
                    writable: false,
                    value: function (rootSchema) { return gen.call(context, schema[keys[length]], schema, keys[length], rootSchema); },
                });
                break;
            }
        }
        return schema;
    };
    return Container;
}());

/**
 * This class defines a registry for custom formats used within JSF.
 */
var Registry = /** @class */ (function () {
    function Registry() {
        // empty by default
        this.data = {};
    }
    /**
     * Registers custom format
     */
    Registry.prototype.register = function (name, callback) {
        this.data[name] = callback;
    };
    /**
     * Register many formats at one shot
     */
    Registry.prototype.registerMany = function (formats) {
        for (var name in formats) {
            this.data[name] = formats[name];
        }
    };
    /**
     * Returns element by registry key
     */
    Registry.prototype.get = function (name) {
        var format = this.data[name];
        return format;
    };
    /**
     * Returns the whole registry content
     */
    Registry.prototype.list = function () {
        return this.data;
    };
    return Registry;
}());

// instantiate
var registry = new Registry();
/**
 * Custom format API
 *
 * @see https://github.com/json-schema-faker/json-schema-faker#custom-formats
 * @param nameOrFormatMap
 * @param callback
 * @returns {any}
 */
function formatAPI(nameOrFormatMap, callback) {
    if (typeof nameOrFormatMap === 'undefined') {
        return registry.list();
    }
    else if (typeof nameOrFormatMap === 'string') {
        if (typeof callback === 'function') {
            registry.register(nameOrFormatMap, callback);
        }
        else {
            return registry.get(nameOrFormatMap);
        }
    }
    else {
        registry.registerMany(nameOrFormatMap);
    }
}

/**
 * This class defines a registry for custom settings used within JSF.
 */
var OptionRegistry = /** @class */ (function (_super) {
    tslib_1.__extends(OptionRegistry, _super);
    function OptionRegistry() {
        var _this = _super.call(this) || this;
        _this.data['defaultInvalidTypeProduct'] = null;
        _this.data['defaultRandExpMax'] = 10;
        _this.data['ignoreMissingRefs'] = false;
        _this.data['failOnInvalidTypes'] = true;
        _this.data['failOnInvalidFormat'] = true;
        _this.data['alwaysFakeOptionals'] = false;
        _this.data['useDefaultValue'] = false;
        _this.data['requiredOnly'] = false;
        _this.data['minItems'] = 0;
        _this.data['maxItems'] = null;
        _this.data['maxLength'] = null;
        _this.data['reuseProperties'] = false;
        _this.data['fillProperties'] = true;
        _this.data['random'] = Math.random;
        return _this;
    }
    return OptionRegistry;
}(Registry));

// instantiate
var registry$1 = new OptionRegistry();
/**
 * Custom option API
 *
 * @param nameOrOptionMap
 * @returns {any}
 */
function optionAPI(nameOrOptionMap) {
    if (typeof nameOrOptionMap === 'string') {
        return registry$1.get(nameOrOptionMap);
    }
    else {
        return registry$1.registerMany(nameOrOptionMap);
    }
}

var ALL_TYPES = ['array', 'object', 'integer', 'number', 'string', 'boolean', 'null'];
var MOST_NEAR_DATETIME = 2524608000000;
var MIN_INTEGER = -100000000;
var MAX_INTEGER = 100000000;
var MIN_NUMBER = -100;
var MAX_NUMBER = 100;
var env = {
    ALL_TYPES: ALL_TYPES,
    MIN_NUMBER: MIN_NUMBER,
    MAX_NUMBER: MAX_NUMBER,
    MIN_INTEGER: MIN_INTEGER,
    MAX_INTEGER: MAX_INTEGER,
    MOST_NEAR_DATETIME: MOST_NEAR_DATETIME,
};

/// <reference path="../index.d.ts" />
function _randexp(value) {
    // set maximum default, see #193
    RandExp.prototype.max = optionAPI('defaultRandExpMax');
    // same implementation as the original except using our random
    RandExp.prototype.randInt = function (a, b) {
        return a + Math.floor(optionAPI('random')() * (1 + b - a));
    };
    var re = new RandExp(value);
    return re.gen();
}
/**
 * Returns random element of a collection
 *
 * @param collection
 * @returns {T}
 */
function pick(collection) {
    return collection[Math.floor(optionAPI('random')() * collection.length)];
}
/**
 * Returns shuffled collection of elements
 *
 * @param collection
 * @returns {T[]}
 */
function shuffle(collection) {
    var tmp, key, copy = collection.slice(), length = collection.length;
    for (; length > 0;) {
        key = Math.floor(optionAPI('random')() * length);
        // swap
        tmp = copy[--length];
        copy[length] = copy[key];
        copy[key] = tmp;
    }
    return copy;
}
/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 * @see http://stackoverflow.com/a/1527820/769384
 */
function getRandom(min, max) {
    return optionAPI('random')() * (max - min) + min;
}
/**
 * Generates random number according to parameters passed
 *
 * @param min
 * @param max
 * @param defMin
 * @param defMax
 * @param hasPrecision
 * @returns {number}
 */
function number(min, max, defMin, defMax, hasPrecision) {
    if (hasPrecision === void 0) { hasPrecision = false; }
    defMin = typeof defMin === 'undefined' ? env.MIN_NUMBER : defMin;
    defMax = typeof defMax === 'undefined' ? env.MAX_NUMBER : defMax;
    min = typeof min === 'undefined' ? defMin : min;
    max = typeof max === 'undefined' ? defMax : max;
    if (max < min) {
        max += min;
    }
    var result = getRandom(min, max);
    if (!hasPrecision) {
        return Math.round(result);
    }
    return result;
}
function by(type) {
    switch (type) {
        case 'seconds':
            return number(0, 60) * 60;
        case 'minutes':
            return number(15, 50) * 612;
        case 'hours':
            return number(12, 72) * 36123;
        case 'days':
            return number(7, 30) * 86412345;
        case 'weeks':
            return number(4, 52) * 604812345;
        case 'months':
            return number(2, 13) * 2592012345;
        case 'years':
            return number(1, 20) * 31104012345;
    }
}
function date(step) {
    if (step) {
        return by(step);
    }
    var now = new Date();
    var days = number(-1000, env.MOST_NEAR_DATETIME);
    now.setTime(now.getTime() - days);
    return now;
}
var random$1 = {
    pick: pick,
    date: date,
    randexp: _randexp,
    shuffle: shuffle,
    number: number,
};

function getSubAttribute(obj, dotSeparatedKey) {
    var keyElements = dotSeparatedKey.split('.');
    while (keyElements.length) {
        var prop = keyElements.shift();
        if (!obj[prop]) {
            break;
        }
        obj = obj[prop];
    }
    return obj;
}
/**
 * Returns true/false whether the object parameter has its own properties defined
 *
 * @param obj
 * @param properties
 * @returns {boolean}
 */
function hasProperties(obj) {
    var properties = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        properties[_i - 1] = arguments[_i];
    }
    return properties.filter(function (key) {
        return typeof obj[key] !== 'undefined';
    }).length > 0;
}
/**
 * Returns typecasted value.
 * External generators (faker, chance, casual) may return data in non-expected formats, such as string, when you might expect an
 * integer. This function is used to force the typecast. This is the base formatter for all result values.
 *
 * @param schema
 * @param callback
 * @returns {any}
 */
function typecast(schema, callback) {
    var params = {};
    // normalize constraints
    switch (schema.type) {
        case 'integer':
        case 'number':
            if (typeof schema.minimum !== 'undefined') {
                params.minimum = schema.minimum;
            }
            if (typeof schema.maximum !== 'undefined') {
                params.maximum = schema.maximum;
            }
            if (schema.enum) {
                var min = Math.max(params.minimum || 0, 0);
                var max = Math.min(params.maximum || Infinity, Infinity);
                if (schema.exclusiveMinimum && min === schema.minimum) {
                    min += schema.multipleOf || 1;
                }
                if (schema.exclusiveMaximum && max === schema.maximum) {
                    max -= schema.multipleOf || 1;
                }
                // discard out-of-bounds enumerations
                schema.enum = schema.enum.filter(function (x) {
                    if (x >= min && x <= max) {
                        return true;
                    }
                    return false;
                });
            }
            break;
        case 'string':
            if (typeof schema.minLength !== 'undefined') {
                params.minLength = schema.minLength;
            }
            if (typeof schema.maxLength !== 'undefined') {
                params.maxLength = schema.maxLength;
            }
            var _maxLength = optionAPI('maxLength');
            var _minLength = optionAPI('minLength');
            // Don't allow user to set max length above our maximum
            if (_maxLength && params.maxLength > _maxLength) {
                params.maxLength = _maxLength;
            }
            // Don't allow user to set min length above our maximum
            if (_minLength && params.minLength < _minLength) {
                params.minLength = _minLength;
            }
            break;
    }
    // execute generator
    var value = callback(params);
    // normalize output value
    switch (schema.type) {
        case 'number':
            value = parseFloat(value);
            break;
        case 'integer':
            value = parseInt(value, 10);
            break;
        case 'boolean':
            value = !!value;
            break;
        case 'string':
            value = String(value);
            var min = Math.max(params.minLength || 0, 0);
            var max = Math.min(params.maxLength || Infinity, Infinity);
            while (value.length < min) {
                value += ' ' + value;
            }
            if (value.length > max) {
                value = value.substr(0, max);
            }
            break;
    }
    return value;
}
function merge(a, b) {
    for (var key in b) {
        if (typeof b[key] !== 'object' || b[key] === null) {
            a[key] = b[key];
        }
        else if (Array.isArray(b[key])) {
            a[key] = a[key] || [];
            // fix #292 - skip duplicated values from merge object (b)
            b[key].forEach(function (value) {
                if (a[key].indexOf(value) === -1) {
                    a[key].push(value);
                }
            });
        }
        else if (typeof a[key] !== 'object' || a[key] === null || Array.isArray(a[key])) {
            a[key] = merge({}, b[key]);
        }
        else {
            a[key] = merge(a[key], b[key]);
        }
    }
    return a;
}
function clean(obj, isArray, requiredProps) {
    if (!obj || typeof obj !== 'object') {
        return obj;
    }
    if (Array.isArray(obj)) {
        obj = obj
            .map(function (value) { return clean(value, true, requiredProps); })
            .filter(function (value) { return typeof value !== 'undefined'; });
        return obj;
    }
    Object.keys(obj).forEach(function (k) {
        if (!requiredProps || requiredProps.indexOf(k) === -1) {
            if (Array.isArray(obj[k]) && !obj[k].length) {
                delete obj[k];
            }
        }
        else {
            obj[k] = clean(obj[k]);
        }
    });
    if (!Object.keys(obj).length && isArray) {
        return undefined;
    }
    return obj;
}
function short(schema) {
    var s = JSON.stringify(schema);
    var l = JSON.stringify(schema, null, 2);
    return s.length > 400 ? l.substr(0, 400) + '...' : l;
}
function anyValue() {
    return random.pick([
        false,
        true,
        null,
        -1,
        NaN,
        Math.PI,
        Infinity,
        undefined,
        [],
        {},
        Math.random(),
        Math.random().toString(36).substr(2),
    ]);
}
// TODO: improve this behavior
function notValue(schema) {
    var copy = {};
    if (typeof schema.minimum !== 'undefined') {
        copy.maximum = schema.minimum;
        copy.exclusiveMaximum = true;
    }
    if (typeof schema.maximum !== 'undefined') {
        copy.minimum = schema.maximum > copy.maximum ? 0 : schema.maximum;
        copy.exclusiveMinimum = true;
    }
    if (typeof schema.minLength !== 'undefined') {
        copy.maxLength = schema.minLength;
    }
    if (typeof schema.maxLength !== 'undefined') {
        copy.minLength = schema.maxLength > copy.maxLength ? 0 : schema.maxLength;
    }
    if (schema.type) {
        copy.type = random.pick(env.ALL_TYPES.filter(function (x) { return x !== schema.type; }));
    }
    else if (schema.enum) {
        do {
            var value = anyValue();
        } while (schema.enum.indexOf(value) !== -1);
        copy.enum = [value];
    }
    return copy;
}
// FIXME: evaluate more constraints?
function validate(value, schemas) {
    return !schemas.every(function (x) {
        if (typeof x.minimum !== 'undefined' && value >= x.minimum) {
            return true;
        }
        if (typeof x.maximum !== 'undefined' && value <= x.maximum) {
            return true;
        }
    });
}
function isKey(prop) {
    return prop === 'enum' || prop === 'default' || prop === 'required' || prop === 'definitions';
}
var utils = {
    getSubAttribute: getSubAttribute,
    hasProperties: hasProperties,
    typecast: typecast,
    merge: merge,
    clean: clean,
    short: short,
    notValue: notValue,
    anyValue: anyValue,
    validate: validate,
    isKey: isKey,
};

var ParseError = /** @class */ (function (_super) {
    tslib_1.__extends(ParseError, _super);
    function ParseError(message, path) {
        var _this = _super.call(this) || this;
        _this.path = path;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(_this, _this.constructor);
        }
        _this.name = 'ParseError';
        _this.message = message;
        _this.path = path;
        return _this;
    }
    return ParseError;
}(Error));

var inferredProperties = {
    array: [
        'additionalItems',
        'items',
        'maxItems',
        'minItems',
        'uniqueItems'
    ],
    integer: [
        'exclusiveMaximum',
        'exclusiveMinimum',
        'maximum',
        'minimum',
        'multipleOf'
    ],
    object: [
        'additionalProperties',
        'dependencies',
        'maxProperties',
        'minProperties',
        'patternProperties',
        'properties',
        'required'
    ],
    string: [
        'maxLength',
        'minLength',
        'pattern'
    ]
};
inferredProperties.number = inferredProperties.integer;
var subschemaProperties = [
    'additionalItems',
    'items',
    'additionalProperties',
    'dependencies',
    'patternProperties',
    'properties'
];
/**
 * Iterates through all keys of `obj` and:
 * - checks whether those keys match properties of a given inferred type
 * - makes sure that `obj` is not a subschema; _Do not attempt to infer properties named as subschema containers. The
 * reason for this is that any property name within those containers that matches one of the properties used for
 * inferring missing type values causes the container itself to get processed which leads to invalid output. (Issue 62)_
 *
 * @returns {boolean}
 */
function matchesType(obj, lastElementInPath, inferredTypeProperties) {
    return Object.keys(obj).filter(function (prop) {
        var isSubschema = subschemaProperties.indexOf(lastElementInPath) > -1, inferredPropertyFound = inferredTypeProperties.indexOf(prop) > -1;
        if (inferredPropertyFound && !isSubschema) {
            return true;
        }
    }).length > 0;
}
/**
 * Checks whether given `obj` type might be inferred. The mechanism iterates through all inferred types definitions,
 * tries to match allowed properties with properties of given `obj`. Returns type name, if inferred, or null.
 *
 * @returns {string|null}
 */
function inferType(obj, schemaPath) {
    for (var typeName in inferredProperties) {
        var lastElementInPath = schemaPath[schemaPath.length - 1];
        if (matchesType(obj, lastElementInPath, inferredProperties[typeName])) {
            return typeName;
        }
    }
}

/**
 * Generates randomized boolean value.
 *
 * @returns {boolean}
 */
function booleanGenerator() {
    return optionAPI('random')() > 0.5;
}

var booleanType = booleanGenerator;

/**
 * Generates null value.
 *
 * @returns {null}
 */
function nullGenerator() {
    return null;
}

var nullType = nullGenerator;

// TODO provide types
function unique(path, items, value, sample, resolve, traverseCallback) {
    var tmp = [], seen = [];
    function walk(obj) {
        var json = JSON.stringify(obj);
        if (seen.indexOf(json) === -1) {
            seen.push(json);
            tmp.push(obj);
        }
    }
    items.forEach(walk);
    // TODO: find a better solution?
    var limit = 100;
    while (tmp.length !== items.length) {
        walk(traverseCallback(value.items || sample, path, resolve));
        if (!limit--) {
            break;
        }
    }
    return tmp;
}
// TODO provide types
var arrayType = function arrayType(value, path, resolve, traverseCallback) {
    var items = [];
    if (!(value.items || value.additionalItems)) {
        if (utils.hasProperties(value, 'minItems', 'maxItems', 'uniqueItems')) {
            throw new ParseError('missing items for ' + utils.short(value), path);
        }
        return items;
    }
    // see http://stackoverflow.com/a/38355228/769384
    // after type guards support subproperties (in TS 2.0) we can simplify below to (value.items instanceof Array)
    // so that value.items.map becomes recognized for typescript compiler
    var tmpItems = value.items;
    if (tmpItems instanceof Array) {
        return Array.prototype.concat.call(items, tmpItems.map(function (item, key) {
            var itemSubpath = path.concat(['items', key + '']);
            return traverseCallback(item, itemSubpath, resolve);
        }));
    }
    var minItems = value.minItems;
    var maxItems = value.maxItems;
    if (optionAPI('minItems') && minItems === undefined) {
        // fix boundaries
        minItems = !maxItems
            ? optionAPI('minItems')
            : Math.min(optionAPI('minItems'), maxItems);
    }
    if (optionAPI('maxItems')) {
        // Don't allow user to set max items above our maximum
        if (maxItems && maxItems > optionAPI('maxItems')) {
            maxItems = optionAPI('maxItems');
        }
        // Don't allow user to set min items above our maximum
        if (minItems && minItems > optionAPI('maxItems')) {
            minItems = maxItems;
        }
    }
    var length = (maxItems != null && optionAPI('alwaysFakeOptionals')) ?
        maxItems : random$1.number(minItems, maxItems, 1, 5), 
    // TODO below looks bad. Should additionalItems be copied as-is?
    sample = typeof value.additionalItems === 'object' ? value.additionalItems : {};
    for (var current = items.length; current < length; current++) {
        var itemSubpath = path.concat(['items', current + '']);
        var element = traverseCallback(value.items || sample, itemSubpath, resolve);
        items.push(element);
    }
    if (value.uniqueItems) {
        return unique(path.concat(['items']), items, value, sample, resolve, traverseCallback);
    }
    return items;
};

var numberType = function numberType(value) {
    var min = typeof value.minimum === 'undefined' ? env.MIN_INTEGER : value.minimum, max = typeof value.maximum === 'undefined' ? env.MAX_INTEGER : value.maximum, multipleOf = value.multipleOf;
    if (multipleOf) {
        max = Math.floor(max / multipleOf) * multipleOf;
        min = Math.ceil(min / multipleOf) * multipleOf;
    }
    if (value.exclusiveMinimum && min === value.minimum) {
        min += multipleOf || 1;
    }
    if (value.exclusiveMaximum && max === value.maximum) {
        max -= multipleOf || 1;
    }
    if (min > max) {
        return NaN;
    }
    if (multipleOf) {
        if (String(multipleOf).indexOf('.') === -1) {
            var base = random$1.number(Math.floor(min / multipleOf), Math.floor(max / multipleOf)) * multipleOf;
            while (base < min) {
                base += value.multipleOf;
            }
            return base;
        }
        var boundary = (max - min) / multipleOf;
        do {
            var num = random$1.number(0, boundary) * multipleOf;
            var fix = (num / multipleOf) % 1;
        } while (fix !== 0);
        return num;
    }
    return random$1.number(min, max, undefined, undefined, true);
};

// The `integer` type is just a wrapper for the `number` type. The `number` type
// returns floating point numbers, and `integer` type truncates the fraction
// part, leaving the result as an integer.
var integerType = function integerType(value) {
    var generated = numberType(value);
    // whether the generated number is positive or negative, need to use either
    // floor (positive) or ceil (negative) function to get rid of the fraction
    return generated > 0 ? Math.floor(generated) : Math.ceil(generated);
};

var LIPSUM_WORDS = ('Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore'
    + ' et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea'
    + ' commodo consequat Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla'
    + ' pariatur Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est'
    + ' laborum').split(' ');
/**
 * Generates randomized array of single lorem ipsum words.
 *
 * @param length
 * @returns {Array.<string>}
 */
function wordsGenerator(length) {
    var words = random$1.shuffle(LIPSUM_WORDS);
    return words.slice(0, length);
}

// fallback generator
var anyType = { type: ['string', 'number', 'integer', 'boolean'] };
// TODO provide types
var objectType = function objectType(value, path, resolve, traverseCallback) {
    var props = {};
    var properties = value.properties || {};
    var patternProperties = value.patternProperties || {};
    var requiredProperties = (value.required || []).slice();
    var allowsAdditional = value.additionalProperties === false ? false : true;
    var propertyKeys = Object.keys(properties);
    var patternPropertyKeys = Object.keys(patternProperties);
    var additionalProperties = allowsAdditional
        ? (value.additionalProperties === true ? {} : value.additionalProperties)
        : null;
    if (!allowsAdditional &&
        propertyKeys.length === 0 &&
        patternPropertyKeys.length === 0 &&
        utils.hasProperties(value, 'minProperties', 'maxProperties', 'dependencies', 'required')) {
        // just nothing
        return {};
    }
    if (optionAPI('requiredOnly') === true) {
        requiredProperties.forEach(function (key) {
            if (properties[key]) {
                props[key] = properties[key];
            }
        });
        return traverseCallback(props, path.concat(['properties']), resolve);
    }
    var min = Math.max(value.minProperties || 0, requiredProperties.length);
    var max = Math.max(value.maxProperties || random$1.number(min, min + 5));
    random$1.shuffle(patternPropertyKeys).forEach(function (_key) {
        if (requiredProperties.indexOf(_key) === -1) {
            requiredProperties.push(_key);
        }
    });
    var fakeOptionals = optionAPI('alwaysFakeOptionals');
    // properties are read from right-to-left
    var _props = fakeOptionals ? propertyKeys
        : (requiredProperties.length
            ? requiredProperties
            : propertyKeys).slice(0, random$1.number(min, max));
    var missing = [];
    _props.forEach(function (key) {
        // first ones are the required properies
        if (properties[key]) {
            props[key] = properties[key];
        }
        else {
            var found;
            // then try patternProperties
            patternPropertyKeys.forEach(function (_key) {
                if (key.match(new RegExp(_key))) {
                    found = true;
                    props[random$1.randexp(key)] = patternProperties[_key];
                }
            });
            if (!found) {
                // try patternProperties again,
                var subschema = patternProperties[key] || additionalProperties;
                // FIXME: allow anyType as fallback when no subschema is given?
                if (subschema) {
                    // otherwise we can use additionalProperties?
                    props[patternProperties[key] ? random$1.randexp(key) : key] = subschema;
                }
                else {
                    missing.push(key);
                }
            }
        }
    });
    var current = Object.keys(props).length;
    var fillProps = optionAPI('fillProperties');
    var reuseProps = optionAPI('reuseProperties');
    while (fillProps) {
        if (!(patternPropertyKeys.length || allowsAdditional)) {
            break;
        }
        if (current >= min) {
            break;
        }
        if (allowsAdditional) {
            if (reuseProps && ((propertyKeys.length - current) > min)) {
                var count = 0;
                do {
                    count += 1;
                    // skip large objects
                    if (count > 1000) {
                        break;
                    }
                    var key = random$1.pick(propertyKeys);
                } while (typeof props[key] !== 'undefined');
                if (typeof props[key] === 'undefined') {
                    props[key] = properties[key];
                    current += 1;
                }
            }
            else {
                var word = wordsGenerator(1) + random$1.randexp('[a-f\\d]{1,3}');
                if (!props[word]) {
                    props[word] = additionalProperties || anyType;
                    current += 1;
                }
            }
        }
        patternPropertyKeys.forEach(function (_key) {
            var word = random$1.randexp(_key);
            if (!props[word]) {
                props[word] = patternProperties[_key];
                current += 1;
            }
        });
    }
    if (!allowsAdditional && current < min) {
        if (missing.length) {
            throw new ParseError('properties "' + missing.join(', ') + '" were not found while additionalProperties is false:\n' +
                utils.short(value), path);
        }
        throw new ParseError('properties constraints were too strong to successfully generate a valid object for:\n' +
            utils.short(value), path);
    }
    return traverseCallback(props, path.concat(['properties']), resolve);
};

/**
 * Helper function used by thunkGenerator to produce some words for the final result.
 *
 * @returns {string}
 */
function produce() {
    var length = random$1.number(1, 5);
    return wordsGenerator(length).join(' ');
}
/**
 * Generates randomized concatenated string based on words generator.
 *
 * @returns {string}
 */
function thunkGenerator(min, max) {
    if (min === void 0) { min = 0; }
    if (max === void 0) { max = 140; }
    var min = Math.max(0, min), max = random$1.number(min, max), result = produce();
    // append until length is reached
    while (result.length < min) {
        result += produce();
    }
    // cut if needed
    if (result.length > max) {
        result = result.substr(0, max);
    }
    return result;
}

/**
 * Generates randomized ipv4 address.
 *
 * @returns {string}
 */
function ipv4Generator() {
    return [0, 0, 0, 0].map(function () {
        return random$1.number(0, 255);
    }).join('.');
}

/**
 * Generates randomized date time ISO format string.
 *
 * @returns {string}
 */
function dateTimeGenerator() {
    return random$1.date().toISOString();
}

/**
 * Generates randomized date format string.
 *
 * @returns {string}
 */
function dateGenerator() {
    return dateTimeGenerator().slice(0, 10);
}

/**
 * Generates randomized time format string.
 *
 * @returns {string}
 */
function timeGenerator() {
    return dateTimeGenerator().slice(11);
}

/**
 * Predefined core formats
 * @type {[key: string]: string}
 */
var regexps = {
    email: '[a-zA-Z\\d][a-zA-Z\\d-]{1,13}[a-zA-Z\\d]@{hostname}',
    hostname: '[a-zA-Z]{1,33}\\.[a-z]{2,4}',
    ipv6: '[a-f\\d]{4}(:[a-f\\d]{4}){7}',
    uri: 'https?://[a-zA-Z][a-zA-Z0-9+-.]*',
    'uri-reference': '(https?://|#|/|)[a-zA-Z][a-zA-Z0-9+-.]*',
};
/**
 * Generates randomized string basing on a built-in regex format
 *
 * @param coreFormat
 * @returns {string}
 */
function coreFormatGenerator(coreFormat) {
    return random$1.randexp(regexps[coreFormat]).replace(/\{(\w+)\}/, function (match, key) {
        return random$1.randexp(regexps[key]);
    });
}

function generateFormat(value, invalid) {
    var callback = formatAPI(value.format);
    if (typeof callback === 'function') {
        return callback(value);
    }
    switch (value.format) {
        case 'date-time':
        case 'datetime':
            return dateTimeGenerator();
        case 'date':
            return dateGenerator();
        case 'time':
            return timeGenerator();
        case 'ipv4':
            return ipv4Generator();
        case 'regex':
            // TODO: discuss
            return '.+?';
        case 'email':
        case 'hostname':
        case 'ipv6':
        case 'uri':
        case 'uri-reference':
            return coreFormatGenerator(value.format);
        default:
            if (typeof callback === 'undefined') {
                if (optionAPI('failOnInvalidFormat')) {
                    throw new Error('unknown registry key ' + utils.short(value.format));
                }
                else {
                    return invalid();
                }
            }
            throw new Error('unsupported format "' + value.format + '"');
    }
}
var stringType = function stringType(value) {
    var output;
    output = utils.typecast(value, function (opts) {
        if (value.format) {
            return generateFormat(value, function () { return thunkGenerator(opts.minLength, opts.maxLength); });
        }
        if (value.pattern) {
            return random$1.randexp(value.pattern);
        }
        return thunkGenerator(opts.minLength, opts.maxLength);
    });
    return output;
};

var typeMap = {
    boolean: booleanType,
    null: nullType,
    array: arrayType,
    integer: integerType,
    number: numberType,
    object: objectType,
    string: stringType
};

// TODO provide types
function traverse(schema, path, resolve, rootSchema) {
    schema = resolve(schema);
    if (!schema) {
        return;
    }
    // default values has higher precedence
    if (optionAPI('useDefaultValue') && 'default' in schema) {
        return schema.default;
    }
    if (schema.not && typeof schema.not === 'object') {
        schema = utils.notValue(sub.not);
    }
    if (Array.isArray(schema.enum)) {
        return utils.typecast(schema, function () { return random$1.pick(schema.enum); });
    }
    // thunks can return sub-schemas
    if (typeof schema.thunk === 'function') {
        return traverse(schema.thunk(), path, resolve);
    }
    if (typeof schema.generate === 'function') {
        return utils.typecast(schema, function () { return schema.generate(rootSchema); });
    }
    // TODO remove the ugly overcome
    var type = schema.type;
    if (Array.isArray(type)) {
        type = random$1.pick(type);
    }
    else if (typeof type === 'undefined') {
        // Attempt to infer the type
        type = inferType(schema, path) || type;
        if (type) {
            schema.type = type;
        }
    }
    if (typeof type === 'string') {
        if (!typeMap[type]) {
            if (optionAPI('failOnInvalidTypes')) {
                throw new ParseError('unknown primitive ' + utils.short(type), path.concat(['type']));
            }
            else {
                return optionAPI('defaultInvalidTypeProduct');
            }
        }
        else {
            try {
                var result = typeMap[type](schema, path, resolve, traverse);
                var required = schema.items
                    ? schema.items.required
                    : schema.required;
                return utils.clean(result, null, required);
            }
            catch (e) {
                if (typeof e.path === 'undefined') {
                    throw new ParseError(e.message, path);
                }
                throw e;
            }
        }
    }
    var copy = {};
    if (Array.isArray(schema)) {
        copy = [];
    }
    for (var prop in schema) {
        if (typeof schema[prop] === 'object' && prop !== 'definitions') {
            copy[prop] = traverse(schema[prop], path.concat([prop]), resolve, copy);
        }
        else {
            copy[prop] = schema[prop];
        }
    }
    return copy;
}

function pick$1(data) {
    return Array.isArray(data)
        ? random$1.pick(data)
        : data;
}
function cycle(data, reverse) {
    if (!Array.isArray(data)) {
        return data;
    }
    var value = reverse
        ? data.pop()
        : data.shift();
    if (reverse) {
        data.unshift(value);
    }
    else {
        data.push(value);
    }
    return value;
}
function resolve(obj, data, values, property) {
    if (!obj || typeof obj !== 'object') {
        return obj;
    }
    if (!values) {
        values = {};
    }
    if (!data) {
        data = obj;
    }
    if (Array.isArray(obj)) {
        return obj.map(function (x) { return resolve(x, data, values, property); });
    }
    if (obj.jsonPath) {
        var params = typeof obj.jsonPath !== 'object'
            ? { path: obj.jsonPath }
            : obj.jsonPath;
        params.group = obj.group || params.group || property;
        params.cycle = obj.cycle || params.cycle || false;
        params.reverse = obj.reverse || params.reverse || false;
        params.count = obj.count || params.count || 1;
        var key = params.group + "__" + params.path;
        if (!values[key]) {
            if (params.count > 1) {
                values[key] = jsonpath.query(data, params.path, params.count);
            }
            else {
                values[key] = jsonpath.value(data, params.path);
            }
        }
        if (params.cycle || params.reverse) {
            return cycle(values[key], params.reverse);
        }
        return pick$1(values[key]);
    }
    Object.keys(obj).forEach(function (k) {
        obj[k] = resolve(obj[k], data, values, k);
    });
    return obj;
}
// TODO provide types
function run(refs, schema, container) {
    try {
        var result = traverse(schema, [], function reduce(sub, maxReduceDepth) {
            if (typeof maxReduceDepth === 'undefined') {
                maxReduceDepth = random$1.number(1, 3);
            }
            if (!sub) {
                return null;
            }
            if (typeof sub.generate === 'function') {
                return sub;
            }
            // cleanup
            if (sub.id && typeof sub.id === 'string') {
                delete sub.id;
                delete sub.$schema;
            }
            if (typeof sub.$ref === 'string') {
                if (sub.$ref === '#') {
                    delete sub.$ref;
                    return sub;
                }
                if (sub.$ref.indexOf('#/') === -1) {
                    var ref = deref.util.findByRef(sub.$ref, refs);
                    if (!ref) {
                        throw new Error('Reference not found: ' + sub.$ref);
                    }
                    return ref;
                }
                // just remove the reference
                delete sub.$ref;
                return sub;
            }
            if (Array.isArray(sub.allOf)) {
                var schemas = sub.allOf;
                delete sub.allOf;
                // this is the only case where all sub-schemas
                // must be resolved before any merge
                schemas.forEach(function (subSchema) {
                    var _sub = reduce(subSchema, maxReduceDepth + 1);
                    // call given thunks if present
                    utils.merge(sub, typeof _sub.thunk === 'function'
                        ? _sub.thunk()
                        : _sub);
                });
            }
            if (Array.isArray(sub.oneOf || sub.anyOf)) {
                var mix = sub.oneOf || sub.anyOf;
                // test every value from the enum against each-oneOf
                // schema, only values that validate once are kept
                if (sub.enum && sub.oneOf) {
                    sub.enum = sub.enum.filter(function (x) { return utils.validate(x, mix); });
                }
                delete sub.anyOf;
                delete sub.oneOf;
                return {
                    thunk: function () {
                        var copy = utils.merge({}, sub);
                        utils.merge(copy, random$1.pick(mix));
                        return copy;
                    },
                };
            }
            for (var prop in sub) {
                if ((Array.isArray(sub[prop]) || typeof sub[prop] === 'object') && !utils.isKey(prop)) {
                    sub[prop] = reduce(sub[prop], maxReduceDepth);
                }
            }
            return container.wrap(sub);
        });
        if (optionAPI('resolveJsonPath')) {
            return resolve(result);
        }
        return result;
    }
    catch (e) {
        if (e.path) {
            throw new Error(e.message + ' in ' + '/' + e.path.join('/'));
        }
        else {
            throw e;
        }
    }
}

var container = new Container();
function getRefs(refs) {
    var $refs = {};
    if (Array.isArray(refs)) {
        refs.map(deref.util.normalizeSchema).forEach(function (schema) {
            $refs[schema.id] = schema;
        });
    }
    else {
        $refs = refs || {};
    }
    return $refs;
}
function walk(obj, cb) {
    var keys = Object.keys(obj);
    var retval;
    for (var i = 0; i < keys.length; i += 1) {
        retval = cb(obj[keys[i]], keys[i], obj);
        if (!retval && obj[keys[i]] && !Array.isArray(obj[keys[i]]) && typeof obj[keys[i]] === 'object') {
            retval = walk(obj[keys[i]], cb);
        }
        if (typeof retval !== 'undefined') {
            return retval;
        }
    }
}
var jsf = function (schema, refs) {
    var ignore = optionAPI('ignoreMissingRefs');
    var $ = deref(function (id, refs) {
        // FIXME: allow custom callback?
        if (ignore) {
            return {};
        }
    });
    var $refs = getRefs(refs);
    return run($refs, $(schema, $refs, true), container);
};
jsf.resolve = function (schema, refs, cwd) {
    if (typeof refs === 'string') {
        cwd = refs;
        refs = {};
    }
    // normalize basedir (browser aware)
    cwd = cwd || (typeof process !== 'undefined' ? process.cwd() : '');
    cwd = cwd.replace(/\/+$/, '') + '/';
    var $refs = getRefs(refs);
    // identical setup as json-schema-sequelizer
    var fixedRefs = {
        order: 300,
        canRead: true,
        read: function (file, callback) {
            var id = cwd !== '/'
                ? file.url.replace(cwd, '')
                : file.url;
            try {
                callback(null, deref.util.findByRef(id, $refs));
            }
            catch (e) {
                var result = walk(schema, function (v, k, sub) {
                    if (k === 'id' && v === id) {
                        return sub;
                    }
                });
                if (!result) {
                    return callback(e);
                }
                callback(null, result);
            }
        },
    };
    return $RefParser
        .dereference(cwd, schema, {
        resolve: { fixedRefs: fixedRefs },
        dereference: {
            circular: 'ignore',
        },
    }).then(function (sub) { return run($refs, sub, container); });
};
jsf.format = formatAPI;
jsf.option = optionAPI;
jsf.random = random$1;
// built-in support
container.define('pattern', random$1.randexp);
// skip default generators
container.define('jsonPath', function (value, schema) {
    delete schema.type;
    return schema;
});
// safe auto-increment values
container.define('autoIncrement', function (value, schema) {
    if (!this.offset) {
        var min = schema.minimum || 1;
        var max = min + env.MAX_NUMBER;
        this.offset = random$1.number(min, max);
    }
    if (value === true) {
        return this.offset++;
    }
    return schema;
});
// safe-and-sequential dates
container.define('sequentialDate', function (value, schema) {
    if (!this.now) {
        this.now = random$1.date();
    }
    if (value) {
        schema = this.now.toISOString();
        value = value === true
            ? 'days'
            : value;
        if (['seconds', 'minutes', 'hours', 'days', 'weeks', 'months', 'years'].indexOf(value) === -1) {
            throw new Error("Unsupported increment by " + utils.short(value));
        }
        this.now.setTime(this.now.getTime() + random$1.date(value));
    }
    return schema;
});
// returns itself for chaining
jsf.extend = function (name, cb) {
    container.extend(name, cb);
    return jsf;
};
jsf.define = function (name, cb) {
    container.define(name, cb);
    return jsf;
};
jsf.locate = function (name) {
    return container.get(name);
};
var VERSION="0.5.0-rc13";
jsf.version = VERSION;

module.exports = jsf;
