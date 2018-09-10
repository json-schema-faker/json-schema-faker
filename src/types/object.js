import random from '../core/random';
import words from '../generators/words';
import utils from '../core/utils';
import optionAPI from '../api/option';
import ParseError from '../core/error';

// fallback generator
const anyType = { type: ['string', 'number', 'integer', 'boolean'] };

// TODO provide types
function objectType(value, path, resolve, traverseCallback) {
  const props = {};

  const properties = value.properties || {};
  const patternProperties = value.patternProperties || {};
  const requiredProperties = (value.required || []).slice();
  const allowsAdditional = value.additionalProperties !== false;

  const propertyKeys = Object.keys(properties);
  const patternPropertyKeys = Object.keys(patternProperties);
  const optionalProperties = propertyKeys.concat(patternPropertyKeys).reduce((_response, _key) => {
    if (requiredProperties.indexOf(_key) === -1) _response.push(_key);
    return _response;
  }, []);
  const allProperties = requiredProperties.concat(optionalProperties);

  const additionalProperties = allowsAdditional // eslint-disable-line
    ? (value.additionalProperties === true ? {} : value.additionalProperties)
    : null;

  if (!allowsAdditional &&
    propertyKeys.length === 0 &&
    patternPropertyKeys.length === 0 &&
    utils.hasProperties(value, 'minProperties', 'maxProperties', 'dependencies', 'required')
  ) {
    // just nothing
    return {};
  }

  if (optionAPI('requiredOnly') === true) {
    requiredProperties.forEach(key => {
      if (properties[key]) {
        props[key] = properties[key];
      }
    });

    return traverseCallback(props, path.concat(['properties']), resolve);
  }

  const optionalsProbability = optionAPI('alwaysFakeOptionals') === true ? 1.0 : optionAPI('optionalsProbability');
  const ignoreProperties = optionAPI('ignoreProperties') || [];

  const min = Math.max(value.minProperties || 0, requiredProperties.length);
  const max = Math.max(value.maxProperties || allProperties.length);

  const neededExtras = Math.round((min - requiredProperties.length) + (optionalsProbability * (max - min)));
  const extraPropertiesRandomOrder = random.shuffle(optionalProperties).slice(0, neededExtras);
  const extraProperties = optionalProperties.filter(_item => {
    return extraPropertiesRandomOrder.indexOf(_item) !== -1;
  });

  // properties are read from right-to-left
  const _props = requiredProperties.concat(extraProperties).slice(0, max);

  const skipped = [];
  const missing = [];

  _props.forEach(key => {
    for (let i = 0; i < ignoreProperties.length; i += 1) {
      if ((ignoreProperties[i] instanceof RegExp && ignoreProperties[i].test(key))
        || (typeof ignoreProperties[i] === 'string' && ignoreProperties[i] === key)
        || (typeof ignoreProperties[i] === 'function' && ignoreProperties[i](properties[key], key))) {
        skipped.push(key);
        return;
      }
    }

    // first ones are the required properies
    if (properties[key]) {
      props[key] = properties[key];
    } else {
      let found;

      // then try patternProperties
      patternPropertyKeys.forEach(_key => {
        if (key.match(new RegExp(_key))) {
          found = true;
          props[random.randexp(key)] = patternProperties[_key];
        }
      });

      if (!found) {
        // try patternProperties again,
        const subschema = patternProperties[key] || additionalProperties;

        // FIXME: allow anyType as fallback when no subschema is given?

        if (subschema) {
          // otherwise we can use additionalProperties?
          props[patternProperties[key] ? random.randexp(key) : key] = subschema;
        } else {
          missing.push(key);
        }
      }
    }
  });

  const fillProps = optionAPI('fillProperties');
  const reuseProps = optionAPI('reuseProperties');

  // discard already ignored props if they're not required to be filled...
  let current = Object.keys(props).length + (fillProps ? 0 : skipped.length);

  while (fillProps) {
    if (!(patternPropertyKeys.length || allowsAdditional)) {
      break;
    }

    if (current >= min) {
      break;
    }

    if (allowsAdditional) {
      if (reuseProps && ((propertyKeys.length - current) > min)) {
        let count = 0;
        let key;

        do {
          count += 1;

          // skip large objects
          if (count > 1000) {
            break;
          }

          key = random.pick(propertyKeys);
        } while (typeof props[key] !== 'undefined');

        if (typeof props[key] === 'undefined') {
          props[key] = properties[key];
          current += 1;
        }
      } else {
        const word = words(1) + random.randexp('[a-f\\d]{1,3}');

        if (!props[word]) {
          props[word] = additionalProperties || anyType;
          current += 1;
        }
      }
    }

    for (let i = 0; i < patternPropertyKeys.length; i += 1) {
      const _key = patternPropertyKeys[i];
      const word = random.randexp(_key);

      if (!props[word]) {
        props[word] = patternProperties[_key];
        current += 1;
      }
    }
  }

  if (!allowsAdditional && current < min) {
    if (missing.length) {
      throw new ParseError(`properties '${
        missing.join(', ')
      }' were not found while additionalProperties is false:\n${
        utils.short(value)
      }`, path);
    }

    throw new ParseError(`properties constraints were too strong to successfully generate a valid object for:\n${
      utils.short(value)
    }`, path);
  }

  return traverseCallback(props, path.concat(['properties']), resolve);
}

export default objectType;
