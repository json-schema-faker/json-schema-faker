var container = require('../util/container');

var faker = container.get('faker'),
    chance = container.get('chance'),
    RandExp = container.get('randexp'),
    randexp = RandExp.randexp;

var words = require('../generators/words'),
    random = require('../util/random'),
    formats = require('../util/formats');

var regexps = {
  email: '[a-zA-Z\\d][a-zA-Z\\d-]{1,13}[a-zA-Z\\d]@{hostname}',
  hostname: '[a-zA-Z]{1,33}\\.[a-z]{2,4}',
  ipv6: '[abcdef\\d]{4}(:[abcdef\\d]{4}){7}',
  uri: '[a-zA-Z][a-zA-Z0-9+-.]*'
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

function thunk() {
  return words().join(' ');
}

function generate(value) {
  if (value.use) {
    var args = [],
        path = value.key;

    if (typeof path === 'object') {
      path = Object.keys(path)[0];

      if (Array.isArray(value.key[path])) {
        args = value.key[path];
      } else {
        args.push(value.key[path]);
      }
    }

    var gen = get(value.gen, path);

    if (typeof gen !== 'function') {
      throw new Error('unknown ' + value.use + '-generator for ' + JSON.stringify(value.key));
    }

    // see #116, #117 - faker.js 3.1.0 introduced local dependencies between generators
    // making jsf break after upgrading from 3.0.1
    var contextObject = value.gen;
    if (value.use === 'faker') {
      var fakerModuleName = path.split('.')[0];
      contextObject = value.gen[fakerModuleName];
    }

    return gen.apply(contextObject, args);
  }

  switch (value.format) {
    case 'date-time':
      return new Date(random(0, 100000000000000)).toISOString();

    case 'email':
    case 'hostname':
    case 'ipv6':
    case 'uri':
      return randexp(regexps[value.format]).replace(/\{(\w+)\}/, function(matches, key) {
        return randexp(regexps[key]);
      });

    case 'ipv4':
      return [0, 0, 0, 0].map(function() {
        return random(0, 255);
      }).join('.');

    case 'regex':
      // TODO: discuss
      return '.+?';

    default:
      var callback = formats(value.format);

      if (typeof callback !== 'function') {
        throw new Error('unknown generator for ' + JSON.stringify(value.format));
      }

      var generators = {
        faker: faker,
        chance: chance,
        randexp: randexp
      };

      return callback(generators, value);
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
    return generate(value);
  }

  if (value.pattern) {
    return randexp(value.pattern);
  }

  var min = Math.max(0, value.minLength || 0),
      max = random(min, value.maxLength || 140);

  var sample = thunk();

  while (sample.length < min) {
    sample += thunk();
  }

  if (sample.length > max) {
    sample = sample.substr(0, max);
  }

  return sample;
};
