const { getDependencies } = require("../vendor");
const optionAPI = require("../api/option");
const traverse = require("./traverse");
const random = require("./random");
const utils = require("./utils");
const buildResolveSchema = require("./buildResolveSchema");
function pick(data) {
  return Array.isArray(data) ? random.pick(data) : data;
}
function cycle(data, reverse) {
  if (!Array.isArray(data)) {
    return data;
  }
  const value = reverse ? data.pop() : data.shift();
  if (reverse) {
    data.unshift(value);
  } else {
    data.push(value);
  }
  return value;
}
function resolve(obj, data, values, property) {
  if (!obj || typeof obj !== "object") {
    return obj;
  }
  if (!values) {
    values = {};
  }
  if (!data) {
    data = obj;
  }
  if (Array.isArray(obj)) {
    return obj.map((x) => resolve(x, data, values, property));
  }
  if (obj.jsonPath) {
    const { JSONPath } = getDependencies();
    const params = typeof obj.jsonPath !== "object" ? { path: obj.jsonPath } : obj.jsonPath;
    params.group = obj.group || params.group || property;
    params.cycle = obj.cycle || params.cycle || false;
    params.reverse = obj.reverse || params.reverse || false;
    params.count = obj.count || params.count || 1;
    const key = `${params.group}__${params.path}`;
    if (!values[key]) {
      if (params.count > 1) {
        values[key] = JSONPath(params.path, data).slice(0, params.count);
      } else {
        values[key] = JSONPath(params.path, data);
      }
    }
    if (params.cycle || params.reverse) {
      return cycle(values[key], params.reverse);
    }
    return pick(values[key]);
  }
  Object.keys(obj).forEach((k) => {
    obj[k] = resolve(obj[k], data, values, k);
  });
  return obj;
}
function run(refs, schema, container, synchronous) {
  if (Object.prototype.toString.call(schema) !== "[object Object]") {
    throw new Error(`Invalid input, expecting object but given ${typeof schema}`);
  }
  const refDepthMin = optionAPI("refDepthMin") || 0;
  const refDepthMax = optionAPI("refDepthMax") || 3;
  try {
    const { resolveSchema } = buildResolveSchema({
      refs,
      schema,
      container,
      synchronous,
      refDepthMin,
      refDepthMax
    });
    const result = traverse(utils.clone(schema), [], resolveSchema);
    if (optionAPI("resolveJsonPath")) {
      return {
        value: resolve(result.value),
        context: result.context
      };
    }
    return result;
  } catch (e) {
    if (e.path) {
      throw new Error(`${e.message} in /${e.path.join("/")}`);
    } else {
      throw e;
    }
  }
}
var run_default = run;
module.exports=run_default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvY29yZS9ydW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0RGVwZW5kZW5jaWVzIH0gZnJvbSAnLi4vdmVuZG9yJztcbmltcG9ydCBvcHRpb25BUEkgZnJvbSAnLi4vYXBpL29wdGlvbic7XG5pbXBvcnQgdHJhdmVyc2UgZnJvbSAnLi90cmF2ZXJzZSc7XG5pbXBvcnQgcmFuZG9tIGZyb20gJy4vcmFuZG9tJztcbmltcG9ydCB1dGlscyBmcm9tICcuL3V0aWxzJztcbmltcG9ydCBidWlsZFJlc29sdmVTY2hlbWEgZnJvbSAnLi9idWlsZFJlc29sdmVTY2hlbWEnO1xuXG5mdW5jdGlvbiBwaWNrKGRhdGEpIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkoZGF0YSlcbiAgICA/IHJhbmRvbS5waWNrKGRhdGEpXG4gICAgOiBkYXRhO1xufVxuXG5mdW5jdGlvbiBjeWNsZShkYXRhLCByZXZlcnNlKSB7XG4gIGlmICghQXJyYXkuaXNBcnJheShkYXRhKSkge1xuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgY29uc3QgdmFsdWUgPSByZXZlcnNlXG4gICAgPyBkYXRhLnBvcCgpXG4gICAgOiBkYXRhLnNoaWZ0KCk7XG5cbiAgaWYgKHJldmVyc2UpIHtcbiAgICBkYXRhLnVuc2hpZnQodmFsdWUpO1xuICB9IGVsc2Uge1xuICAgIGRhdGEucHVzaCh2YWx1ZSk7XG4gIH1cblxuICByZXR1cm4gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIHJlc29sdmUob2JqLCBkYXRhLCB2YWx1ZXMsIHByb3BlcnR5KSB7XG4gIGlmICghb2JqIHx8IHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIGlmICghdmFsdWVzKSB7XG4gICAgdmFsdWVzID0ge307XG4gIH1cblxuICBpZiAoIWRhdGEpIHtcbiAgICBkYXRhID0gb2JqO1xuICB9XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgIHJldHVybiBvYmoubWFwKHggPT4gcmVzb2x2ZSh4LCBkYXRhLCB2YWx1ZXMsIHByb3BlcnR5KSk7XG4gIH1cblxuICBpZiAob2JqLmpzb25QYXRoKSB7XG4gICAgY29uc3QgeyBKU09OUGF0aCB9ID0gZ2V0RGVwZW5kZW5jaWVzKCk7XG5cbiAgICBjb25zdCBwYXJhbXMgPSB0eXBlb2Ygb2JqLmpzb25QYXRoICE9PSAnb2JqZWN0J1xuICAgICAgPyB7IHBhdGg6IG9iai5qc29uUGF0aCB9XG4gICAgICA6IG9iai5qc29uUGF0aDtcblxuICAgIHBhcmFtcy5ncm91cCA9IG9iai5ncm91cCB8fCBwYXJhbXMuZ3JvdXAgfHwgcHJvcGVydHk7XG4gICAgcGFyYW1zLmN5Y2xlID0gb2JqLmN5Y2xlIHx8IHBhcmFtcy5jeWNsZSB8fCBmYWxzZTtcbiAgICBwYXJhbXMucmV2ZXJzZSA9IG9iai5yZXZlcnNlIHx8IHBhcmFtcy5yZXZlcnNlIHx8IGZhbHNlO1xuICAgIHBhcmFtcy5jb3VudCA9IG9iai5jb3VudCB8fCBwYXJhbXMuY291bnQgfHwgMTtcblxuICAgIGNvbnN0IGtleSA9IGAke3BhcmFtcy5ncm91cH1fXyR7cGFyYW1zLnBhdGh9YDtcblxuICAgIGlmICghdmFsdWVzW2tleV0pIHtcbiAgICAgIGlmIChwYXJhbXMuY291bnQgPiAxKSB7XG4gICAgICAgIHZhbHVlc1trZXldID0gSlNPTlBhdGgocGFyYW1zLnBhdGgsIGRhdGEpLnNsaWNlKDAsIHBhcmFtcy5jb3VudCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWx1ZXNba2V5XSA9IEpTT05QYXRoKHBhcmFtcy5wYXRoLCBkYXRhKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocGFyYW1zLmN5Y2xlIHx8IHBhcmFtcy5yZXZlcnNlKSB7XG4gICAgICByZXR1cm4gY3ljbGUodmFsdWVzW2tleV0sIHBhcmFtcy5yZXZlcnNlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGljayh2YWx1ZXNba2V5XSk7XG4gIH1cblxuICBPYmplY3Qua2V5cyhvYmopLmZvckVhY2goayA9PiB7XG4gICAgb2JqW2tdID0gcmVzb2x2ZShvYmpba10sIGRhdGEsIHZhbHVlcywgayk7XG4gIH0pO1xuXG4gIHJldHVybiBvYmo7XG59XG5cbi8vIFRPRE8gcHJvdmlkZSB0eXBlcz9cbmZ1bmN0aW9uIHJ1bihyZWZzLCBzY2hlbWEsIGNvbnRhaW5lciwgc3luY2hyb25vdXMpIHtcbiAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChzY2hlbWEpICE9PSAnW29iamVjdCBPYmplY3RdJykge1xuICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBpbnB1dCwgZXhwZWN0aW5nIG9iamVjdCBidXQgZ2l2ZW4gJHt0eXBlb2Ygc2NoZW1hfWApO1xuICB9XG5cbiAgY29uc3QgcmVmRGVwdGhNaW4gPSBvcHRpb25BUEkoJ3JlZkRlcHRoTWluJykgfHwgMDtcbiAgY29uc3QgcmVmRGVwdGhNYXggPSBvcHRpb25BUEkoJ3JlZkRlcHRoTWF4JykgfHwgMztcblxuICB0cnkge1xuICAgIGNvbnN0IHsgcmVzb2x2ZVNjaGVtYSB9ID0gYnVpbGRSZXNvbHZlU2NoZW1hKHtcbiAgICAgIHJlZnMsXG4gICAgICBzY2hlbWEsXG4gICAgICBjb250YWluZXIsXG4gICAgICBzeW5jaHJvbm91cyxcbiAgICAgIHJlZkRlcHRoTWluLFxuICAgICAgcmVmRGVwdGhNYXgsXG4gICAgfSk7XG4gICAgY29uc3QgcmVzdWx0ID0gdHJhdmVyc2UodXRpbHMuY2xvbmUoc2NoZW1hKSwgW10sIHJlc29sdmVTY2hlbWEpO1xuXG4gICAgaWYgKG9wdGlvbkFQSSgncmVzb2x2ZUpzb25QYXRoJykpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHZhbHVlOiByZXNvbHZlKHJlc3VsdC52YWx1ZSksXG4gICAgICAgIGNvbnRleHQ6IHJlc3VsdC5jb250ZXh0LFxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9IGNhdGNoIChlKSB7XG4gICAgaWYgKGUucGF0aCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2UubWVzc2FnZX0gaW4gLyR7ZS5wYXRoLmpvaW4oJy8nKX1gKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgZTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgcnVuO1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQSxjQUFjLE1BQU07QUFDbEIsU0FBTyxNQUFNLFFBQVEsUUFDakIsT0FBTyxLQUFLLFFBQ1o7QUFBQTtBQUdOLGVBQWUsTUFBTSxTQUFTO0FBQzVCLE1BQUksQ0FBQyxNQUFNLFFBQVEsT0FBTztBQUN4QixXQUFPO0FBQUE7QUFHVCxRQUFNLFFBQVEsVUFDVixLQUFLLFFBQ0wsS0FBSztBQUVULE1BQUksU0FBUztBQUNYLFNBQUssUUFBUTtBQUFBLFNBQ1I7QUFDTCxTQUFLLEtBQUs7QUFBQTtBQUdaLFNBQU87QUFBQTtBQUdULGlCQUFpQixLQUFLLE1BQU0sUUFBUSxVQUFVO0FBQzVDLE1BQUksQ0FBQyxPQUFPLE9BQU8sUUFBUSxVQUFVO0FBQ25DLFdBQU87QUFBQTtBQUdULE1BQUksQ0FBQyxRQUFRO0FBQ1gsYUFBUztBQUFBO0FBR1gsTUFBSSxDQUFDLE1BQU07QUFDVCxXQUFPO0FBQUE7QUFHVCxNQUFJLE1BQU0sUUFBUSxNQUFNO0FBQ3RCLFdBQU8sSUFBSSxJQUFJLE9BQUssUUFBUSxHQUFHLE1BQU0sUUFBUTtBQUFBO0FBRy9DLE1BQUksSUFBSSxVQUFVO0FBQ2hCLFVBQU0sRUFBRSxhQUFhO0FBRXJCLFVBQU0sU0FBUyxPQUFPLElBQUksYUFBYSxXQUNuQyxFQUFFLE1BQU0sSUFBSSxhQUNaLElBQUk7QUFFUixXQUFPLFFBQVEsSUFBSSxTQUFTLE9BQU8sU0FBUztBQUM1QyxXQUFPLFFBQVEsSUFBSSxTQUFTLE9BQU8sU0FBUztBQUM1QyxXQUFPLFVBQVUsSUFBSSxXQUFXLE9BQU8sV0FBVztBQUNsRCxXQUFPLFFBQVEsSUFBSSxTQUFTLE9BQU8sU0FBUztBQUU1QyxVQUFNLE1BQU0sR0FBRyxPQUFPLFVBQVUsT0FBTztBQUV2QyxRQUFJLENBQUMsT0FBTyxNQUFNO0FBQ2hCLFVBQUksT0FBTyxRQUFRLEdBQUc7QUFDcEIsZUFBTyxPQUFPLFNBQVMsT0FBTyxNQUFNLE1BQU0sTUFBTSxHQUFHLE9BQU87QUFBQSxhQUNyRDtBQUNMLGVBQU8sT0FBTyxTQUFTLE9BQU8sTUFBTTtBQUFBO0FBQUE7QUFJeEMsUUFBSSxPQUFPLFNBQVMsT0FBTyxTQUFTO0FBQ2xDLGFBQU8sTUFBTSxPQUFPLE1BQU0sT0FBTztBQUFBO0FBR25DLFdBQU8sS0FBSyxPQUFPO0FBQUE7QUFHckIsU0FBTyxLQUFLLEtBQUssUUFBUSxPQUFLO0FBQzVCLFFBQUksS0FBSyxRQUFRLElBQUksSUFBSSxNQUFNLFFBQVE7QUFBQTtBQUd6QyxTQUFPO0FBQUE7QUFJVCxhQUFhLE1BQU0sUUFBUSxXQUFXLGFBQWE7QUFDakQsTUFBSSxPQUFPLFVBQVUsU0FBUyxLQUFLLFlBQVksbUJBQW1CO0FBQ2hFLFVBQU0sSUFBSSxNQUFNLDZDQUE2QyxPQUFPO0FBQUE7QUFHdEUsUUFBTSxjQUFjLFVBQVUsa0JBQWtCO0FBQ2hELFFBQU0sY0FBYyxVQUFVLGtCQUFrQjtBQUVoRCxNQUFJO0FBQ0YsVUFBTSxFQUFFLGtCQUFrQixtQkFBbUI7QUFBQSxNQUMzQztBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUE7QUFFRixVQUFNLFNBQVMsU0FBUyxNQUFNLE1BQU0sU0FBUyxJQUFJO0FBRWpELFFBQUksVUFBVSxvQkFBb0I7QUFDaEMsYUFBTztBQUFBLFFBQ0wsT0FBTyxRQUFRLE9BQU87QUFBQSxRQUN0QixTQUFTLE9BQU87QUFBQTtBQUFBO0FBSXBCLFdBQU87QUFBQSxXQUNBLEdBQVA7QUFDQSxRQUFJLEVBQUUsTUFBTTtBQUNWLFlBQU0sSUFBSSxNQUFNLEdBQUcsRUFBRSxlQUFlLEVBQUUsS0FBSyxLQUFLO0FBQUEsV0FDM0M7QUFDTCxZQUFNO0FBQUE7QUFBQTtBQUFBO0FBS1osSUFBTyxjQUFROyIsIm5hbWVzIjpbXX0=
