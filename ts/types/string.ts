import thunk = require('../generators/thunk');
import ipv4 = require('../generators/ipv4');
import dateTime = require('../generators/dateTime');
import utils = require('../core/utils');
import random = require('../core/random');
import regexp = require('../core/regexp');
import formats = require('../api/format');

import container = require('../class/Container');
var randexp = container.get('randexp').randexp;

function generateStuff(value): string {
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

    var gen = utils.getSubAttribute(value.gen, path);

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
}

function generateFormat(value: IStringSchema): string {
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
      return randexp(regexp[value.format]).replace(/\{(\w+)\}/, function(matches, key) {
        return randexp(regexp[key]);
      });
    default:
      var callback = formats(value.format);
      return callback(container.getAll(), value);
  }
}

function stringType(value: IStringSchema): string {
  if (value.faker || value.chance) {
    return generateStuff({
      use: value.faker ? 'faker' : 'chance',
      gen: value.faker ? container.get('faker') : container.get('chance'),
      key: value.faker || value.chance
    });
  } else if (value.format) {
    return generateFormat(value);
  } else if (value.pattern) {
    return randexp(value.pattern);
  } else {
    return thunk(value.minLength, value.maxLength);
  }
}

export = stringType;
