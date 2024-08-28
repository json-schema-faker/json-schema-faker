import random from '../core/random.mjs';
import utils from '../core/utils.mjs';
import ParseError from '../core/error.mjs';
import optionAPI from '../api/option.mjs';

// TODO provide types
function unique(path, items, value, sample, resolve, traverseCallback) {
  const tmp = [];
  const seen = [];

  function walk(obj) {
    const json = JSON.stringify(obj.value);

    if (seen.indexOf(json) === -1) {
      seen.push(json);
      tmp.push(obj);

      return true;
    }

    return false;
  }

  items.forEach(walk);

  // TODO: find a better solution?
  let limit = 100;

  while (tmp.length !== items.length) {
    if (!walk(traverseCallback(value.items || sample, path, resolve))) {
      limit -= 1;
    }

    if (!limit) {
      break;
    }
  }

  return tmp;
}

// TODO provide types
function arrayType(value, path, resolve, traverseCallback) {
  const items = [];

  if (!(value.items || value.additionalItems)) {
    if (utils.hasProperties(value, 'minItems', 'maxItems', 'uniqueItems')) {
      if (value.minItems !== 0 || value.maxItems !== 0) {
        throw new ParseError(`missing items for ${utils.short(value)}`, path);
      }
    }
    return items;
  }

  if (Array.isArray(value.items)) {
    return value.items.map((item, key) => {
      const itemSubpath = path.concat(['items', key]);

      return traverseCallback(item, itemSubpath, resolve);
    });
  }

  let minItems = value.minItems;
  let maxItems = value.maxItems;

  const defaultMinItems = optionAPI('minItems');
  const defaultMaxItems = optionAPI('maxItems');

  if (defaultMinItems) {
    // fix boundaries
    minItems = typeof minItems === 'undefined'
      ? defaultMinItems
      : Math.min(defaultMinItems, minItems);
  }

  if (defaultMaxItems) {
    maxItems = typeof maxItems === 'undefined'
      ? defaultMaxItems
      : Math.min(defaultMaxItems, maxItems);

    // Don't allow user to set max items above our maximum
    if (maxItems && maxItems > defaultMaxItems) {
      maxItems = defaultMaxItems;
    }

    // Don't allow user to set min items above our maximum
    if (minItems && minItems > defaultMaxItems) {
      minItems = maxItems;
    }
  }

  const optionalsProbability = optionAPI('alwaysFakeOptionals') === true ? 1.0 : optionAPI('optionalsProbability');
  const fixedProbabilities = optionAPI('alwaysFakeOptionals') || optionAPI('fixedProbabilities') || false;

  let length = random.number(minItems, maxItems, 0, 5);

  if (optionalsProbability !== null) {
    length = Math.max(fixedProbabilities
      ? Math.round((maxItems || length) * optionalsProbability)
      : Math.abs(random.number(minItems, maxItems) * optionalsProbability), minItems || 0);
  }

  // TODO below looks bad. Should additionalItems be copied as-is?
  const sample = typeof value.additionalItems === 'object' ? value.additionalItems : {};

  for (let current = items.length; current < length; current += 1) {
    const itemSubpath = path.concat(['items', current]);
    const element = traverseCallback(value.items || sample, itemSubpath, resolve);

    items.push(element);
  }

  if (value.contains && length > 0) {
    const idx = random.number(0, length - 1);

    items[idx] = traverseCallback(value.contains, path.concat(['items', idx]), resolve);
  }

  if (value.uniqueItems) {
    return unique(path.concat(['items']), items, value, sample, resolve, traverseCallback);
  }

  return items;
}

export default arrayType;
