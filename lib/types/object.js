const constants = require("../core/constants");
const random = require("../core/random");
const words = require("../generators/words");
const utils = require("../core/utils");
const optionAPI = require("../api/option");
const anyType = { type: constants.ALLOWED_TYPES };
function objectType(value, path, resolve, traverseCallback) {
  const props = {};
  const properties = value.properties || {};
  const patternProperties = value.patternProperties || {};
  const requiredProperties = typeof value.required === "boolean" ? [] : (value.required || []).slice();
  const allowsAdditional = value.additionalProperties !== false;
  const propertyKeys = Object.keys(properties);
  const patternPropertyKeys = Object.keys(patternProperties);
  const optionalProperties = propertyKeys.concat(patternPropertyKeys).reduce((_response, _key) => {
    if (requiredProperties.indexOf(_key) === -1)
      _response.push(_key);
    return _response;
  }, []);
  const allProperties = requiredProperties.concat(optionalProperties);
  const additionalProperties = allowsAdditional ? value.additionalProperties === true ? anyType : value.additionalProperties : value.additionalProperties;
  if (!allowsAdditional && propertyKeys.length === 0 && patternPropertyKeys.length === 0 && utils.hasProperties(value, "minProperties", "maxProperties", "dependencies", "required")) {
    return null;
  }
  if (optionAPI("requiredOnly") === true) {
    requiredProperties.forEach((key) => {
      if (properties[key]) {
        props[key] = properties[key];
      }
    });
    return traverseCallback(props, path.concat(["properties"]), resolve, value);
  }
  const optionalsProbability = optionAPI("alwaysFakeOptionals") === true ? 1 : optionAPI("optionalsProbability");
  const fixedProbabilities = optionAPI("alwaysFakeOptionals") || optionAPI("fixedProbabilities") || false;
  const ignoreProperties = optionAPI("ignoreProperties") || [];
  const reuseProps = optionAPI("reuseProperties");
  const fillProps = optionAPI("fillProperties");
  const max = value.maxProperties || allProperties.length + (allowsAdditional ? random.number(1, 5) : 0);
  let min = Math.max(value.minProperties || 0, requiredProperties.length);
  let neededExtras = Math.max(0, allProperties.length - min);
  if (allProperties.length === 1 && !requiredProperties.length) {
    min = Math.max(random.number(fillProps ? 1 : 0, max), min);
  }
  if (optionalsProbability !== null) {
    if (fixedProbabilities === true) {
      neededExtras = Math.round(min - requiredProperties.length + optionalsProbability * (allProperties.length - min));
    } else {
      neededExtras = random.number(min - requiredProperties.length, optionalsProbability * (allProperties.length - min));
    }
  }
  const extraPropertiesRandomOrder = random.shuffle(optionalProperties).slice(0, neededExtras);
  const extraProperties = optionalProperties.filter((_item) => {
    return extraPropertiesRandomOrder.indexOf(_item) !== -1;
  });
  const _limit = optionalsProbability !== null || requiredProperties.length === max ? max : random.number(0, max);
  const _props = requiredProperties.concat(random.shuffle(extraProperties).slice(0, _limit)).slice(0, max);
  const _defns = [];
  if (value.dependencies) {
    Object.keys(value.dependencies).forEach((prop) => {
      const _required = value.dependencies[prop];
      if (_props.indexOf(prop) !== -1) {
        if (Array.isArray(_required)) {
          _required.forEach((sub) => {
            if (_props.indexOf(sub) === -1) {
              _props.push(sub);
            }
          });
        } else {
          _defns.push(_required);
        }
      }
    });
    if (_defns.length) {
      delete value.dependencies;
      return traverseCallback({
        allOf: _defns.concat(value)
      }, path.concat(["properties"]), resolve, value);
    }
  }
  const skipped = [];
  const missing = [];
  _props.forEach((key) => {
    for (let i = 0; i < ignoreProperties.length; i += 1) {
      if (ignoreProperties[i] instanceof RegExp && ignoreProperties[i].test(key) || typeof ignoreProperties[i] === "string" && ignoreProperties[i] === key || typeof ignoreProperties[i] === "function" && ignoreProperties[i](properties[key], key)) {
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
    patternPropertyKeys.forEach((_key) => {
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
      const subschema = patternProperties[key] || additionalProperties;
      if (subschema && additionalProperties !== false) {
        props[patternProperties[key] ? random.randexp(key) : key] = properties[key] || subschema;
      } else {
        missing.push(key);
      }
    }
  });
  let current = Object.keys(props).length + (fillProps ? 0 : skipped.length);
  const hash = (suffix) => random.randexp(`_?[_a-f\\d]{1,3}${suffix ? "\\$?" : ""}`);
  function get(from) {
    let one;
    do {
      if (!from.length)
        break;
      one = from.shift();
    } while (props[one]);
    return one;
  }
  let minProps = min;
  if (allowsAdditional && !requiredProperties.length) {
    minProps = Math.max(optionalsProbability === null || additionalProperties ? random.number(fillProps ? 1 : 0, max) : 0, min);
  }
  while (fillProps) {
    if (!(patternPropertyKeys.length || allowsAdditional)) {
      break;
    }
    if (current >= minProps) {
      break;
    }
    if (allowsAdditional) {
      if (reuseProps && propertyKeys.length - current > minProps) {
        let count = 0;
        let key;
        do {
          count += 1;
          if (count > 1e3) {
            break;
          }
          key = get(requiredProperties) || random.pick(propertyKeys);
        } while (typeof props[key] !== "undefined");
        if (typeof props[key] === "undefined") {
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
        const word = get(requiredProperties) || words(1) + hash();
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
  if (requiredProperties.length === 0 && (!allowsAdditional || optionalsProbability === false)) {
    const maximum = random.number(min, max);
    for (; current < maximum; ) {
      const word = get(propertyKeys);
      if (word) {
        props[word] = properties[word];
      }
      current += 1;
    }
  }
  return traverseCallback(props, path.concat(["properties"]), resolve, value);
}
var object_default = objectType;
module.exports=object_default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvdHlwZXMvb2JqZWN0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjb25zdGFudHMgZnJvbSAnLi4vY29yZS9jb25zdGFudHMnO1xuaW1wb3J0IHJhbmRvbSBmcm9tICcuLi9jb3JlL3JhbmRvbSc7XG5pbXBvcnQgd29yZHMgZnJvbSAnLi4vZ2VuZXJhdG9ycy93b3Jkcyc7XG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vY29yZS91dGlscyc7XG5pbXBvcnQgb3B0aW9uQVBJIGZyb20gJy4uL2FwaS9vcHRpb24nO1xuXG4vLyBmYWxsYmFjayBnZW5lcmF0b3JcbmNvbnN0IGFueVR5cGUgPSB7IHR5cGU6IGNvbnN0YW50cy5BTExPV0VEX1RZUEVTIH07XG5cbi8vIFRPRE8gcHJvdmlkZSB0eXBlc1xuZnVuY3Rpb24gb2JqZWN0VHlwZSh2YWx1ZSwgcGF0aCwgcmVzb2x2ZSwgdHJhdmVyc2VDYWxsYmFjaykge1xuICBjb25zdCBwcm9wcyA9IHt9O1xuXG4gIGNvbnN0IHByb3BlcnRpZXMgPSB2YWx1ZS5wcm9wZXJ0aWVzIHx8IHt9O1xuICBjb25zdCBwYXR0ZXJuUHJvcGVydGllcyA9IHZhbHVlLnBhdHRlcm5Qcm9wZXJ0aWVzIHx8IHt9O1xuICBjb25zdCByZXF1aXJlZFByb3BlcnRpZXMgPSB0eXBlb2YgdmFsdWUucmVxdWlyZWQgPT09ICdib29sZWFuJyA/IFtdIDogKHZhbHVlLnJlcXVpcmVkIHx8IFtdKS5zbGljZSgpO1xuICBjb25zdCBhbGxvd3NBZGRpdGlvbmFsID0gdmFsdWUuYWRkaXRpb25hbFByb3BlcnRpZXMgIT09IGZhbHNlO1xuXG4gIGNvbnN0IHByb3BlcnR5S2V5cyA9IE9iamVjdC5rZXlzKHByb3BlcnRpZXMpO1xuICBjb25zdCBwYXR0ZXJuUHJvcGVydHlLZXlzID0gT2JqZWN0LmtleXMocGF0dGVyblByb3BlcnRpZXMpO1xuICBjb25zdCBvcHRpb25hbFByb3BlcnRpZXMgPSBwcm9wZXJ0eUtleXMuY29uY2F0KHBhdHRlcm5Qcm9wZXJ0eUtleXMpLnJlZHVjZSgoX3Jlc3BvbnNlLCBfa2V5KSA9PiB7XG4gICAgaWYgKHJlcXVpcmVkUHJvcGVydGllcy5pbmRleE9mKF9rZXkpID09PSAtMSkgX3Jlc3BvbnNlLnB1c2goX2tleSk7XG4gICAgcmV0dXJuIF9yZXNwb25zZTtcbiAgfSwgW10pO1xuICBjb25zdCBhbGxQcm9wZXJ0aWVzID0gcmVxdWlyZWRQcm9wZXJ0aWVzLmNvbmNhdChvcHRpb25hbFByb3BlcnRpZXMpO1xuXG4gIGNvbnN0IGFkZGl0aW9uYWxQcm9wZXJ0aWVzID0gYWxsb3dzQWRkaXRpb25hbCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgPyAodmFsdWUuYWRkaXRpb25hbFByb3BlcnRpZXMgPT09IHRydWUgPyBhbnlUeXBlIDogdmFsdWUuYWRkaXRpb25hbFByb3BlcnRpZXMpXG4gICAgOiB2YWx1ZS5hZGRpdGlvbmFsUHJvcGVydGllcztcblxuICBpZiAoIWFsbG93c0FkZGl0aW9uYWxcbiAgICAmJiBwcm9wZXJ0eUtleXMubGVuZ3RoID09PSAwXG4gICAgJiYgcGF0dGVyblByb3BlcnR5S2V5cy5sZW5ndGggPT09IDBcbiAgICAmJiB1dGlscy5oYXNQcm9wZXJ0aWVzKHZhbHVlLCAnbWluUHJvcGVydGllcycsICdtYXhQcm9wZXJ0aWVzJywgJ2RlcGVuZGVuY2llcycsICdyZXF1aXJlZCcpXG4gICkge1xuICAgIC8vIGp1c3Qgbm90aGluZ1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgaWYgKG9wdGlvbkFQSSgncmVxdWlyZWRPbmx5JykgPT09IHRydWUpIHtcbiAgICByZXF1aXJlZFByb3BlcnRpZXMuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgaWYgKHByb3BlcnRpZXNba2V5XSkge1xuICAgICAgICBwcm9wc1trZXldID0gcHJvcGVydGllc1trZXldO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRyYXZlcnNlQ2FsbGJhY2socHJvcHMsIHBhdGguY29uY2F0KFsncHJvcGVydGllcyddKSwgcmVzb2x2ZSwgdmFsdWUpO1xuICB9XG5cbiAgY29uc3Qgb3B0aW9uYWxzUHJvYmFiaWxpdHkgPSBvcHRpb25BUEkoJ2Fsd2F5c0Zha2VPcHRpb25hbHMnKSA9PT0gdHJ1ZSA/IDEuMCA6IG9wdGlvbkFQSSgnb3B0aW9uYWxzUHJvYmFiaWxpdHknKTtcbiAgY29uc3QgZml4ZWRQcm9iYWJpbGl0aWVzID0gb3B0aW9uQVBJKCdhbHdheXNGYWtlT3B0aW9uYWxzJykgfHwgb3B0aW9uQVBJKCdmaXhlZFByb2JhYmlsaXRpZXMnKSB8fCBmYWxzZTtcbiAgY29uc3QgaWdub3JlUHJvcGVydGllcyA9IG9wdGlvbkFQSSgnaWdub3JlUHJvcGVydGllcycpIHx8IFtdO1xuICBjb25zdCByZXVzZVByb3BzID0gb3B0aW9uQVBJKCdyZXVzZVByb3BlcnRpZXMnKTtcbiAgY29uc3QgZmlsbFByb3BzID0gb3B0aW9uQVBJKCdmaWxsUHJvcGVydGllcycpO1xuXG4gIGNvbnN0IG1heCA9IHZhbHVlLm1heFByb3BlcnRpZXMgfHwgKGFsbFByb3BlcnRpZXMubGVuZ3RoICsgKGFsbG93c0FkZGl0aW9uYWwgPyByYW5kb20ubnVtYmVyKDEsIDUpIDogMCkpO1xuXG4gIGxldCBtaW4gPSBNYXRoLm1heCh2YWx1ZS5taW5Qcm9wZXJ0aWVzIHx8IDAsIHJlcXVpcmVkUHJvcGVydGllcy5sZW5ndGgpO1xuICBsZXQgbmVlZGVkRXh0cmFzID0gTWF0aC5tYXgoMCwgYWxsUHJvcGVydGllcy5sZW5ndGggLSBtaW4pO1xuXG4gIGlmIChhbGxQcm9wZXJ0aWVzLmxlbmd0aCA9PT0gMSAmJiAhcmVxdWlyZWRQcm9wZXJ0aWVzLmxlbmd0aCkge1xuICAgIG1pbiA9IE1hdGgubWF4KHJhbmRvbS5udW1iZXIoZmlsbFByb3BzID8gMSA6IDAsIG1heCksIG1pbik7XG4gIH1cblxuICBpZiAob3B0aW9uYWxzUHJvYmFiaWxpdHkgIT09IG51bGwpIHtcbiAgICBpZiAoZml4ZWRQcm9iYWJpbGl0aWVzID09PSB0cnVlKSB7XG4gICAgICBuZWVkZWRFeHRyYXMgPSBNYXRoLnJvdW5kKChtaW4gLSByZXF1aXJlZFByb3BlcnRpZXMubGVuZ3RoKSArIChvcHRpb25hbHNQcm9iYWJpbGl0eSAqIChhbGxQcm9wZXJ0aWVzLmxlbmd0aCAtIG1pbikpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmVlZGVkRXh0cmFzID0gcmFuZG9tLm51bWJlcihtaW4gLSByZXF1aXJlZFByb3BlcnRpZXMubGVuZ3RoLCBvcHRpb25hbHNQcm9iYWJpbGl0eSAqIChhbGxQcm9wZXJ0aWVzLmxlbmd0aCAtIG1pbikpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGV4dHJhUHJvcGVydGllc1JhbmRvbU9yZGVyID0gcmFuZG9tLnNodWZmbGUob3B0aW9uYWxQcm9wZXJ0aWVzKS5zbGljZSgwLCBuZWVkZWRFeHRyYXMpO1xuICBjb25zdCBleHRyYVByb3BlcnRpZXMgPSBvcHRpb25hbFByb3BlcnRpZXMuZmlsdGVyKF9pdGVtID0+IHtcbiAgICByZXR1cm4gZXh0cmFQcm9wZXJ0aWVzUmFuZG9tT3JkZXIuaW5kZXhPZihfaXRlbSkgIT09IC0xO1xuICB9KTtcblxuICAvLyBwcm9wZXJ0aWVzIGFyZSByZWFkIGZyb20gcmlnaHQtdG8tbGVmdFxuICBjb25zdCBfbGltaXQgPSBvcHRpb25hbHNQcm9iYWJpbGl0eSAhPT0gbnVsbCB8fCByZXF1aXJlZFByb3BlcnRpZXMubGVuZ3RoID09PSBtYXggPyBtYXggOiByYW5kb20ubnVtYmVyKDAsIG1heCk7XG4gIGNvbnN0IF9wcm9wcyA9IHJlcXVpcmVkUHJvcGVydGllcy5jb25jYXQocmFuZG9tLnNodWZmbGUoZXh0cmFQcm9wZXJ0aWVzKS5zbGljZSgwLCBfbGltaXQpKS5zbGljZSgwLCBtYXgpO1xuICBjb25zdCBfZGVmbnMgPSBbXTtcblxuICBpZiAodmFsdWUuZGVwZW5kZW5jaWVzKSB7XG4gICAgT2JqZWN0LmtleXModmFsdWUuZGVwZW5kZW5jaWVzKS5mb3JFYWNoKHByb3AgPT4ge1xuICAgICAgY29uc3QgX3JlcXVpcmVkID0gdmFsdWUuZGVwZW5kZW5jaWVzW3Byb3BdO1xuXG4gICAgICBpZiAoX3Byb3BzLmluZGV4T2YocHJvcCkgIT09IC0xKSB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KF9yZXF1aXJlZCkpIHtcbiAgICAgICAgICAvLyBwcm9wZXJ0eS1kZXBlbmRlbmNpZXNcbiAgICAgICAgICBfcmVxdWlyZWQuZm9yRWFjaChzdWIgPT4ge1xuICAgICAgICAgICAgaWYgKF9wcm9wcy5pbmRleE9mKHN1YikgPT09IC0xKSB7XG4gICAgICAgICAgICAgIF9wcm9wcy5wdXNoKHN1Yik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX2RlZm5zLnB1c2goX3JlcXVpcmVkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gc2NoZW1hLWRlcGVuZGVuY2llc1xuICAgIGlmIChfZGVmbnMubGVuZ3RoKSB7XG4gICAgICBkZWxldGUgdmFsdWUuZGVwZW5kZW5jaWVzO1xuXG4gICAgICByZXR1cm4gdHJhdmVyc2VDYWxsYmFjayh7XG4gICAgICAgIGFsbE9mOiBfZGVmbnMuY29uY2F0KHZhbHVlKSxcbiAgICAgIH0sIHBhdGguY29uY2F0KFsncHJvcGVydGllcyddKSwgcmVzb2x2ZSwgdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHNraXBwZWQgPSBbXTtcbiAgY29uc3QgbWlzc2luZyA9IFtdO1xuXG4gIF9wcm9wcy5mb3JFYWNoKGtleSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpZ25vcmVQcm9wZXJ0aWVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAoKGlnbm9yZVByb3BlcnRpZXNbaV0gaW5zdGFuY2VvZiBSZWdFeHAgJiYgaWdub3JlUHJvcGVydGllc1tpXS50ZXN0KGtleSkpXG4gICAgICAgIHx8ICh0eXBlb2YgaWdub3JlUHJvcGVydGllc1tpXSA9PT0gJ3N0cmluZycgJiYgaWdub3JlUHJvcGVydGllc1tpXSA9PT0ga2V5KVxuICAgICAgICB8fCAodHlwZW9mIGlnbm9yZVByb3BlcnRpZXNbaV0gPT09ICdmdW5jdGlvbicgJiYgaWdub3JlUHJvcGVydGllc1tpXShwcm9wZXJ0aWVzW2tleV0sIGtleSkpKSB7XG4gICAgICAgIHNraXBwZWQucHVzaChrZXkpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGFkZGl0aW9uYWxQcm9wZXJ0aWVzID09PSBmYWxzZSkge1xuICAgICAgaWYgKHJlcXVpcmVkUHJvcGVydGllcy5pbmRleE9mKGtleSkgIT09IC0xKSB7XG4gICAgICAgIHByb3BzW2tleV0gPSBwcm9wZXJ0aWVzW2tleV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHByb3BlcnRpZXNba2V5XSkge1xuICAgICAgcHJvcHNba2V5XSA9IHByb3BlcnRpZXNba2V5XTtcbiAgICB9XG5cbiAgICBsZXQgZm91bmQ7XG5cbiAgICAvLyB0aGVuIHRyeSBwYXR0ZXJuUHJvcGVydGllc1xuICAgIHBhdHRlcm5Qcm9wZXJ0eUtleXMuZm9yRWFjaChfa2V5ID0+IHtcbiAgICAgIGlmIChrZXkubWF0Y2gobmV3IFJlZ0V4cChfa2V5KSkpIHtcbiAgICAgICAgZm91bmQgPSB0cnVlO1xuXG4gICAgICAgIGlmIChwcm9wc1trZXldKSB7XG4gICAgICAgICAgdXRpbHMubWVyZ2UocHJvcHNba2V5XSwgcGF0dGVyblByb3BlcnRpZXNbX2tleV0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHByb3BzW3JhbmRvbS5yYW5kZXhwKGtleSldID0gcGF0dGVyblByb3BlcnRpZXNbX2tleV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmICghZm91bmQpIHtcbiAgICAgIC8vIHRyeSBwYXR0ZXJuUHJvcGVydGllcyBhZ2FpbixcbiAgICAgIGNvbnN0IHN1YnNjaGVtYSA9IHBhdHRlcm5Qcm9wZXJ0aWVzW2tleV0gfHwgYWRkaXRpb25hbFByb3BlcnRpZXM7XG5cbiAgICAgIC8vIEZJWE1FOiBhbGxvdyBhbnlUeXBlIGFzIGZhbGxiYWNrIHdoZW4gbm8gc3Vic2NoZW1hIGlzIGdpdmVuP1xuXG4gICAgICBpZiAoc3Vic2NoZW1hICYmIGFkZGl0aW9uYWxQcm9wZXJ0aWVzICE9PSBmYWxzZSkge1xuICAgICAgICAvLyBvdGhlcndpc2Ugd2UgY2FuIHVzZSBhZGRpdGlvbmFsUHJvcGVydGllcz9cbiAgICAgICAgcHJvcHNbcGF0dGVyblByb3BlcnRpZXNba2V5XSA/IHJhbmRvbS5yYW5kZXhwKGtleSkgOiBrZXldID0gcHJvcGVydGllc1trZXldIHx8IHN1YnNjaGVtYTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1pc3NpbmcucHVzaChrZXkpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgLy8gZGlzY2FyZCBhbHJlYWR5IGlnbm9yZWQgcHJvcHMgaWYgdGhleSdyZSBub3QgcmVxdWlyZWQgdG8gYmUgZmlsbGVkLi4uXG4gIGxldCBjdXJyZW50ID0gT2JqZWN0LmtleXMocHJvcHMpLmxlbmd0aCArIChmaWxsUHJvcHMgPyAwIDogc2tpcHBlZC5sZW5ndGgpO1xuXG4gIC8vIGdlbmVyYXRlIGR5bmFtaWMgc3VmZml4IGZvciBhZGRpdGlvbmFsIHByb3BzLi4uXG4gIGNvbnN0IGhhc2ggPSBzdWZmaXggPT4gcmFuZG9tLnJhbmRleHAoYF8/W19hLWZcXFxcZF17MSwzfSR7c3VmZml4ID8gJ1xcXFwkPycgOiAnJ31gKTtcblxuICBmdW5jdGlvbiBnZXQoZnJvbSkge1xuICAgIGxldCBvbmU7XG5cbiAgICBkbyB7XG4gICAgICBpZiAoIWZyb20ubGVuZ3RoKSBicmVhaztcbiAgICAgIG9uZSA9IGZyb20uc2hpZnQoKTtcbiAgICB9IHdoaWxlIChwcm9wc1tvbmVdKTtcblxuICAgIHJldHVybiBvbmU7XG4gIH1cblxuICBsZXQgbWluUHJvcHMgPSBtaW47XG4gIGlmIChhbGxvd3NBZGRpdGlvbmFsICYmICFyZXF1aXJlZFByb3BlcnRpZXMubGVuZ3RoKSB7XG4gICAgbWluUHJvcHMgPSBNYXRoLm1heChvcHRpb25hbHNQcm9iYWJpbGl0eSA9PT0gbnVsbCB8fCBhZGRpdGlvbmFsUHJvcGVydGllcyA/IHJhbmRvbS5udW1iZXIoZmlsbFByb3BzID8gMSA6IDAsIG1heCkgOiAwLCBtaW4pO1xuICB9XG5cbiAgd2hpbGUgKGZpbGxQcm9wcykge1xuICAgIGlmICghKHBhdHRlcm5Qcm9wZXJ0eUtleXMubGVuZ3RoIHx8IGFsbG93c0FkZGl0aW9uYWwpKSB7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBpZiAoY3VycmVudCA+PSBtaW5Qcm9wcykge1xuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKGFsbG93c0FkZGl0aW9uYWwpIHtcbiAgICAgIGlmIChyZXVzZVByb3BzICYmICgocHJvcGVydHlLZXlzLmxlbmd0aCAtIGN1cnJlbnQpID4gbWluUHJvcHMpKSB7XG4gICAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICAgIGxldCBrZXk7XG5cbiAgICAgICAgZG8ge1xuICAgICAgICAgIGNvdW50ICs9IDE7XG5cbiAgICAgICAgICAvLyBza2lwIGxhcmdlIG9iamVjdHNcbiAgICAgICAgICBpZiAoY291bnQgPiAxMDAwKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBrZXkgPSBnZXQocmVxdWlyZWRQcm9wZXJ0aWVzKSB8fCByYW5kb20ucGljayhwcm9wZXJ0eUtleXMpO1xuICAgICAgICB9IHdoaWxlICh0eXBlb2YgcHJvcHNba2V5XSAhPT0gJ3VuZGVmaW5lZCcpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgcHJvcHNba2V5XSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBwcm9wc1trZXldID0gcHJvcGVydGllc1trZXldO1xuICAgICAgICAgIGN1cnJlbnQgKz0gMTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChwYXR0ZXJuUHJvcGVydHlLZXlzLmxlbmd0aCAmJiAhYWRkaXRpb25hbFByb3BlcnRpZXMpIHtcbiAgICAgICAgY29uc3QgcHJvcCA9IHJhbmRvbS5waWNrKHBhdHRlcm5Qcm9wZXJ0eUtleXMpO1xuICAgICAgICBjb25zdCB3b3JkID0gcmFuZG9tLnJhbmRleHAocHJvcCk7XG5cbiAgICAgICAgaWYgKCFwcm9wc1t3b3JkXSkge1xuICAgICAgICAgIHByb3BzW3dvcmRdID0gcGF0dGVyblByb3BlcnRpZXNbcHJvcF07XG4gICAgICAgICAgY3VycmVudCArPSAxO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCB3b3JkID0gZ2V0KHJlcXVpcmVkUHJvcGVydGllcykgfHwgKHdvcmRzKDEpICsgaGFzaCgpKTtcblxuICAgICAgICBpZiAoIXByb3BzW3dvcmRdKSB7XG4gICAgICAgICAgcHJvcHNbd29yZF0gPSBhZGRpdGlvbmFsUHJvcGVydGllcyB8fCBhbnlUeXBlO1xuICAgICAgICAgIGN1cnJlbnQgKz0gMTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBjdXJyZW50IDwgbWluICYmIGkgPCBwYXR0ZXJuUHJvcGVydHlLZXlzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBfa2V5ID0gcGF0dGVyblByb3BlcnR5S2V5c1tpXTtcbiAgICAgIGNvbnN0IHdvcmQgPSByYW5kb20ucmFuZGV4cChfa2V5KTtcblxuXG4gICAgICBpZiAoIXByb3BzW3dvcmRdKSB7XG4gICAgICAgIHByb3BzW3dvcmRdID0gcGF0dGVyblByb3BlcnRpZXNbX2tleV07XG4gICAgICAgIGN1cnJlbnQgKz0gMTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBmaWxsIHVwLXRvIHRoaXMgdmFsdWUgYW5kIG5vIG1vcmUhXG4gIGlmIChyZXF1aXJlZFByb3BlcnRpZXMubGVuZ3RoID09PSAwICYmICghYWxsb3dzQWRkaXRpb25hbCB8fCBvcHRpb25hbHNQcm9iYWJpbGl0eSA9PT0gZmFsc2UpKSB7XG4gICAgY29uc3QgbWF4aW11bSA9IHJhbmRvbS5udW1iZXIobWluLCBtYXgpO1xuXG4gICAgZm9yICg7IGN1cnJlbnQgPCBtYXhpbXVtOykge1xuICAgICAgY29uc3Qgd29yZCA9IGdldChwcm9wZXJ0eUtleXMpO1xuXG4gICAgICBpZiAod29yZCkge1xuICAgICAgICBwcm9wc1t3b3JkXSA9IHByb3BlcnRpZXNbd29yZF07XG4gICAgICB9XG5cbiAgICAgIGN1cnJlbnQgKz0gMTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJhdmVyc2VDYWxsYmFjayhwcm9wcywgcGF0aC5jb25jYXQoWydwcm9wZXJ0aWVzJ10pLCByZXNvbHZlLCB2YWx1ZSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IG9iamVjdFR5cGU7XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQSxNQUFNLFVBQVUsRUFBRSxNQUFNLFVBQVU7QUFHbEMsb0JBQW9CLE9BQU8sTUFBTSxTQUFTLGtCQUFrQjtBQUMxRCxRQUFNLFFBQVE7QUFFZCxRQUFNLGFBQWEsTUFBTSxjQUFjO0FBQ3ZDLFFBQU0sb0JBQW9CLE1BQU0scUJBQXFCO0FBQ3JELFFBQU0scUJBQXFCLE9BQU8sTUFBTSxhQUFhLFlBQVksS0FBTSxPQUFNLFlBQVksSUFBSTtBQUM3RixRQUFNLG1CQUFtQixNQUFNLHlCQUF5QjtBQUV4RCxRQUFNLGVBQWUsT0FBTyxLQUFLO0FBQ2pDLFFBQU0sc0JBQXNCLE9BQU8sS0FBSztBQUN4QyxRQUFNLHFCQUFxQixhQUFhLE9BQU8scUJBQXFCLE9BQU8sQ0FBQyxXQUFXLFNBQVM7QUFDOUYsUUFBSSxtQkFBbUIsUUFBUSxVQUFVO0FBQUksZ0JBQVUsS0FBSztBQUM1RCxXQUFPO0FBQUEsS0FDTjtBQUNILFFBQU0sZ0JBQWdCLG1CQUFtQixPQUFPO0FBRWhELFFBQU0sdUJBQXVCLG1CQUN4QixNQUFNLHlCQUF5QixPQUFPLFVB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
