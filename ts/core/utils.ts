/**
 * Returns true/false whether the object parameter has its own properties defined
 *
 * @param obj
 * @returns {boolean}
 */
function hasProperties(obj: Object, ...properties: string[]): boolean {
  return properties.filter(function(key: string): boolean {
    return typeof obj[key] !== 'undefined';
  }).length > 0;
}

// TODO refactor clone function
function clone(arr) {
  var out = [];
  arr.forEach(function(item, index) {
    if (typeof item === 'object' && item !== null) {
      out[index] = Array.isArray(item) ? clone(item) : merge({}, item);
    } else {
      out[index] = item;
    }
  });
  return out;
}

// TODO refactor merge function
function merge(a, b) {
  for (var key in b) {
    if (typeof b[key] !== 'object' || b[key] === null) {
      a[key] = b[key];
    } else if (Array.isArray(b[key])) {
      a[key] = (a[key] || []).concat(clone(b[key]));
    } else if (typeof a[key] !== 'object' || a[key] === null || Array.isArray(a[key])) {
      a[key] = merge({}, b[key]);
    } else {
      a[key] = merge(a[key], b[key]);
    }
  }
  return a;
}

function getSubAttribute(obj: any, dotSeparatedKey: string): any {
  var keyElements = dotSeparatedKey.split('.');

  while (keyElements.length) {
    var prop = keyElements.shift();

    if (!obj[prop]) {
      break;
    }

    obj = obj[prop];
  }
  return obj;
}

export = {
  getSubAttribute: getSubAttribute,
  hasProperties: hasProperties,
  clone: clone,
  merge: merge
};
