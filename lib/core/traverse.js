const utils = require("./utils");
const random = require("./random");
const ParseError = require("./error");
const inferType = require("./infer");
const types = require("../types/index");
const optionAPI = require("../api/option");
function getMeta({ $comment: comment, title, description }) {
  return Object.entries({ comment, title, description }).filter(([, value]) => value).reduce((memo, [k, v]) => {
    memo[k] = v;
    return memo;
  }, {});
}
function traverse(schema, path, resolve, rootSchema) {
  schema = resolve(schema, null, path);
  if (schema && (schema.oneOf || schema.anyOf || schema.allOf)) {
    schema = resolve(schema, null, path);
  }
  if (!schema) {
    return;
  }
  const context = {
    ...getMeta(schema),
    schemaPath: path
  };
  if (path[path.length - 1] !== "properties") {
    if (optionAPI("useExamplesValue") && Array.isArray(schema.examples)) {
      const fixedExamples = schema.examples.concat("default" in schema ? [schema.default] : []);
      return { value: utils.typecast(null, schema, () => random.pick(fixedExamples)), context };
    }
    if (optionAPI("useDefaultValue") && "default" in schema) {
      if (schema.default !== "" || !optionAPI("replaceEmptyByRandomValue")) {
        return { value: schema.default, context };
      }
    }
    if ("template" in schema) {
      return { value: utils.template(schema.template, rootSchema), context };
    }
    if ("const" in schema) {
      return { value: schema.const, context };
    }
  }
  if (schema.not && typeof schema.not === "object") {
    schema = utils.notValue(schema.not, utils.omitProps(schema, ["not"]));
    if (schema.type && schema.type === "object") {
      const { value, context: innerContext } = traverse(schema, path.concat(["not"]), resolve, rootSchema);
      return { value: utils.clean(value, schema, false), context: { ...context, items: innerContext } };
    }
  }
  if (typeof schema.thunk === "function") {
    const { value, context: innerContext } = traverse(schema.thunk(rootSchema), path, resolve);
    return { value, context: { ...context, items: innerContext } };
  }
  if (typeof schema.generate === "function") {
    const retval = utils.typecast(null, schema, () => schema.generate(rootSchema, path));
    const type2 = retval === null ? "null" : typeof retval;
    if (type2 === schema.type || Array.isArray(schema.type) && schema.type.includes(type2) || type2 === "number" && schema.type === "integer" || Array.isArray(retval) && schema.type === "array") {
      return { value: retval, context };
    }
  }
  if (typeof schema.pattern === "string") {
    return { value: utils.typecast("string", schema, () => random.randexp(schema.pattern)), context };
  }
  if (Array.isArray(schema.enum)) {
    return { value: utils.typecast(null, schema, () => random.pick(schema.enum)), context };
  }
  if (schema.jsonPath) {
    return { value: schema, context };
  }
  let type = schema.type;
  if (Array.isArray(type)) {
    type = random.pick(type);
  } else if (typeof type === "undefined") {
    type = inferType(schema, path) || type;
    if (type) {
      schema.type = type;
    }
  }
  if (typeof type === "string") {
    if (!types[type]) {
      if (optionAPI("failOnInvalidTypes")) {
        throw new ParseError(`unknown primitive ${utils.short(type)}`, path.concat(["type"]));
      } else {
        const value = optionAPI("defaultInvalidTypeProduct");
        if (typeof value === "string" && types[value]) {
          return { value: types[value](schema, path, resolve, traverse), context };
        }
        return { value, context };
      }
    } else {
      try {
        const innerResult = types[type](schema, path, resolve, traverse);
        if (type === "array") {
          return {
            value: innerResult.map(({ value }) => value),
            context: {
              ...context,
              items: innerResult.map(Array.isArray(schema.items) ? ({ context: c }) => c : ({ context: c }) => ({
                ...c,
                schemaPath: c.schemaPath.slice(0, -1)
              }))
            }
          };
        }
        if (type === "object") {
          return { value: innerResult.value, context: { ...context, items: innerResult.context } };
        }
        return { value: innerResult, context };
      } catch (e) {
        if (typeof e.path === "undefined") {
          throw new ParseError(e.stack, path);
        }
        throw e;
      }
    }
  }
  let valueCopy = {};
  let contextCopy = { ...context };
  if (Array.isArray(schema)) {
    valueCopy = [];
  }
  Object.keys(schema).forEach((prop) => {
    if (typeof schema[prop] === "object" && prop !== "definitions") {
      const { value, context: innerContext } = traverse(schema[prop], path.concat([prop]), resolve, valueCopy);
      valueCopy[prop] = utils.clean(value, schema[prop], false);
      contextCopy[prop] = innerContext;
    } else {
      valueCopy[prop] = schema[prop];
    }
  });
  return { value: valueCopy, context: contextCopy };
}
var traverse_default = traverse;
module.exports=traverse_default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvY29yZS90cmF2ZXJzZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdXRpbHMgZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgcmFuZG9tIGZyb20gJy4vcmFuZG9tJztcbmltcG9ydCBQYXJzZUVycm9yIGZyb20gJy4vZXJyb3InO1xuaW1wb3J0IGluZmVyVHlwZSBmcm9tICcuL2luZmVyJztcbmltcG9ydCB0eXBlcyBmcm9tICcuLi90eXBlcy9pbmRleCc7XG5pbXBvcnQgb3B0aW9uQVBJIGZyb20gJy4uL2FwaS9vcHRpb24nO1xuXG5mdW5jdGlvbiBnZXRNZXRhKHsgJGNvbW1lbnQ6IGNvbW1lbnQsIHRpdGxlLCBkZXNjcmlwdGlvbiB9KSB7XG4gIHJldHVybiBPYmplY3QuZW50cmllcyh7IGNvbW1lbnQsIHRpdGxlLCBkZXNjcmlwdGlvbiB9KVxuICAgIC5maWx0ZXIoKFssIHZhbHVlXSkgPT4gdmFsdWUpXG4gICAgLnJlZHVjZSgobWVtbywgW2ssIHZdKSA9PiB7XG4gICAgICBtZW1vW2tdID0gdjtcbiAgICAgIHJldHVybiBtZW1vO1xuICAgIH0sIHt9KTtcbn1cblxuLy8gVE9ETyBwcm92aWRlIHR5cGVzXG5mdW5jdGlvbiB0cmF2ZXJzZShzY2hlbWEsIHBhdGgsIHJlc29sdmUsIHJvb3RTY2hlbWEpIHtcbiAgc2NoZW1hID0gcmVzb2x2ZShzY2hlbWEsIG51bGwsIHBhdGgpO1xuXG4gIGlmIChzY2hlbWEgJiYgKHNjaGVtYS5vbmVPZiB8fCBzY2hlbWEuYW55T2YgfHwgc2NoZW1hLmFsbE9mKSkge1xuICAgIHNjaGVtYSA9IHJlc29sdmUoc2NoZW1hLCBudWxsLCBwYXRoKTtcbiAgfVxuXG4gIGlmICghc2NoZW1hKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgY29udGV4dCA9IHtcbiAgICAuLi5nZXRNZXRhKHNjaGVtYSksXG4gICAgc2NoZW1hUGF0aDogcGF0aCxcbiAgfTtcblxuICAvLyBkZWZhdWx0IHZhbHVlcyBoYXMgaGlnaGVyIHByZWNlZGVuY2VcbiAgaWYgKHBhdGhbcGF0aC5sZW5ndGggLSAxXSAhPT0gJ3Byb3BlcnRpZXMnKSB7XG4gICAgLy8gZXhhbXBsZSB2YWx1ZXMgaGF2ZSBoaWdoZXN0IHByZWNlZGVuY2VcbiAgICBpZiAob3B0aW9uQVBJKCd1c2VFeGFtcGxlc1ZhbHVlJykgJiYgQXJyYXkuaXNBcnJheShzY2hlbWEuZXhhbXBsZXMpKSB7XG4gICAgICAvLyBpbmNsdWRlIGBkZWZhdWx0YCB2YWx1ZSBhcyBleGFtcGxlIHRvb1xuICAgICAgY29uc3QgZml4ZWRFeGFtcGxlcyA9IHNjaGVtYS5leGFtcGxlc1xuICAgICAgICAuY29uY2F0KCdkZWZhdWx0JyBpbiBzY2hlbWEgPyBbc2NoZW1hLmRlZmF1bHRdIDogW10pO1xuXG4gICAgICByZXR1cm4geyB2YWx1ZTogdXRpbHMudHlwZWNhc3QobnVsbCwgc2NoZW1hLCAoKSA9PiByYW5kb20ucGljayhmaXhlZEV4YW1wbGVzKSksIGNvbnRleHQgfTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9uQVBJKCd1c2VEZWZhdWx0VmFsdWUnKSAmJiAnZGVmYXVsdCcgaW4gc2NoZW1hKSB7XG4gICAgICBpZiAoc2NoZW1hLmRlZmF1bHQgIT09ICcnIHx8ICFvcHRpb25BUEkoJ3JlcGxhY2VFbXB0eUJ5UmFuZG9tVmFsdWUnKSkge1xuICAgICAgICByZXR1cm4geyB2YWx1ZTogc2NoZW1hLmRlZmF1bHQsIGNvbnRleHQgfTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoJ3RlbXBsYXRlJyBpbiBzY2hlbWEpIHtcbiAgICAgIHJldHVybiB7IHZhbHVlOiB1dGlscy50ZW1wbGF0ZShzY2hlbWEudGVtcGxhdGUsIHJvb3RTY2hlbWEpLCBjb250ZXh0IH07XG4gICAgfVxuXG4gICAgaWYgKCdjb25zdCcgaW4gc2NoZW1hKSB7XG4gICAgICByZXR1cm4geyB2YWx1ZTogc2NoZW1hLmNvbnN0LCBjb250ZXh0IH07XG4gICAgfVxuICB9XG5cbiAgaWYgKHNjaGVtYS5ub3QgJiYgdHlwZW9mIHNjaGVtYS5ub3QgPT09ICdvYmplY3QnKSB7XG4gICAgc2NoZW1hID0gdXRpbHMubm90VmFsdWUoc2NoZW1hLm5vdCwgdXRpbHMub21pdFByb3BzKHNjaGVtYSwgWydub3QnXSkpO1xuXG4gICAgLy8gYnVpbGQgbmV3IG9iamVjdCB2YWx1ZSBmcm9tIG5vdC1zY2hlbWEhXG4gICAgaWYgKHNjaGVtYS50eXBlICYmIHNjaGVtYS50eXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgY29uc3QgeyB2YWx1ZSwgY29udGV4dDogaW5uZXJDb250ZXh0IH0gPSB0cmF2ZXJzZShzY2hlbWEsIHBhdGguY29uY2F0KFsnbm90J10pLCByZXNvbHZlLCByb290U2NoZW1hKTtcbiAgICAgIHJldHVybiB7IHZhbHVlOiB1dGlscy5jbGVhbih2YWx1ZSwgc2NoZW1hLCBmYWxzZSksIGNvbnRleHQ6IHsgLi4uY29udGV4dCwgaXRlbXM6IGlubmVyQ29udGV4dCB9IH07XG4gICAgfVxuICB9XG5cbiAgLy8gdGh1bmtzIGNhbiByZXR1cm4gc3ViLXNjaGVtYXNcbiAgaWYgKHR5cGVvZiBzY2hlbWEudGh1bmsgPT09ICdmdW5jdGlvbicpIHtcbiAgICAvLyByZXN1bHQgaXMgYWxyZWFkeSBjbGVhbmVkIGluIHRodW5rXG4gICAgY29uc3QgeyB2YWx1ZSwgY29udGV4dDogaW5uZXJDb250ZXh0IH0gPSB0cmF2ZXJzZShzY2hlbWEudGh1bmsocm9vdFNjaGVtYSksIHBhdGgsIHJlc29sdmUpO1xuICAgIHJldHVybiB7IHZhbHVlLCBjb250ZXh0OiB7IC4uLmNvbnRleHQsIGl0ZW1zOiBpbm5lckNvbnRleHQgfSB9O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBzY2hlbWEuZ2VuZXJhdGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjb25zdCByZXR2YWwgPSB1dGlscy50eXBlY2FzdChudWxsLCBzY2hlbWEsICgpID0+IHNjaGVtYS5nZW5lcmF0ZShyb290U2NoZW1hLCBwYXRoKSk7XG4gICAgY29uc3QgdHlwZSA9IHJldHZhbCA9PT0gbnVsbCA/ICdudWxsJyA6IHR5cGVvZiByZXR2YWw7XG4gICAgaWYgKHR5cGUgPT09IHNjaGVtYS50eXBlXG4gICAgICB8fCAoQXJyYXkuaXNBcnJheShzY2hlbWEudHlwZSkgJiYgc2NoZW1hLnR5cGUuaW5jbHVkZXModHlwZSkpXG4gICAgICB8fCAodHlwZSA9PT0gJ251bWJlcicgJiYgc2NoZW1hLnR5cGUgPT09ICdpbnRlZ2VyJylcbiAgICAgIHx8IChBcnJheS5pc0FycmF5KHJldHZhbCkgJiYgc2NoZW1hLnR5cGUgPT09ICdhcnJheScpKSB7XG4gICAgICByZXR1cm4geyB2YWx1ZTogcmV0dmFsLCBjb250ZXh0IH07XG4gICAgfVxuICB9XG5cbiAgaWYgKHR5cGVvZiBzY2hlbWEucGF0dGVybiA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4geyB2YWx1ZTogdXRpbHMudHlwZWNhc3QoJ3N0cmluZycsIHNjaGVtYSwgKCkgPT4gcmFuZG9tLnJhbmRleHAoc2NoZW1hLnBhdHRlcm4pKSwgY29udGV4dCB9O1xuICB9XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkoc2NoZW1hLmVudW0pKSB7XG4gICAgcmV0dXJuIHsgdmFsdWU6IHV0aWxzLnR5cGVjYXN0KG51bGwsIHNjaGVtYSwgKCkgPT4gcmFuZG9tLnBpY2soc2NoZW1hLmVudW0pKSwgY29udGV4dCB9O1xuICB9XG5cbiAgLy8gc2hvcnQtY2lyY3VpdCBhcyB3ZSBkb24ndCBwbGFuIGdlbmVyYXRlIG1vcmUgdmFsdWVzIVxuICBpZiAoc2NoZW1hLmpzb25QYXRoKSB7XG4gICAgcmV0dXJuIHsgdmFsdWU6IHNjaGVtYSwgY29udGV4dCB9O1xuICB9XG5cbiAgLy8gVE9ETyByZW1vdmUgdGhlIHVnbHkgb3ZlcmNvbWVcbiAgbGV0IHR5cGUgPSBzY2hlbWEudHlwZTtcblxuICBpZiAoQXJyYXkuaXNBcnJheSh0eXBlKSkge1xuICAgIHR5cGUgPSByYW5kb20ucGljayh0eXBlKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgdHlwZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvLyBBdHRlbXB0IHRvIGluZmVyIHRoZSB0eXBlXG4gICAgdHlwZSA9IGluZmVyVHlwZShzY2hlbWEsIHBhdGgpIHx8IHR5cGU7XG5cbiAgICBpZiAodHlwZSkge1xuICAgICAgc2NoZW1hLnR5cGUgPSB0eXBlO1xuICAgIH1cbiAgfVxuXG4gIGlmICh0eXBlb2YgdHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICBpZiAoIXR5cGVzW3R5cGVdKSB7XG4gICAgICBpZiAob3B0aW9uQVBJKCdmYWlsT25JbnZhbGlkVHlwZXMnKSkge1xuICAgICAgICB0aHJvdyBuZXcgUGFyc2VFcnJvcihgdW5rbm93biBwcmltaXRpdmUgJHt1dGlscy5zaG9ydCh0eXBlKX1gLCBwYXRoLmNvbmNhdChbJ3R5cGUnXSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBvcHRpb25BUEkoJ2RlZmF1bHRJbnZhbGlkVHlwZVByb2R1Y3QnKTtcblxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiB0eXBlc1t2YWx1ZV0pIHtcbiAgICAgICAgICByZXR1cm4geyB2YWx1ZTogdHlwZXNbdmFsdWVdKHNjaGVtYSwgcGF0aCwgcmVzb2x2ZSwgdHJhdmVyc2UpLCBjb250ZXh0IH07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4geyB2YWx1ZSwgY29udGV4dCB9O1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBpbm5lclJlc3VsdCA9IHR5cGVzW3R5cGVdKHNjaGVtYSwgcGF0aCwgcmVzb2x2ZSwgdHJhdmVyc2UpO1xuICAgICAgICBpZiAodHlwZSA9PT0gJ2FycmF5Jykge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWx1ZTogaW5uZXJSZXN1bHQubWFwKCh7IHZhbHVlIH0pID0+IHZhbHVlKSxcbiAgICAgICAgICAgIGNvbnRleHQ6IHtcbiAgICAgICAgICAgICAgLi4uY29udGV4dCxcbiAgICAgICAgICAgICAgaXRlbXM6IGlubmVyUmVzdWx0Lm1hcChcbiAgICAgICAgICAgICAgICBBcnJheS5pc0FycmF5KHNjaGVtYS5pdGVtcylcbiAgICAgICAgICAgICAgICAgID8gKHsgY29udGV4dDogYyB9KSA9PiBjXG4gICAgICAgICAgICAgICAgICA6ICh7IGNvbnRleHQ6IGMgfSkgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgLi4uYyxcbiAgICAgICAgICAgICAgICAgICAgLy8gd2UgaGF2ZSB0byByZW1vdmUgdGhlIGluZGV4IGZyb20gdGhlIHBhdGggdG8gZ2V0IHRoZSByZWFsIHNjaGVtYSBwYXRoXG4gICAgICAgICAgICAgICAgICAgIHNjaGVtYVBhdGg6IGMuc2NoZW1hUGF0aC5zbGljZSgwLCAtMSksXG4gICAgICAgICAgICAgICAgICB9KSksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IGlubmVyUmVzdWx0LnZhbHVlLCBjb250ZXh0OiB7IC4uLmNvbnRleHQsIGl0ZW1zOiBpbm5lclJlc3VsdC5jb250ZXh0IH0gfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyB2YWx1ZTogaW5uZXJSZXN1bHQsIGNvbnRleHQgfTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBlLnBhdGggPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFBhcnNlRXJyb3IoZS5zdGFjaywgcGF0aCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBsZXQgdmFsdWVDb3B5ID0ge307XG4gIGxldCBjb250ZXh0Q29weSA9IHsgLi4uY29udGV4dCB9O1xuXG4gIGlmIChBcnJheS5pc0FycmF5KHNjaGVtYSkpIHtcbiAgICB2YWx1ZUNvcHkgPSBbXTtcbiAgfVxuXG4gIE9iamVjdC5rZXlzKHNjaGVtYSkuZm9yRWFjaChwcm9wID0+IHtcbiAgICBpZiAodHlwZW9mIHNjaGVtYVtwcm9wXSA9PT0gJ29iamVjdCcgJiYgcHJvcCAhPT0gJ2RlZmluaXRpb25zJykge1xuICAgICAgY29uc3QgeyB2YWx1ZSwgY29udGV4dDogaW5uZXJDb250ZXh0IH0gPSB0cmF2ZXJzZShzY2hlbWFbcHJvcF0sIHBhdGguY29uY2F0KFtwcm9wXSksIHJlc29sdmUsIHZhbHVlQ29weSk7XG4gICAgICB2YWx1ZUNvcHlbcHJvcF0gPSB1dGlscy5jbGVhbih2YWx1ZSwgc2NoZW1hW3Byb3BdLCBmYWxzZSk7XG4gICAgICBjb250ZXh0Q29weVtwcm9wXSA9IGlubmVyQ29udGV4dDtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFsdWVDb3B5W3Byb3BdID0gc2NoZW1hW3Byb3BdO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHsgdmFsdWU6IHZhbHVlQ29weSwgY29udGV4dDogY29udGV4dENvcHkgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdHJhdmVyc2U7XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLGlCQUFpQixFQUFFLFVBQVUsU0FBUyxPQUFPLGVBQWU7QUFDMUQsU0FBTyxPQUFPLFFBQVEsRUFBRSxTQUFTLE9BQU8sZUFDckMsT0FBTyxDQUFDLENBQUMsRUFBRSxXQUFXLE9BQ3RCLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxPQUFPO0FBQ3hCLFNBQUssS0FBSztBQUNWLFdBQU87QUFBQSxLQUNOO0FBQUE7QUFJUCxrQkFBa0IsUUFBUSxNQUFNLFNBQVMsWUFBWTtBQUNuRCxXQUFTLFFBQVEsUUFBUSxNQUFNO0FBRS9CLE1BQUksVUFBVyxRQUFPLFNBQVMsT0FBTyxTQUFTLE9BQU8sUUFBUTtBQUM1RCxhQUFTLFFBQVEsUUFBUSxNQUFNO0FBQUE7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
