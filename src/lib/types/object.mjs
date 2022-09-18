import constants from '../core/constants.mjs';
import random from '../core/random.mjs';
import words from '../generators/words.mjs';
import utils from '../core/utils.mjs';
import optionAPI from '../api/option.mjs';

// fallback generator
const anyType = { type: constants.ALLOWED_TYPES };

// TODO provide types
function objectType(value, path, resolve, traverseCallback) {
  const props = {};

  const properties = value.properties || {};
  const patternProperties = value.patternProperties || {};
  const requiredProperties = typeof value.required === 'boolean' ? [] : (value.required || []).slice();
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
    : value.additionalProperties;

  if (!allowsAdditional
    && propertyKeys.length === 0
    && patternPropertyKeys.length === 0
    && utils.hasProperties(value, 'minProperties', 'maxProperties', 'dependencies', 'required')
  ) {
    // just nothing
    return null;
  }

  if (optionAPI('requiredOnly') === true) {
    requiredProperties.forEach(key => {
      if (properties[key]) {
        props[key] = properties[key];
      }
    });

    return traverseCallback(props, path.concat(['properties']), resolve, value);
  }

  const optionalsProbability = optionAPI('alwaysFakeOptionals') === true ? 1.0 : optionAPI('optionalsProbability');
  const fixedProbabilities = optionAPI('alwaysFakeOptionals') || optionAPI('fixedProbabilities') || false;
  const ignoreProperties = optionAPI('ignoreProperties') || [];
  const reuseProps = optionAPI('reuseProperties');
  const fillProps = optionAPI('fillProperties');

  const max = value.maxProperties || (allProperties.length + (allowsAdditional ? random.number(1, 5) : 0));

  let min = Math.max(value.minProperties || 0, requiredProperties.length);
  let neededExtras = Math.max(0, allProperties.length - min);

  if (allProperties.length === 1 && !requiredProperties.length) {
    min = Math.max(random.number(fillProps ? 1 : 0, max), min);
  }

  if (optionalsProbability !== null) {
    if (fixedProbabilities === true) {
      neededExtras = Math.round((min - requiredProperties.length) + (optionalsProbability * (allProperties.length - min)));
    } else {
      neededExtras = random.number(min - requiredProperties.length, optionalsProbability * (allProperties.length - min));
    }
  }

  const extraPropertiesRandomOrder = random.shuffle(optionalProperties).slice(0, neededExtras);
  const extraProperties = optionalProperties.filter(_item => {
    return extraPropertiesRandomOrder.indexOf(_item) !== -1;
  });

  // properties are read from right-to-left
  const _limit = optionalsProbability !== null || requiredProperties.length === max ? max : random.number(0, max);
  const _props = requiredProperties.concat(random.shuffle(extraProperties).slice(0, _limit)).slice(0, max);
  const _defns = [];
  const _deps = [];

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
        } else if (Array.isArray(_required.oneOf || _required.anyOf)) {
          const values = _required.oneOf || _required.anyOf;

          _deps.push({ prop, values });
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
      }, path.concat(['properties']), resolve, value);
    }
  }

  const skipped = [];
  const missing = [];

  _props.forEach(key => {
    if (properties[key] && ['{}', 'true'].includes(JSON.stringify(properties[key].not))) {
      return;
    }

    for (let i = 0; i < ignoreProperties.length; i += 1) {
      if ((ignoreProperties[i] instanceof RegExp && ignoreProperties[i].test(key))
        || (typeof ignoreProperties[i] === 'string' && ignoreProperties[i] === key)
        || (typeof ignoreProperties[i] === 'function' && ignoreProperties[i](properties[key], key))) {
        skipped.push(key);
        return;
      }
    }

    if (additionalProperties === false) {
      if (requiredProperties.indexOf(key) !== -1) {
        props[key] = properties[key];
      }
    }

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

      if (subschema && additionalProperties !== false) {
        // otherwise we can use additionalProperties?
        props[patternProperties[key] ? random.randexp(key) : key] = properties[key] || subschema;
      } else {
        missing.push(key);
      }
    }
  });

  // discard already ignored props if they're not required to be filled...
  let current = Object.keys(props).length + (fillProps ? 0 : skipped.length);

  // generate dynamic suffix for additional props...
  const hash = suffix => random.randexp(`_?[_a-f\\d]{1,3}${suffix ? '\\$?' : ''}`);

  function get(from) {
    let one;

    do {
      if (!from.length) break;
      one = from.shift();
    } while (props[one]);

    return one;
  }

  let minProps = min;
  if (allowsAdditional && !requiredProperties.length) {
    minProps = Math.max(optionalsProbability === null || additionalProperties ? random.number(fillProps ? 1 : 0, max) : 0, min);
  }

  if (!extraProperties.length && !neededExtras && allowsAdditional && fixedProbabilities === true) {
    const limit = random.number(0, max);

    for (let i = 0; i <= limit; i += 1) {
      props[words(1) + hash(limit[i])] = anyType;
    }
  }

  while (fillProps) {
    if (!(patternPropertyKeys.length || allowsAdditional)) {
      break;
    }

    if (current >= minProps) {
      break;
    }

    if (allowsAdditional) {
      if (reuseProps && ((propertyKeys.length - current) > minProps)) {
        let count = 0;
        let key;

        do {
          count += 1;

          // skip large objects
          if (count > 1000) {
            break;
          }

          key = get(requiredProperties) || random.pick(propertyKeys);
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
        const word = get(requiredProperties) || (words(1) + hash());

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

  // fill up-to this value and no more!
  if (requiredProperties.length === 0 && (!allowsAdditional || optionalsProbability === false)) {
    const maximum = random.number(min, max);

    for (; current < maximum;) {
      const word = get(propertyKeys);

      if (word) {
        props[word] = properties[word];
      }

      current += 1;
    }
  }

  let sortedObj = props;
  if (optionAPI('sortProperties') !== null) {
    const originalKeys = Object.keys(properties);
    const sortedKeys = Object.keys(props).sort((a, b) => {
      return optionAPI('sortProperties') ? a.localeCompare(b) : originalKeys.indexOf(b) - originalKeys.indexOf(a);
    });

    sortedObj = sortedKeys.reduce((memo, key) => {
      memo[key] = props[key];
      return memo;
    }, {});
  }

  const result = traverseCallback(sortedObj, path.concat(['properties']), resolve, value);

  _deps.forEach(dep => {
    for (const sub of dep.values) {
      // TODO: this would not check all possibilities, to do so, we should "validate" the
      // generated value against every schema... however, I don't want to include a validator...
      if (utils.hasValue(sub.properties[dep.prop], result.value[dep.prop])) {
        Object.keys(sub.properties).forEach(next => {
          if (next !== dep.prop) {
            utils.merge(result.value, traverseCallback(sub.properties, path.concat(['properties']), resolve, value).value);
          }
        });
        break;
      }
    }
  });

  return result;
}

export default objectType;
