'use strict';

var faker = require('faker'),
    Randexp = require('randexp');

var random = require('../util/random');

var regexps = {
  email: '[a-zA-Z\\d][a-zA-Z\\d.-]{1,13}@{hostname}',
  hostname: '[a-zA-Z]{1,33}\\.[a-z]{2,4}',
  ipv6: '[abcdef\\d]{4}(:[abcdef\\d]{4}){7}',
  uri: '[a-zA-Z\\d_][\\w\\\/\\d_-]{1,40}'
};

function generate(format) {
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
      return Randexp.randexp('.*');
  }
}

module.exports = function(value) {
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
