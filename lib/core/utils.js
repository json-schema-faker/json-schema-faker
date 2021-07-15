const optionAPI = require("../api/option");
const env = require("./constants");
const random = require("./random");
function getLocalRef(obj, path, refs) {
  const keyElements = path.replace("#/", "/").split("/");
  let schema = obj.$ref && refs ? refs[obj.$ref] : obj;
  if (refs && path.includes("#/") && refs[keyElements[0]]) {
    schema = refs[keyElements.shift()];
  }
  if (!keyElements[0])
    keyElements.shift();
  while (schema && keyElements.length > 0) {
    const prop = keyElements.shift();
    if (!schema[prop]) {
      throw new Error(`Prop not found: ${prop} (${path})`);
    }
    schema = schema[prop];
  }
  return schema;
}
function hasProperties(obj, ...properties) {
  return properties.filter((key) => {
    return typeof obj[key] !== "undefined";
  }).length > 0;
}
function clampDate(value) {
  if (value.includes(" ")) {
    return new Date(value).toISOString().substr(0, 10);
  }
  let [year, month, day] = value.split("T")[0].split("-");
  month = Math.max(1, Math.min(12, month));
  day = Math.max(1, Math.min(31, day));
  return `${year}-${month}-${day}`;
}
function typecast(type, schema, callback) {
  const params = {};
  switch (type || schema.type) {
    case "integer":
    case "number":
      if (typeof schema.minimum !== "undefined") {
        params.minimum = schema.minimum;
      }
      if (typeof schema.maximum !== "undefined") {
        params.maximum = schema.maximum;
      }
      if (schema.enum) {
        let min = Math.max(params.minimum || 0, 0);
        let max = Math.min(params.maximum || Infinity, Infinity);
        if (schema.exclusiveMinimum && min === schema.minimum) {
          min += schema.multipleOf || 1;
        }
        if (schema.exclusiveMaximum && max === schema.maximum) {
          max -= schema.multipleOf || 1;
        }
        if (min || max !== Infinity) {
          schema.enum = schema.enum.filter((x) => {
            if (x >= min && x <= max) {
              return true;
            }
            return false;
          });
        }
      }
      break;
    case "string": {
      params.minLength = optionAPI("minLength") || 0;
      params.maxLength = optionAPI("maxLength") || Number.MAX_SAFE_INTEGER;
      if (typeof schema.minLength !== "undefined") {
        params.minLength = Math.max(params.minLength, schema.minLength);
      }
      if (typeof schema.maxLength !== "undefined") {
        params.maxLength = Math.min(params.maxLength, schema.maxLength);
      }
      break;
    }
    default:
      break;
  }
  let value = callback(params);
  if (value === null || value === void 0) {
    return null;
  }
  switch (type || schema.type) {
    case "number":
      value = parseFloat(value);
      break;
    case "integer":
      value = parseInt(value, 10);
      break;
    case "boolean":
      value = !!value;
      break;
    case "string": {
      value = String(value);
      const min = Math.max(params.minLength || 0, 0);
      const max = Math.min(params.maxLength || Infinity, Infinity);
      let prev;
      let noChangeCount = 0;
      while (value.length < min) {
        prev = value;
        if (!schema.pattern) {
          value += `${random.pick([" ", "/", "_", "-", "+", "=", "@", "^"])}${value}`;
        } else {
          value += random.randexp(schema.pattern);
        }
        if (value === prev) {
          noChangeCount += 1;
          if (noChangeCount === 3) {
            break;
          }
        } else {
          noChangeCount = 0;
        }
      }
      if (value.length > max) {
        value = value.substr(0, max);
      }
      switch (schema.format) {
        case "date-time":
        case "datetime":
          value = new Date(clampDate(value)).toISOString().replace(/([0-9])0+Z$/, "$1Z");
          break;
        case "full-date":
        case "date":
          value = new Date(clampDate(value)).toISOString().substr(0, 10);
          break;
        case "time":
          value = new Date(`1969-01-01 ${value}`).toISOString().substr(11);
          break;
        default:
          break;
      }
      break;
    }
    default:
      break;
  }
  return value;
}
function merge(a, b) {
  Object.keys(b).forEach((key) => {
    if (typeof b[key] !== "object" || b[key] === null) {
      a[key] = b[key];
    } else if (Array.isArray(b[key])) {
      a[key] = a[key] || [];
      b[key].forEach((value) => {
        if (Array.isArray(a[key]) && a[key].indexOf(value) === -1) {
          a[key].push(value);
        }
      });
    } else if (typeof a[key] !== "object" || a[key] === null || Array.isArray(a[key])) {
      a[key] = merge({}, b[key]);
    } else {
      a[key] = merge(a[key], b[key]);
    }
  });
  return a;
}
function clone(obj, cache = new Map()) {
  if (!obj || typeof obj !== "object") {
    return obj;
  }
  if (cache.has(obj)) {
    return cache.get(obj);
  }
  if (Array.isArray(obj)) {
    const arr = [];
    cache.set(obj, arr);
    arr.push(...obj.map((x) => clone(x, cache)));
    return arr;
  }
  const clonedObj = {};
  cache.set(obj, clonedObj);
  return Object.keys(obj).reduce((prev, cur) => {
    prev[cur] = clone(obj[cur], cache);
    return prev;
  }, clonedObj);
}
function short(schema) {
  const s = JSON.stringify(schema);
  const l = JSON.stringify(schema, null, 2);
  return s.length > 400 ? `${l.substr(0, 400)}...` : l;
}
function anyValue() {
  return random.pick([
    false,
    true,
    null,
    -1,
    NaN,
    Math.PI,
    Infinity,
    void 0,
    [],
    {},
    Math.random(),
    Math.random().toString(36).substr(2)
  ]);
}
function notValue(schema, parent) {
  const copy = merge({}, parent);
  if (typeof schema.minimum !== "undefined") {
    copy.maximum = schema.minimum;
    copy.exclusiveMaximum = true;
  }
  if (typeof schema.maximum !== "undefined") {
    copy.minimum = schema.maximum > copy.maximum ? 0 : schema.maximum;
    copy.exclusiveMinimum = true;
  }
  if (typeof schema.minLength !== "undefined") {
    copy.maxLength = schema.minLength;
  }
  if (typeof schema.maxLength !== "undefined") {
    copy.minLength = schema.maxLength > copy.maxLength ? 0 : schema.maxLength;
  }
  if (schema.type) {
    copy.type = random.pick(env.SCALAR_TYPES.filter((x) => {
      const types = Array.isArray(schema.type) ? schema.type : [schema.type];
      return types.every((type) => {
        if (x === "number" || x === "integer") {
          return type !== "number" && type !== "integer";
        }
        return x !== type;
      });
    }));
  } else if (schema.enum) {
    let value;
    do {
      value = anyValue();
    } while (schema.enum.indexOf(value) !== -1);
    copy.enum = [value];
  }
  if (schema.required && copy.properties) {
    schema.required.forEach((prop) => {
      delete copy.properties[prop];
    });
  }
  return copy;
}
function validateValueForSchema(value, schema) {
  const schemaHasMin = schema.minimum !== void 0;
  const schemaHasMax = schema.maximum !== void 0;
  return (schemaHasMin || schemaHasMax) && (!schemaHasMin || value >= schema.minimum) && (!schemaHasMax || value <= schema.maximum);
}
function validate(value, schemas) {
  return !schemas.every((schema) => validateValueForSchema(value, schema));
}
function validateValueForOneOf(value, oneOf) {
  const validCount = oneOf.reduce((count, schema) => count + (validateValueForSchema(value, schema) ? 1 : 0), 0);
  return validCount === 1;
}
function isKey(prop) {
  return ["enum", "const", "default", "examples", "required", "definitions", "items", "properties"].includes(prop);
}
function omitProps(obj, props) {
  return Object.keys(obj).filter((key) => !props.includes(key)).reduce((copy, k) => {
    if (Array.isArray(obj[k])) {
      copy[k] = obj[k].slice();
    } else {
      copy[k] = obj[k] instanceof Object ? merge({}, obj[k]) : obj[k];
    }
    return copy;
  }, {});
}
function template(value, schema) {
  if (Array.isArray(value)) {
    return value.map((x) => template(x, schema));
  }
  if (typeof value === "string") {
    value = value.replace(/#\{([\w.-]+)\}/g, (_, $1) => schema[$1]);
  }
  return value;
}
function isEmpty(value) {
  return Object.prototype.toString.call(value) === "[object Object]" && !Object.keys(value).length;
}
function shouldClean(key, schema) {
  const isRequired = Array.isArray(schema.required) && schema.required.includes(key);
  const wasCleaned = typeof schema.thunk === "function" || schema.additionalProperties && typeof schema.additionalProperties.thunk === "function";
  return !isRequired && !wasCleaned;
}
function clean(obj, schema, isArray = false) {
  if (!obj || typeof obj !== "object") {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map((value) => clean(value, schema, true)).filter((value) => typeof value !== "undefined");
  }
  Object.keys(obj).forEach((k) => {
    if (isEmpty(obj[k])) {
      if (shouldClean(k, schema)) {
        delete obj[k];
      }
    } else {
      const value = clean(obj[k], schema);
      if (!isEmpty(value)) {
        obj[k] = value;
      }
    }
    if (typeof obj[k] === "undefined") {
      delete obj[k];
    }
  });
  if (!Object.keys(obj).length && isArray) {
    return void 0;
  }
  return obj;
}
var utils_default = {
  hasProperties,
  getLocalRef,
  omitProps,
  typecast,
  merge,
  clone,
  short,
  notValue,
  anyValue,
  validate,
  validateValueForSchema,
  validateValueForOneOf,
  isKey,
  template,
  shouldClean,
  clean,
  isEmpty,
  clampDate
};
module.exports=utils_default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvY29yZS91dGlscy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgb3B0aW9uQVBJIGZyb20gJy4uL2FwaS9vcHRpb24nO1xuaW1wb3J0IGVudiBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgcmFuZG9tIGZyb20gJy4vcmFuZG9tJztcblxuZnVuY3Rpb24gZ2V0TG9jYWxSZWYob2JqLCBwYXRoLCByZWZzKSB7XG4gIGNvbnN0IGtleUVsZW1lbnRzID0gcGF0aC5yZXBsYWNlKCcjLycsICcvJykuc3BsaXQoJy8nKTtcblxuICBsZXQgc2NoZW1hID0gb2JqLiRyZWYgJiYgcmVmcyA/IHJlZnNbb2JqLiRyZWZdIDogb2JqO1xuICBpZiAocmVmcyAmJiBwYXRoLmluY2x1ZGVzKCcjLycpICYmIHJlZnNba2V5RWxlbWVudHNbMF1dKSB7XG4gICAgc2NoZW1hID0gcmVmc1trZXlFbGVtZW50cy5zaGlmdCgpXTtcbiAgfVxuXG4gIGlmICgha2V5RWxlbWVudHNbMF0pIGtleUVsZW1lbnRzLnNoaWZ0KCk7XG5cbiAgd2hpbGUgKHNjaGVtYSAmJiBrZXlFbGVtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgcHJvcCA9IGtleUVsZW1lbnRzLnNoaWZ0KCk7XG5cbiAgICBpZiAoIXNjaGVtYVtwcm9wXSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBQcm9wIG5vdCBmb3VuZDogJHtwcm9wfSAoJHtwYXRofSlgKTtcbiAgICB9XG5cbiAgICBzY2hlbWEgPSBzY2hlbWFbcHJvcF07XG4gIH1cbiAgcmV0dXJuIHNjaGVtYTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRydWUvZmFsc2Ugd2hldGhlciB0aGUgb2JqZWN0IHBhcmFtZXRlciBoYXMgaXRzIG93biBwcm9wZXJ0aWVzIGRlZmluZWRcbiAqXG4gKiBAcGFyYW0gb2JqXG4gKiBAcGFyYW0gcHJvcGVydGllc1xuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGhhc1Byb3BlcnRpZXMob2JqLCAuLi5wcm9wZXJ0aWVzKSB7XG4gIHJldHVybiBwcm9wZXJ0aWVzLmZpbHRlcihrZXkgPT4ge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqW2tleV0gIT09ICd1bmRlZmluZWQnO1xuICB9KS5sZW5ndGggPiAwO1xufVxuXG4vKipcbiAqIE5vcm1hbGl6ZSBnZW5lcmF0ZWQgZGF0ZSBZWVlZLU1NLUREIHRvIG5vdCBoYXZlXG4gKiBvdXQgb2YgcmFuZ2UgdmFsdWVzXG4gKlxuICogQHBhcmFtIHZhbHVlXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBjbGFtcERhdGUodmFsdWUpIHtcbiAgaWYgKHZhbHVlLmluY2x1ZGVzKCcgJykpIHtcbiAgICByZXR1cm4gbmV3IERhdGUodmFsdWUpLnRvSVNPU3RyaW5nKCkuc3Vic3RyKDAsIDEwKTtcbiAgfVxuXG4gIGxldCBbeWVhciwgbW9udGgsIGRheV0gPSB2YWx1ZS5zcGxpdCgnVCcpWzBdLnNwbGl0KCctJyk7XG5cbiAgbW9udGggPSBNYXRoLm1heCgxLCBNYXRoLm1pbigxMiwgbW9udGgpKTtcbiAgZGF5ID0gTWF0aC5tYXgoMSwgTWF0aC5taW4oMzEsIGRheSkpO1xuXG4gIHJldHVybiBgJHt5ZWFyfS0ke21vbnRofS0ke2RheX1gO1xufVxuXG4vKipcbiAqIFJldHVybnMgdHlwZWNhc3RlZCB2YWx1ZS5cbiAqIEV4dGVybmFsIGdlbmVyYXRvcnMgKGZha2VyLCBjaGFuY2UsIGNhc3VhbCkgbWF5IHJldHVybiBkYXRhIGluIG5vbi1leHBlY3RlZCBmb3JtYXRzLCBzdWNoIGFzIHN0cmluZywgd2hlbiB5b3UgbWlnaHQgZXhwZWN0IGFuXG4gKiBpbnRlZ2VyLiBUaGlzIGZ1bmN0aW9uIGlzIHVzZWQgdG8gZm9yY2UgdGhlIHR5cGVjYXN0LiBUaGlzIGlzIHRoZSBiYXNlIGZvcm1hdHRlciBmb3IgYWxsIHJlc3VsdCB2YWx1ZXMuXG4gKlxuICogQHBhcmFtIHR5cGVcbiAqIEBwYXJhbSBzY2hlbWFcbiAqIEBwYXJhbSBjYWxsYmFja1xuICogQHJldHVybnMge2FueX1cbiAqL1xuZnVuY3Rpb24gdHlwZWNhc3QodHlwZSwgc2NoZW1hLCBjYWxsYmFjaykge1xuICBjb25zdCBwYXJhbXMgPSB7fTtcblxuICAvLyBub3JtYWxpemUgY29uc3RyYWludHNcbiAgc3dpdGNoICh0eXBlIHx8IHNjaGVtYS50eXBlKSB7XG4gICAgY2FzZSAnaW50ZWdlcic6XG4gICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIGlmICh0eXBlb2Ygc2NoZW1hLm1pbmltdW0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHBhcmFtcy5taW5pbXVtID0gc2NoZW1hLm1pbmltdW07XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2Ygc2NoZW1hLm1heGltdW0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHBhcmFtcy5tYXhpbXVtID0gc2NoZW1hLm1heGltdW07XG4gICAgICB9XG5cbiAgICAgIGlmIChzY2hlbWEuZW51bSkge1xuICAgICAgICBsZXQgbWluID0gTWF0aC5tYXgocGFyYW1zLm1pbmltdW0gfHwgMCwgMCk7XG4gICAgICAgIGxldCBtYXggPSBNYXRoLm1pbihwYXJhbXMubWF4aW11bSB8fCBJbmZpbml0eSwgSW5maW5pdHkpO1xuXG4gICAgICAgIGlmIChzY2hlbWEuZXhjbHVzaXZlTWluaW11bSAmJiBtaW4gPT09IHNjaGVtYS5taW5pbXVtKSB7XG4gICAgICAgICAgbWluICs9IHNjaGVtYS5tdWx0aXBsZU9mIHx8IDE7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2NoZW1hLmV4Y2x1c2l2ZU1heGltdW0gJiYgbWF4ID09PSBzY2hlbWEubWF4aW11bSkge1xuICAgICAgICAgIG1heCAtPSBzY2hlbWEubXVsdGlwbGVPZiB8fCAxO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZGlzY2FyZCBvdXQtb2YtYm91bmRzIGVudW1lcmF0aW9uc1xuICAgICAgICBpZiAobWluIHx8IG1heCAhPT0gSW5maW5pdHkpIHtcbiAgICAgICAgICBzY2hlbWEuZW51bSA9IHNjaGVtYS5lbnVtLmZpbHRlcih4ID0+IHtcbiAgICAgICAgICAgIGlmICh4ID49IG1pbiAmJiB4IDw9IG1heCkge1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAnc3RyaW5nJzoge1xuICAgICAgcGFyYW1zLm1pbkxlbmd0aCA9IG9wdGlvbkFQSSgnbWluTGVuZ3RoJykgfHwgMDtcbiAgICAgIHBhcmFtcy5tYXhMZW5ndGggPSBvcHRpb25BUEkoJ21heExlbmd0aCcpIHx8IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSO1xuXG4gICAgICBpZiAodHlwZW9mIHNjaGVtYS5taW5MZW5ndGggIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHBhcmFtcy5taW5MZW5ndGggPSBNYXRoLm1heChwYXJhbXMubWluTGVuZ3RoLCBzY2hlbWEubWluTGVuZ3RoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBzY2hlbWEubWF4TGVuZ3RoICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBwYXJhbXMubWF4TGVuZ3RoID0gTWF0aC5taW4ocGFyYW1zLm1heExlbmd0aCwgc2NoZW1hLm1heExlbmd0aCk7XG4gICAgICB9XG5cbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGRlZmF1bHQ6IGJyZWFrO1xuICB9XG5cbiAgLy8gZXhlY3V0ZSBnZW5lcmF0b3JcbiAgbGV0IHZhbHVlID0gY2FsbGJhY2socGFyYW1zKTtcblxuICAvLyBhbGxvdyBudWxsIHZhbHVlcyB0byBiZSByZXR1cm5lZFxuICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLy8gbm9ybWFsaXplIG91dHB1dCB2YWx1ZVxuICBzd2l0Y2ggKHR5cGUgfHwgc2NoZW1hLnR5cGUpIHtcbiAgICBjYXNlICdudW1iZXInOlxuICAgICAgdmFsdWUgPSBwYXJzZUZsb2F0KHZhbHVlKTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAnaW50ZWdlcic6XG4gICAgICB2YWx1ZSA9IHBhcnNlSW50KHZhbHVlLCAxMCk7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgdmFsdWUgPSAhIXZhbHVlO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdzdHJpbmcnOiB7XG4gICAgICB2YWx1ZSA9IFN0cmluZyh2YWx1ZSk7XG5cbiAgICAgIGNvbnN0IG1pbiA9IE1hdGgubWF4KHBhcmFtcy5taW5MZW5ndGggfHwgMCwgMCk7XG4gICAgICBjb25zdCBtYXggPSBNYXRoLm1pbihwYXJhbXMubWF4TGVuZ3RoIHx8IEluZmluaXR5LCBJbmZpbml0eSk7XG5cbiAgICAgIGxldCBwcmV2O1xuICAgICAgbGV0IG5vQ2hhbmdlQ291bnQgPSAwO1xuXG4gICAgICB3aGlsZSAodmFsdWUubGVuZ3RoIDwgbWluKSB7XG4gICAgICAgIHByZXYgPSB2YWx1ZTtcblxuICAgICAgICBpZiAoIXNjaGVtYS5wYXR0ZXJuKSB7XG4gICAgICAgICAgdmFsdWUgKz0gYCR7cmFuZG9tLnBpY2soWycgJywgJy8nLCAnXycsICctJywgJysnLCAnPScsICdAJywgJ14nXSl9JHt2YWx1ZX1gO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhbHVlICs9IHJhbmRvbS5yYW5kZXhwKHNjaGVtYS5wYXR0ZXJuKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGF2b2lkIGluZmluaXRlLWxvb3BzIHdoaWxlIGZpbGxpbmcgc3RyaW5ncywgaWYgbm8gY2hhbmdlc1xuICAgICAgICAvLyBhcmUgbWFkZSB3ZSBqdXN0IGJyZWFrIHRoZSBsb29wLi4uIHNlZSAjNTQwXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gcHJldikge1xuICAgICAgICAgIG5vQ2hhbmdlQ291bnQgKz0gMTtcbiAgICAgICAgICBpZiAobm9DaGFuZ2VDb3VudCA9PT0gMykge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5vQ2hhbmdlQ291bnQgPSAwO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh2YWx1ZS5sZW5ndGggPiBtYXgpIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5zdWJzdHIoMCwgbWF4KTtcbiAgICAgIH1cblxuICAgICAgc3dpdGNoIChzY2hlbWEuZm9ybWF0KSB7XG4gICAgICAgIGNhc2UgJ2RhdGUtdGltZSc6XG4gICAgICAgIGNhc2UgJ2RhdGV0aW1lJzpcbiAgICAgICAgICB2YWx1ZSA9IG5ldyBEYXRlKGNsYW1wRGF0ZSh2YWx1ZSkpLnRvSVNPU3RyaW5nKCkucmVwbGFjZSgvKFswLTldKTArWiQvLCAnJDFaJyk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnZnVsbC1kYXRlJzpcbiAgICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICAgICAgdmFsdWUgPSBuZXcgRGF0ZShjbGFtcERhdGUodmFsdWUpKS50b0lTT1N0cmluZygpLnN1YnN0cigwLCAxMCk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAndGltZSc6XG4gICAgICAgICAgdmFsdWUgPSBuZXcgRGF0ZShgMTk2OS0wMS0wMSAke3ZhbHVlfWApLnRvSVNPU3RyaW5nKCkuc3Vic3RyKDExKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgZGVmYXVsdDogYnJlYWs7XG4gIH1cblxuICByZXR1cm4gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIG1lcmdlKGEsIGIpIHtcbiAgT2JqZWN0LmtleXMoYikuZm9yRWFjaChrZXkgPT4ge1xuICAgIGlmICh0eXBlb2YgYltrZXldICE9PSAnb2JqZWN0JyB8fCBiW2tleV0gPT09IG51bGwpIHtcbiAgICAgIGFba2V5XSA9IGJba2V5XTtcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoYltrZXldKSkge1xuICAgICAgYVtrZXldID0gYVtrZXldIHx8IFtdO1xuICAgICAgLy8gZml4ICMyOTIgLSBza2lwIGR1cGxpY2F0ZWQgdmFsdWVzIGZyb20gbWVyZ2Ugb2JqZWN0IChiKVxuICAgICAgYltrZXldLmZvckVhY2godmFsdWUgPT4ge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShhW2tleV0pICYmIGFba2V5XS5pbmRleE9mKHZhbHVlKSA9PT0gLTEpIHtcbiAgICAgICAgICBhW2tleV0ucHVzaCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGFba2V5XSAhPT0gJ29iamVjdCcgfHwgYVtrZXldID09PSBudWxsIHx8IEFycmF5LmlzQXJyYXkoYVtrZXldKSkge1xuICAgICAgYVtrZXldID0gbWVyZ2Uoe30sIGJba2V5XSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFba2V5XSA9IG1lcmdlKGFba2V5XSwgYltrZXldKTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBhO1xufVxuXG5mdW5jdGlvbiBjbG9uZShvYmosIGNhY2hlID0gbmV3IE1hcCgpKSB7XG4gIGlmICghb2JqIHx8IHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIGlmIChjYWNoZS5oYXMob2JqKSkge1xuICAgIHJldHVybiBjYWNoZS5nZXQob2JqKTtcbiAgfVxuXG4gIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICBjb25zdCBhcnIgPSBbXTtcbiAgICBjYWNoZS5zZXQob2JqLCBhcnIpO1xuXG4gICAgYXJyLnB1c2goLi4ub2JqLm1hcCh4ID0+IGNsb25lKHgsIGNhY2hlKSkpO1xuICAgIHJldHVybiBhcnI7XG4gIH1cblxuICBjb25zdCBjbG9uZWRPYmogPSB7fTtcbiAgY2FjaGUuc2V0KG9iaiwgY2xvbmVkT2JqKTtcblxuICByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5yZWR1Y2UoKHByZXYsIGN1cikgPT4ge1xuICAgIHByZXZbY3VyXSA9IGNsb25lKG9ialtjdXJdLCBjYWNoZSk7XG4gICAgcmV0dXJuIHByZXY7XG4gIH0sIGNsb25lZE9iaik7XG59XG5cbmZ1bmN0aW9uIHNob3J0KHNjaGVtYSkge1xuICBjb25zdCBzID0gSlNPTi5zdHJpbmdpZnkoc2NoZW1hKTtcbiAgY29uc3QgbCA9IEpTT04uc3RyaW5naWZ5KHNjaGVtYSwgbnVsbCwgMik7XG5cbiAgcmV0dXJuIHMubGVuZ3RoID4gNDAwID8gYCR7bC5zdWJzdHIoMCwgNDAwKX0uLi5gIDogbDtcbn1cblxuZnVuY3Rpb24gYW55VmFsdWUoKSB7XG4gIHJldHVybiByYW5kb20ucGljayhbXG4gICAgZmFsc2UsXG4gICAgdHJ1ZSxcbiAgICBudWxsLFxuICAgIC0xLFxuICAgIE5hTixcbiAgICBNYXRoLlBJLFxuICAgIEluZmluaXR5LFxuICAgIHVuZGVmaW5lZCxcbiAgICBbXSxcbiAgICB7fSxcbiAgICAvLyBGSVhNRTogdXNlIGJ1aWx0LWluIHJhbmRvbT9cbiAgICBNYXRoLnJhbmRvbSgpLFxuICAgIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cigyKSxcbiAgXSk7XG59XG5cbmZ1bmN0aW9uIG5vdFZhbHVlKHNjaGVtYSwgcGFyZW50KSB7XG4gIGNvbnN0IGNvcHkgPSBtZXJnZSh7fSwgcGFyZW50KTtcblxuICBpZiAodHlwZW9mIHNjaGVtYS5taW5pbXVtICE9PSAndW5kZWZpbmVkJykge1xuICAgIGNvcHkubWF4aW11bSA9IHNjaGVtYS5taW5pbXVtO1xuICAgIGNvcHkuZXhjbHVzaXZlTWF4aW11bSA9IHRydWU7XG4gIH1cblxuICBpZiAodHlwZW9mIHNjaGVtYS5tYXhpbXVtICE9PSAndW5kZWZpbmVkJykge1xuICAgIGNvcHkubWluaW11bSA9IHNjaGVtYS5tYXhpbXVtID4gY29weS5tYXhpbXVtID8gMCA6IHNjaGVtYS5tYXhpbXVtO1xuICAgIGNvcHkuZXhjbHVzaXZlTWluaW11bSA9IHRydWU7XG4gIH1cblxuICBpZiAodHlwZW9mIHNjaGVtYS5taW5MZW5ndGggIT09ICd1bmRlZmluZWQnKSB7XG4gICAgY29weS5tYXhMZW5ndGggPSBzY2hlbWEubWluTGVuZ3RoO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBzY2hlbWEubWF4TGVuZ3RoICE9PSAndW5kZWZpbmVkJykge1xuICAgIGNvcHkubWluTGVuZ3RoID0gc2NoZW1hLm1heExlbmd0aCA+IGNvcHkubWF4TGVuZ3RoID8gMCA6IHNjaGVtYS5tYXhMZW5ndGg7XG4gIH1cblxuICBpZiAoc2NoZW1hLnR5cGUpIHtcbiAgICBjb3B5LnR5cGUgPSByYW5kb20ucGljayhlbnYuU0NBTEFSX1RZUEVTLmZpbHRlcih4ID0+IHtcbiAgICAgIGNvbnN0IHR5cGVzID0gQXJyYXkuaXNBcnJheShzY2hlbWEudHlwZSkgPyBzY2hlbWEudHlwZSA6IFtzY2hlbWEudHlwZV07XG5cbiAgICAgIHJldHVybiB0eXBlcy5ldmVyeSh0eXBlID0+IHtcbiAgICAgICAgLy8gdHJlYXQgYm90aCB0eXBlcyBhcyBfc2ltaWxhciBlbm91Z2hfIHRvIGJlIHNraXBwZWQgZXF1YWxcbiAgICAgICAgaWYgKHggPT09ICdudW1iZXInIHx8IHggPT09ICdpbnRlZ2VyJykge1xuICAgICAgICAgIHJldHVybiB0eXBlICE9PSAnbnVtYmVyJyAmJiB0eXBlICE9PSAnaW50ZWdlcic7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4geCAhPT0gdHlwZTtcbiAgICAgIH0pO1xuICAgIH0pKTtcbiAgfSBlbHNlIGlmIChzY2hlbWEuZW51bSkge1xuICAgIGxldCB2YWx1ZTtcblxuICAgIGRvIHtcbiAgICAgIHZhbHVlID0gYW55VmFsdWUoKTtcbiAgICB9IHdoaWxlIChzY2hlbWEuZW51bS5pbmRleE9mKHZhbHVlKSAhPT0gLTEpO1xuXG4gICAgY29weS5lbnVtID0gW3ZhbHVlXTtcbiAgfVxuXG4gIGlmIChzY2hlbWEucmVxdWlyZWQgJiYgY29weS5wcm9wZXJ0aWVzKSB7XG4gICAgc2NoZW1hLnJlcXVpcmVkLmZvckVhY2gocHJvcCA9PiB7XG4gICAgICBkZWxldGUgY29weS5wcm9wZXJ0aWVzW3Byb3BdO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gVE9ETzogZXhwbG9yZSBtb3JlIHNjZW5hcmlvc1xuXG4gIHJldHVybiBjb3B5O1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZVZhbHVlRm9yU2NoZW1hKHZhbHVlLCBzY2hlbWEpIHtcbiAgY29uc3Qgc2NoZW1hSGFzTWluID0gc2NoZW1hLm1pbmltdW0gIT09IHVuZGVmaW5lZDtcbiAgY29uc3Qgc2NoZW1hSGFzTWF4ID0gc2NoZW1hLm1heGltdW0gIT09IHVuZGVmaW5lZDtcblxuICByZXR1cm4gKFxuICAgIChzY2hlbWFIYXNNaW4gfHwgc2NoZW1hSGFzTWF4KVxuICAgICYmICghc2NoZW1hSGFzTWluIHx8IHZhbHVlID49IHNjaGVtYS5taW5pbXVtKVxuICAgICYmICghc2NoZW1hSGFzTWF4IHx8IHZhbHVlIDw9IHNjaGVtYS5tYXhpbXVtKVxuICApO1xufVxuXG4vLyBGSVhNRTogZXZhbHVhdGUgbW9yZSBjb25zdHJhaW50cz9cbmZ1bmN0aW9uIHZhbGlkYXRlKHZhbHVlLCBzY2hlbWFzKSB7XG4gIHJldHVybiAhc2NoZW1hcy5ldmVyeShzY2hlbWEgPT4gdmFsaWRhdGVWYWx1ZUZvclNjaGVtYSh2YWx1ZSwgc2NoZW1hKSk7XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlVmFsdWVGb3JPbmVPZih2YWx1ZSwgb25lT2YpIHtcbiAgY29uc3QgdmFsaWRDb3VudCA9IG9uZU9mLnJlZHVjZSgoY291bnQsIHNjaGVtYSkgPT4gKGNvdW50ICsgKCh2YWxpZGF0ZVZhbHVlRm9yU2NoZW1hKHZhbHVlLCBzY2hlbWEpKSA/IDEgOiAwKSksIDApO1xuICByZXR1cm4gdmFsaWRDb3VudCA9PT0gMTtcbn1cblxuZnVuY3Rpb24gaXNLZXkocHJvcCkge1xuICByZXR1cm4gWydlbnVtJywgJ2NvbnN0JywgJ2RlZmF1bHQnLCAnZXhhbXBsZXMnLCAncmVxdWlyZWQnLCAnZGVmaW5pdGlvbnMnLCAnaXRlbXMnLCAncHJvcGVydGllcyddLmluY2x1ZGVzKHByb3ApO1xufVxuXG5mdW5jdGlvbiBvbWl0UHJvcHMob2JqLCBwcm9wcykge1xuICByZXR1cm4gT2JqZWN0LmtleXMob2JqKVxuICAgIC5maWx0ZXIoa2V5ID0+ICFwcm9wcy5pbmNsdWRlcyhrZXkpKVxuICAgIC5yZWR1Y2UoKGNvcHksIGspID0+IHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KG9ialtrXSkpIHtcbiAgICAgICAgY29weVtrXSA9IG9ialtrXS5zbGljZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29weVtrXSA9IG9ialtrXSBpbnN0YW5jZW9mIE9iamVjdFxuICAgICAgICAgID8gbWVyZ2Uoe30sIG9ialtrXSlcbiAgICAgICAgICA6IG9ialtrXTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvcHk7XG4gICAgfSwge30pO1xufVxuXG5mdW5jdGlvbiB0ZW1wbGF0ZSh2YWx1ZSwgc2NoZW1hKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgIHJldHVybiB2YWx1ZS5tYXAoeCA9PiB0ZW1wbGF0ZSh4LCBzY2hlbWEpKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC8jXFx7KFtcXHcuLV0rKVxcfS9nLCAoXywgJDEpID0+IHNjaGVtYVskMV0pO1xuICB9XG5cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBnaXZlbiBvYmplY3QgaXMgZW1wdHkgKGhhcyBubyBwcm9wZXJ0aWVzKVxuICpcbiAqIEBwYXJhbSB2YWx1ZVxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGlzRW1wdHkodmFsdWUpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09ICdbb2JqZWN0IE9iamVjdF0nICYmICFPYmplY3Qua2V5cyh2YWx1ZSkubGVuZ3RoO1xufVxuXG4vKipcbiAqIENoZWNrcyBnaXZlbiBrZXkgaXMgcmVxdWlyZWQgb3IgaWYgc291cmNlIG9iamVjdCB3YXMgY3JlYXRlZCBieSBhIHN1YnJvdXRpbmUgKGFscmVhZHkgY2xlYW5lZClcbiAqXG4gKiBAcGFyYW0ga2V5XG4gKiBAcGFyYW0gc2NoZW1hXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gc2hvdWxkQ2xlYW4oa2V5LCBzY2hlbWEpIHtcbiAgY29uc3QgaXNSZXF1aXJlZCA9IEFycmF5LmlzQXJyYXkoc2NoZW1hLnJlcXVpcmVkKSAmJiBzY2hlbWEucmVxdWlyZWQuaW5jbHVkZXMoa2V5KTtcbiAgY29uc3Qgd2FzQ2xlYW5lZCA9IHR5cGVvZiBzY2hlbWEudGh1bmsgPT09ICdmdW5jdGlvbicgfHwgKHNjaGVtYS5hZGRpdGlvbmFsUHJvcGVydGllcyAmJiB0eXBlb2Ygc2NoZW1hLmFkZGl0aW9uYWxQcm9wZXJ0aWVzLnRodW5rID09PSAnZnVuY3Rpb24nKTtcblxuICByZXR1cm4gIWlzUmVxdWlyZWQgJiYgIXdhc0NsZWFuZWQ7XG59XG5cbi8qKlxuICogQ2xlYW5zIHVwIHRoZSBzb3VyY2Ugb2JqZWN0IHJlbW92aW5nIGVtcHR5IG9iamVjdHMgYW5kIHVuZGVmaW5lZCB2YWx1ZXNcbiAqIFdpbGwgbm90IHJlbW92ZSB2YWx1ZXMgd2hpY2ggYXJlIHNwZWNpZmllZCBhcyBgcmVxdWlyZWRgXG4gKlxuICogQHBhcmFtIG9ialxuICogQHBhcmFtIHNjaGVtYVxuICogQHBhcmFtIGlzQXJyYXlcbiAqIEByZXR1cm5zIHthbnl9XG4gKi9cbmZ1bmN0aW9uIGNsZWFuKG9iaiwgc2NoZW1hLCBpc0FycmF5ID0gZmFsc2UpIHtcbiAgaWYgKCFvYmogfHwgdHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgIHJldHVybiBvYmpcbiAgICAgIC5tYXAodmFsdWUgPT4gY2xlYW4odmFsdWUsIHNjaGVtYSwgdHJ1ZSkpXG4gICAgICAuZmlsdGVyKHZhbHVlID0+IHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCcpO1xuICB9XG5cbiAgT2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKGsgPT4ge1xuICAgIGlmIChpc0VtcHR5KG9ialtrXSkpIHtcbiAgICAgIGlmIChzaG91bGRDbGVhbihrLCBzY2hlbWEpKSB7XG4gICAgICAgIGRlbGV0ZSBvYmpba107XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gY2xlYW4ob2JqW2tdLCBzY2hlbWEpO1xuXG4gICAgICBpZiAoIWlzRW1wdHkodmFsdWUpKSB7XG4gICAgICAgIG9ialtrXSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodHlwZW9mIG9ialtrXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGRlbGV0ZSBvYmpba107XG4gICAgfVxuICB9KTtcblxuICBpZiAoIU9iamVjdC5rZXlzKG9iaikubGVuZ3RoICYmIGlzQXJyYXkpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBoYXNQcm9wZXJ0aWVzLFxuICBnZXRMb2NhbFJlZixcbiAgb21pdFByb3BzLFxuICB0eXBlY2FzdCxcbiAgbWVyZ2UsXG4gIGNsb25lLFxuICBzaG9ydCxcbiAgbm90VmFsdWUsXG4gIGFueVZhbHVlLFxuICB2YWxpZGF0ZSxcbiAgdmFsaWRhdGVWYWx1ZUZvclNjaGVtYSxcbiAgdmFsaWRhdGVWYWx1ZUZvck9uZU9mLFxuICBpc0tleSxcbiAgdGVtcGxhdGUsXG4gIHNob3Vs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
