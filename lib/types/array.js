const random = require("../core/random");
const utils = require("../core/utils");
const ParseError = require("../core/error");
const optionAPI = require("../api/option");
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
function arrayType(value, path, resolve, traverseCallback) {
  const items = [];
  if (!(value.items || value.additionalItems)) {
    if (utils.hasProperties(value, "minItems", "maxItems", "uniqueItems")) {
      throw new ParseError(`missing items for ${utils.short(value)}`, path);
    }
    return items;
  }
  if (Array.isArray(value.items)) {
    return value.items.map((item, key) => {
      const itemSubpath = path.concat(["items", key]);
      return traverseCallback(item, itemSubpath, resolve);
    });
  }
  let minItems = value.minItems;
  let maxItems = value.maxItems;
  const defaultMinItems = optionAPI("minItems");
  const defaultMaxItems = optionAPI("maxItems");
  if (defaultMinItems) {
    minItems = typeof minItems === "undefined" ? defaultMinItems : Math.min(defaultMinItems, minItems);
  }
  if (defaultMaxItems) {
    maxItems = typeof maxItems === "undefined" ? defaultMaxItems : Math.min(defaultMaxItems, maxItems);
    if (maxItems && maxItems > defaultMaxItems) {
      maxItems = defaultMaxItems;
    }
    if (minItems && minItems > defaultMaxItems) {
      minItems = maxItems;
    }
  }
  const optionalsProbability = optionAPI("alwaysFakeOptionals") === true ? 1 : optionAPI("optionalsProbability");
  const fixedProbabilities = optionAPI("alwaysFakeOptionals") || optionAPI("fixedProbabilities") || false;
  let length = random.number(minItems, maxItems, 1, 5);
  if (optionalsProbability !== null) {
    length = Math.max(fixedProbabilities ? Math.round((maxItems || length) * optionalsProbability) : Math.abs(random.number(minItems, maxItems) * optionalsProbability), minItems || 0);
  }
  const sample = typeof value.additionalItems === "object" ? value.additionalItems : {};
  for (let current = items.length; current < length; current += 1) {
    const itemSubpath = path.concat(["items", current]);
    const element = traverseCallback(value.items || sample, itemSubpath, resolve);
    items.push(element);
  }
  if (value.contains && length > 0) {
    const idx = random.number(0, length - 1);
    items[idx] = traverseCallback(value.contains, path.concat(["items", idx]), resolve);
  }
  if (value.uniqueItems) {
    return unique(path.concat(["items"]), items, value, sample, resolve, traverseCallback);
  }
  return items;
}
var array_default = arrayType;
module.exports=array_default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvdHlwZXMvYXJyYXkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHJhbmRvbSBmcm9tICcuLi9jb3JlL3JhbmRvbSc7XG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vY29yZS91dGlscyc7XG5pbXBvcnQgUGFyc2VFcnJvciBmcm9tICcuLi9jb3JlL2Vycm9yJztcbmltcG9ydCBvcHRpb25BUEkgZnJvbSAnLi4vYXBpL29wdGlvbic7XG5cbi8vIFRPRE8gcHJvdmlkZSB0eXBlc1xuZnVuY3Rpb24gdW5pcXVlKHBhdGgsIGl0ZW1zLCB2YWx1ZSwgc2FtcGxlLCByZXNvbHZlLCB0cmF2ZXJzZUNhbGxiYWNrKSB7XG4gIGNvbnN0IHRtcCA9IFtdO1xuICBjb25zdCBzZWVuID0gW107XG5cbiAgZnVuY3Rpb24gd2FsayhvYmopIHtcbiAgICBjb25zdCBqc29uID0gSlNPTi5zdHJpbmdpZnkob2JqLnZhbHVlKTtcblxuICAgIGlmIChzZWVuLmluZGV4T2YoanNvbikgPT09IC0xKSB7XG4gICAgICBzZWVuLnB1c2goanNvbik7XG4gICAgICB0bXAucHVzaChvYmopO1xuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpdGVtcy5mb3JFYWNoKHdhbGspO1xuXG4gIC8vIFRPRE86IGZpbmQgYSBiZXR0ZXIgc29sdXRpb24/XG4gIGxldCBsaW1pdCA9IDEwMDtcblxuICB3aGlsZSAodG1wLmxlbmd0aCAhPT0gaXRlbXMubGVuZ3RoKSB7XG4gICAgaWYgKCF3YWxrKHRyYXZlcnNlQ2FsbGJhY2sodmFsdWUuaXRlbXMgfHwgc2FtcGxlLCBwYXRoLCByZXNvbHZlKSkpIHtcbiAgICAgIGxpbWl0IC09IDE7XG4gICAgfVxuXG4gICAgaWYgKCFsaW1pdCkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRtcDtcbn1cblxuLy8gVE9ETyBwcm92aWRlIHR5cGVzXG5mdW5jdGlvbiBhcnJheVR5cGUodmFsdWUsIHBhdGgsIHJlc29sdmUsIHRyYXZlcnNlQ2FsbGJhY2spIHtcbiAgY29uc3QgaXRlbXMgPSBbXTtcblxuICBpZiAoISh2YWx1ZS5pdGVtcyB8fCB2YWx1ZS5hZGRpdGlvbmFsSXRlbXMpKSB7XG4gICAgaWYgKHV0aWxzLmhhc1Byb3BlcnRpZXModmFsdWUsICdtaW5JdGVtcycsICdtYXhJdGVtcycsICd1bmlxdWVJdGVtcycpKSB7XG4gICAgICB0aHJvdyBuZXcgUGFyc2VFcnJvcihgbWlzc2luZyBpdGVtcyBmb3IgJHt1dGlscy5zaG9ydCh2YWx1ZSl9YCwgcGF0aCk7XG4gICAgfVxuICAgIHJldHVybiBpdGVtcztcbiAgfVxuXG4gIGlmIChBcnJheS5pc0FycmF5KHZhbHVlLml0ZW1zKSkge1xuICAgIHJldHVybiB2YWx1ZS5pdGVtcy5tYXAoKGl0ZW0sIGtleSkgPT4ge1xuICAgICAgY29uc3QgaXRlbVN1YnBhdGggPSBwYXRoLmNvbmNhdChbJ2l0ZW1zJywga2V5XSk7XG5cbiAgICAgIHJldHVybiB0cmF2ZXJzZUNhbGxiYWNrKGl0ZW0sIGl0ZW1TdWJwYXRoLCByZXNvbHZlKTtcbiAgICB9KTtcbiAgfVxuXG4gIGxldCBtaW5JdGVtcyA9IHZhbHVlLm1pbkl0ZW1zO1xuICBsZXQgbWF4SXRlbXMgPSB2YWx1ZS5tYXhJdGVtcztcblxuICBjb25zdCBkZWZhdWx0TWluSXRlbXMgPSBvcHRpb25BUEkoJ21pbkl0ZW1zJyk7XG4gIGNvbnN0IGRlZmF1bHRNYXhJdGVtcyA9IG9wdGlvbkFQSSgnbWF4SXRlbXMnKTtcblxuICBpZiAoZGVmYXVsdE1pbkl0ZW1zKSB7XG4gICAgLy8gZml4IGJvdW5kYXJpZXNcbiAgICBtaW5JdGVtcyA9IHR5cGVvZiBtaW5JdGVtcyA9PT0gJ3VuZGVmaW5lZCdcbiAgICAgID8gZGVmYXVsdE1pbkl0ZW1zXG4gICAgICA6IE1hdGgubWluKGRlZmF1bHRNaW5JdGVtcywgbWluSXRlbXMpO1xuICB9XG5cbiAgaWYgKGRlZmF1bHRNYXhJdGVtcykge1xuICAgIG1heEl0ZW1zID0gdHlwZW9mIG1heEl0ZW1zID09PSAndW5kZWZpbmVkJ1xuICAgICAgPyBkZWZhdWx0TWF4SXRlbXNcbiAgICAgIDogTWF0aC5taW4oZGVmYXVsdE1heEl0ZW1zLCBtYXhJdGVtcyk7XG5cbiAgICAvLyBEb24ndCBhbGxvdyB1c2VyIHRvIHNldCBtYXggaXRlbXMgYWJvdmUgb3VyIG1heGltdW1cbiAgICBpZiAobWF4SXRlbXMgJiYgbWF4SXRlbXMgPiBkZWZhdWx0TWF4SXRlbXMpIHtcbiAgICAgIG1heEl0ZW1zID0gZGVmYXVsdE1heEl0ZW1zO1xuICAgIH1cblxuICAgIC8vIERvbid0IGFsbG93IHVzZXIgdG8gc2V0IG1pbiBpdGVtcyBhYm92ZSBvdXIgbWF4aW11bVxuICAgIGlmIChtaW5JdGVtcyAmJiBtaW5JdGVtcyA+IGRlZmF1bHRNYXhJdGVtcykge1xuICAgICAgbWluSXRlbXMgPSBtYXhJdGVtcztcbiAgICB9XG4gIH1cblxuICBjb25zdCBvcHRpb25hbHNQcm9iYWJpbGl0eSA9IG9wdGlvbkFQSSgnYWx3YXlzRmFrZU9wdGlvbmFscycpID09PSB0cnVlID8gMS4wIDogb3B0aW9uQVBJKCdvcHRpb25hbHNQcm9iYWJpbGl0eScpO1xuICBjb25zdCBmaXhlZFByb2JhYmlsaXRpZXMgPSBvcHRpb25BUEkoJ2Fsd2F5c0Zha2VPcHRpb25hbHMnKSB8fCBvcHRpb25BUEkoJ2ZpeGVkUHJvYmFiaWxpdGllcycpIHx8IGZhbHNlO1xuXG4gIGxldCBsZW5ndGggPSByYW5kb20ubnVtYmVyKG1pbkl0ZW1zLCBtYXhJdGVtcywgMSwgNSk7XG5cbiAgaWYgKG9wdGlvbmFsc1Byb2JhYmlsaXR5ICE9PSBudWxsKSB7XG4gICAgbGVuZ3RoID0gTWF0aC5tYXgoZml4ZWRQcm9iYWJpbGl0aWVzXG4gICAgICA/IE1hdGgucm91bmQoKG1heEl0ZW1zIHx8IGxlbmd0aCkgKiBvcHRpb25hbHNQcm9iYWJpbGl0eSlcbiAgICAgIDogTWF0aC5hYnMocmFuZG9tLm51bWJlcihtaW5JdGVtcywgbWF4SXRlbXMpICogb3B0aW9uYWxzUHJvYmFiaWxpdHkpLCBtaW5JdGVtcyB8fCAwKTtcbiAgfVxuXG4gIC8vIFRPRE8gYmVsb3cgbG9va3MgYmFkLiBTaG91bGQgYWRkaXRpb25hbEl0ZW1zIGJlIGNvcGllZCBhcy1pcz9cbiAgY29uc3Qgc2FtcGxlID0gdHlwZW9mIHZhbHVlLmFkZGl0aW9uYWxJdGVtcyA9PT0gJ29iamVjdCcgPyB2YWx1ZS5hZGRpdGlvbmFsSXRlbXMgOiB7fTtcblxuICBmb3IgKGxldCBjdXJyZW50ID0gaXRlbXMubGVuZ3RoOyBjdXJyZW50IDwgbGVuZ3RoOyBjdXJyZW50ICs9IDEpIHtcbiAgICBjb25zdCBpdGVtU3VicGF0aCA9IHBhdGguY29uY2F0KFsnaXRlbXMnLCBjdXJyZW50XSk7XG4gICAgY29uc3QgZWxlbWVudCA9IHRyYXZlcnNlQ2FsbGJhY2sodmFsdWUuaXRlbXMgfHwgc2FtcGxlLCBpdGVtU3VicGF0aCwgcmVzb2x2ZSk7XG5cbiAgICBpdGVtcy5wdXNoKGVsZW1lbnQpO1xuICB9XG5cbiAgaWYgKHZhbHVlLmNvbnRhaW5zICYmIGxlbmd0aCA+IDApIHtcbiAgICBjb25zdCBpZHggPSByYW5kb20ubnVtYmVyKDAsIGxlbmd0aCAtIDEpO1xuXG4gICAgaXRlbXNbaWR4XSA9IHRyYXZlcnNlQ2FsbGJhY2sodmFsdWUuY29udGFpbnMsIHBhdGguY29uY2F0KFsnaXRlbXMnLCBpZHhdKSwgcmVzb2x2ZSk7XG4gIH1cblxuICBpZiAodmFsdWUudW5pcXVlSXRlbXMpIHtcbiAgICByZXR1cm4gdW5pcXVlKHBhdGguY29uY2F0KFsnaXRlbXMnXSksIGl0ZW1zLCB2YWx1ZSwgc2FtcGxlLCByZXNvbHZlLCB0cmF2ZXJzZUNhbGxiYWNrKTtcbiAgfVxuXG4gIHJldHVybiBpdGVtcztcbn1cblxuZXhwb3J0IGRlZmF1bHQgYXJyYXlUeXBlO1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtB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
