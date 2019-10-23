import random from '../core/random';
import utils from '../core/utils';
import ParseError from '../core/error';
import optionAPI from '../api/option';

// TODO provide types
function unique(path, items, value, sample, resolve, traverseCallback) {
  const tmp = [];
  const seen = [];

  function walk(obj) {
    const json = JSON.stringify(obj);

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
      throw new ParseError(`missing items for ${utils.short(value)}`, path);
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

  if (optionAPI('minItems')) {
    // fix boundaries
    minItems = !maxItems
      ? optionAPI('minItems')
      : Math.min(optionAPI('minItems'), maxItems);
  }

  if (optionAPI('maxItems')) {
    // Don't allow user to set max items above our maximum
    if (maxItems && maxItems > optionAPI('maxItems')) {
      maxItems = optionAPI('maxItems');
    }

    // Don't allow user to set min items above our maximum
    if (minItems && minItems > optionAPI('maxItems')) {
      minItems = maxItems;
    }
  }

  const optionalsProbability = optionAPI('alwaysFakeOptionals') === true ? 1.0 : optionAPI('optionalsProbability');
  const fixedProbabilities = optionAPI('alwaysFakeOptionals') || optionAPI('fixedProbabilities') || false;

  let length = random.number(minItems, maxItems, 1, 5);

  if (optionalsProbability !== false) {
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

  if (value.uniqueItems) {
    return unique(path.concat(['items']), items, value, sample, resolve, traverseCallback);
  }

  return items;
}

export default arrayType;
