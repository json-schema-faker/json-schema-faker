'use strict';

var faker = require('faker'),
    Chance = require('chance'),
    Randexp = require('randexp');

var chance = new Chance();

var random = require('../util/random');

var regexps = {
  email: '[a-zA-Z\\d][a-zA-Z\\d.-]{1,13}[a-zA-Z\\d]@{hostname}',
  hostname: '[a-zA-Z]{1,33}\\.[a-z]{2,4}',
  ipv6: '[abcdef\\d]{4}(:[abcdef\\d]{4}){7}',
  uri: '[a-zA-Z\\d_][\\w\\\/\\d_-]{1,40}'
};

function get(obj, key) {
  var parts = key.split('.');

  while (parts.length) {
    var prop = parts.shift();

    if (!obj[prop]) {
      break;
    }

    obj = obj[prop];
  }

  return obj;
}

function generate(format) {
  if (typeof format === 'object') {
    var args = [],
        path = format.key;

    if (typeof path === 'object') {
      path = Object.keys(path)[0];

      if (Array.isArray(format.key[path])) {
        args = format.key[path];
      } else {
        args.push(format.key[path]);
      }
    }

    var gen = get(format.gen, path);

    if (typeof gen !== 'function') {
      throw new Error('Unknown ' + format.use + '-generator for ' + JSON.stringify(format.key));
    }

    return gen.apply(format.gen, args);
  }

  switch (format) {
    case 'date-time':
      return new Date(random(0, 100000000000000)).toISOString();

    case 'email':
    case 'hostname':
    case 'ipv6':
    case 'uri':
      return Randexp.randexp(regexps[format]).replace(/\{(\w+)\}/, function(matches, key) {
        return Randexp.randexp(regexps[key]);
      });

    case 'ipv4':
      return [0, 0, 0, 0].map(function() {
        return random(0, 255);
      }).join('.');

    default:
      throw new Error('Unknown generator for ' + format + ' format');
  }
}

module.exports = function(value) {
  if (value.faker || value.chance) {
    return generate({
      use: value.faker ? 'faker' : 'chance',
      gen: value.faker ? faker : chance,
      key: value.faker || value.chance
    });
  }

  if (value.format) {
    return generate(value.format);
  }

  if (value.pattern) {
    return Randexp.randexp(value.pattern);
  }

  if (value.minLength || value.maxLength) {
    var min = Math.max(0, value.minLength || 0),
        max = random(min, value.maxLength);

    return Randexp.randexp('.{' + min + ',' + max + '}');
  }

  return faker.lorem.words(random(1, 5)).join(' ');
};
