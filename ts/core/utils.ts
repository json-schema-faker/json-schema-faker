function getSubAttribute(obj: any, dotSeparatedKey: string): any {
  var keyElements: string[] = dotSeparatedKey.split('.');

  while (keyElements.length) {
    var prop = keyElements.shift();

    if (!obj[prop]) {
      break;
    }

    obj = obj[prop];
  }
  return obj;
}

/**
 * Returns true/false whether the object parameter has its own properties defined
 *
 * @param obj
 * @param properties
 * @returns {boolean}
 */
function hasProperties(obj: Object, ...properties: string[]): boolean {
  return properties.filter(function(key: string): boolean {
    return typeof obj[key] !== 'undefined';
  }).length > 0;
}

/**
 * Returns typecasted value.
 * External generators (faker, chance) may return data in non-expected formats, such as string, when you might expect an
 * integer. This function is used to force the typecast.
 *
 * @param value
 * @param targetType
 * @returns {any}
 */
function typecast(value: any, targetType: ISchemaInternalType): any {
  switch (targetType) {
    case 'integer':
      return parseInt(value, 10);
    case 'number':
      return parseFloat(value);
    case 'string':
      return '' + value;
    case 'boolean':
      return !!value;
    default:
      return value;
  }
}

function clone(arr: any[]): any[] {
  var out: any[] = [];
  arr.forEach(function(item: any, index: number) {
    if (typeof item === 'object' && item !== null) {
      out[index] = Array.isArray(item) ? clone(item) : merge({}, item);
    } else {
      out[index] = item;
    }
  });
  return out;
}

// TODO refactor merge function
function merge(a: Object, b: Object): Object {
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

export = {
  getSubAttribute: getSubAttribute,
  hasProperties: hasProperties,
  typecast: typecast,
  clone: clone,
  merge: merge
};
