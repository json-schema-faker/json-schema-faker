import random from '../core/random';
import words from '../generators/words';
import utils from '../core/utils';
import optionAPI from '../api/option';
import ParseError from '../core/error';

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
    var optionalProperties = propertyKeys.concat(patternPropertyKeys).reduce(function(_response, _key) {
        if (requiredProperties.indexOf(_key) === -1) _response.push(_key);
        return _response;
    }, []);
    var allProperties = requiredProperties.concat(optionalProperties);

    var additionalProperties = allowsAdditional
      ? (value.additionalProperties === true ? {} : value.additionalProperties)
      : null;

    if (
        !allowsAdditional &&
        propertyKeys.length === 0 &&
        patternPropertyKeys.length === 0 &&
        utils.hasProperties(value, 'minProperties', 'maxProperties', 'dependencies', 'required')
    ) {
        // just nothing
        return {};
    }

    if (optionAPI('requiredOnly') === true) {
        requiredProperties.forEach(function(key) {
            if (properties[key]) {
                props[key] = properties[key];
            }
        });

        return traverseCallback(props, path.concat(['properties']), resolve);
    }

    var optionalsProbability = optionAPI('alwaysFakeOptionals') === true ? 1.0 : optionAPI('optionalsProbability');
    var ignoreProperties = optionAPI('ignoreProperties') || [];

    var min = Math.max(value.minProperties || 0, requiredProperties.length);
    var max = Math.max(value.maxProperties || allProperties.length);

    var neededExtras = Math.round((min - requiredProperties.length) + optionalsProbability * (max - min));
    var extraPropertiesRandomOrder = random.shuffle(optionalProperties).slice(0, neededExtras);
    var extraProperties = optionalProperties.filter(function(_item) {
        return extraPropertiesRandomOrder.indexOf(_item) !== -1;
    });

    // properties are read from right-to-left
    var _props = requiredProperties.concat(extraProperties).slice(0, max);

    var skipped = [];
    var missing = [];

    _props.forEach(function(key) {
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
            var found;

            // then try patternProperties
            patternPropertyKeys.forEach(function (_key) {
                if (key.match(new RegExp(_key))) {
                    found = true;
                    props[random.randexp(key)] = patternProperties[_key];
                }
            });

            if (!found) {
                // try patternProperties again,
                var subschema = patternProperties[key] || additionalProperties;

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

    var fillProps = optionAPI('fillProperties');
    var reuseProps = optionAPI('reuseProperties');

    // discard already ignored props if they're not required to be filled...
    var current = Object.keys(props).length + (fillProps ? 0 : skipped.length);

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

                    var key = random.pick(propertyKeys);
                } while (typeof props[key] !== 'undefined');

                if (typeof props[key] === 'undefined') {
                    props[key] = properties[key];
                    current += 1;
                }
            } else {
                var word = words(1) + random.randexp('[a-f\\d]{1,3}');

                if (!props[word]) {
                    props[word] = additionalProperties || anyType;
                    current += 1;
                }
            }
        }

        patternPropertyKeys.forEach(function (_key) {
            var word = random.randexp(_key);

            if (!props[word]) {
                props[word] = patternProperties[_key];
                current += 1;
            }
        });
    }

    if (!allowsAdditional && current < min) {
        if (missing.length) {
            throw new ParseError(
                'properties "' + missing.join(', ') + '" were not found while additionalProperties is false:\n' +
                utils.short(value),
                path
            );
        }

        throw new ParseError(
            'properties constraints were too strong to successfully generate a valid object for:\n' +
            utils.short(value),
            path
        );
    }

  return traverseCallback(props, path.concat(['properties']), resolve);
};

export default objectType;
