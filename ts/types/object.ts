import random from '../core/random';
import words from '../generators/words';
import utils from '../core/utils';
import optionAPI from '../api/option';
import ParseError from '../core/error';

// fallback generator
var anyType = { type: ['string', 'number', 'integer', 'boolean'] };

// TODO provide types
var objectType: FTypeGenerator = function objectType(value: IObjectSchema, path, resolve, traverseCallback: Function): Object {
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


    var min = Math.max(value.minProperties || 0, requiredProperties.length);
    var max = Math.max(value.maxProperties || random.number(min, min + 5));

    random.shuffle(patternPropertyKeys).forEach(function(_key) {
        if (requiredProperties.indexOf(_key) === -1) {
            requiredProperties.push(_key);
        }
    });

    var fakeOptionals = optionAPI('alwaysFakeOptionals');

    // properties are read from right-to-left
    var _props = fakeOptionals ? propertyKeys
      : (requiredProperties.length
          ? requiredProperties
          : propertyKeys
        ).slice(0, random.number(min, max));

    var extra = random.number(0, propertyKeys.length);

    while (!fakeOptionals && extra < requiredProperties) {
        var key = random.pick(propertyKeys);

        if (_props.indexOf(key) === -1) {
            _props.push(key);
        }

        extra -= 1;
    }

    // reorder
    _props.sort((a, b) =>
      propertyKeys.indexOf(a) - propertyKeys.indexOf(b));

    var missing = [];

    _props.forEach(function(key) {
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
