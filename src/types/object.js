import random from '../core/random';
import words from '../generators/words';
import utils from '../core/utils';
import optionAPI from '../api/option';

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
    ? (value.additionalProperties === true ? anyType : value.additionalProperties)
    : null;

  if (!allowsAdditional
    && propertyKeys.length === 0
    && patternPropertyKeys.length === 0
    && utils.hasProperties(value, 'minProperties', 'maxProperties', 'dependencies', 'required')
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
  const fixedProbabilities = optionAPI('alwaysFakeOptionals') || optionAPI('fixedProbabilities') || false;
  const ignoreProperties = optionAPI('ignoreProperties') || [];

  const min = Math.max(value.minProperties || 0, requiredProperties.length);
  const max = Math.min(value.maxProperties || allProperties.length, allProperties.length);

  let neededExtras = Math.max(0, min - requiredProperties.length);

  if (allProperties.length === 1 && !requiredProperties.length) {
    neededExtras = random.number(neededExtras, allProperties.length + (max - min));
  }

  if (optionalsProbability !== false) {
    if (fixedProbabilities === true) {
      neededExtras = Math.round((min - requiredProperties.length) + (optionalsProbability * (max - min)));
    } else {
      neededExtras = random.number(min - requiredProperties.length, optionalsProbability * (max - min));
    }
  }

  const extraPropertiesRandomOrder = random.shuffle(optionalProperties).slice(0, neededExtras);
  const extraProperties = optionalProperties.filter(_item => {
    return extraPropertiesRandomOrder.indexOf(_item) !== -1;
  });

  // properties are read from right-to-left
  const _props = requiredProperties.concat(extraProperties).slice(0, max);
  const _defns = [];

  if (value.dependencies) {
    Object.keys(value.dependencies).forEach(prop => {
      const _required = value.dependencies[prop];

      if (_props.indexOf(prop) !== -1) {
        if (Array.isArray(_required)) {
          // property-dependencies
          _required.forEach(sub => {
            if (_props.indexOf(sub) === -1) {
              _props.push(sub);
            }
          });
        } else {
          _defns.push(_required);
        }
      }
    });

    // schema-dependencies
    if (_defns.length) {
      delete value.dependencies;

      return traverseCallback({
        allOf: _defns.concat(value),
      }, path.concat(['properties']), resolve);
    }
  }

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
    }

    let found;

    // then try patternProperties
    patternPropertyKeys.forEach(_key => {
      if (key.match(new RegExp(_key))) {
        found = true;

        if (props[key]) {
          utils.merge(props[key], patternProperties[_key]);
        } else {
          props[random.randexp(key)] = patternProperties[_key];
        }
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
  });

  const fillProps = optionAPI('fillProperties');
  const reuseProps = optionAPI('reuseProperties');

  // discard already ignored props if they're not required to be filled...
  let current = Object.keys(props).length + (fillProps ? 0 : skipped.length);

  function get() {
    let one;

    do {
      one = requiredProperties.shift();
    } while (props[one]);

    return one;
  }

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

          key = get() || random.pick(propertyKeys);
        } while (typeof props[key] !== 'undefined');

        if (typeof props[key] === 'undefined') {
          props[key] = properties[key];
          current += 1;
        }
      } else if (patternPropertyKeys.length && !additionalProperties) {
        const prop = random.pick(patternPropertyKeys);
        const word = random.randexp(prop);

        if (!props[word]) {
          props[word] = patternProperties[prop];
          current += 1;
        }
      } else {
        const word = get() || (words(1) + random.randexp('[a-f\\d]{1,3}'));

        if (!props[word]) {
          props[word] = additionalProperties || anyType;
          current += 1;
        }
      }
    }

    for (let i = 0; current < min && i < patternPropertyKeys.length; i += 1) {
      const _key = patternPropertyKeys[i];
      const word = random.randexp(_key);

      if (!props[word]) {
        props[word] = patternProperties[_key];
        current += 1;
      }
    }
  }

  return traverseCallback(props, path.concat(['properties']), resolve);
}

export default objectType;
