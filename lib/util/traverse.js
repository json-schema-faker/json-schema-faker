'use strict';

var __ = require('underscore');
var __de = require('underscore-deep-extend');
__.mixin({deepExtend: __de(__)});

var random = require('./random'),
    combine = require('./combine');

var ParseError = require('./error');

var inferredType = require('./inferred');

var primitives = null;

function reduce(obj) {
  var mix = obj.allOf || obj.anyOf || obj.oneOf;

  if (!(mix && mix.length)) {
    for (var key in obj) {
      var value = obj[key];

      if (typeof value === 'object' && !(key === 'enum' || key === 'required')) {
        reduce(value);
      }
    }

    return;
  }

  if ((obj.oneOf || obj.anyOf) && mix.length) {
    mix = [random.pick(mix)];
  }

  delete obj.allOf;
  delete obj.anyOf;
  delete obj.oneOf;

//  var fixed = {};
var fixed = __.deepExtend(mix[0], mix[1]);

//  mix.forEach(function(value) {
//    combine(fixed, value);
//  });

  combine(obj, fixed);

  while (obj.allOf || obj.anyOf || obj.oneOf) {
    reduce(obj);
  }
}

function traverse(obj, path) {
  if (primitives === null) {
    primitives = require('./primitives');
  }

  var copy = {};

  if (Array.isArray(obj)) {
    copy = [];
  }

  path = path || [];

  reduce(obj);

  if (Array.isArray(obj.enum)) {
    return random.pick(obj.enum);
  }

  var type = obj.type;

  if (Array.isArray(type)) {
    type = random.pick(type);
  } else if (typeof type === 'undefined') {
    // Attempt to infer the type
    type = inferredType(obj) || type;
  }

  if (typeof type === 'string') {
    if (!primitives[type]) {
      throw new ParseError('unknown primitive ' + JSON.stringify(type), path.concat(['type']));
    }

    try {
      return primitives[type](obj, path);
    } catch (e) {
      if (typeof e.path === 'undefined') {
        throw new ParseError(e.message, path)
      }

      throw e;
    }
  }

  for (var key in obj) {
    var value = obj[key];

    if (typeof value === 'object') {
      copy[key] = traverse(value, path.concat([key]));
    } else {
      copy[key] = value;
    }
  }

  return copy;
}

module.exports = traverse;
