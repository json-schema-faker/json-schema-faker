const optionAPI = require("../api/option");
const random = require("./random");
const utils = require("./utils");
const buildResolveSchema = ({
  refs,
  schema,
  container,
  synchronous,
  refDepthMax,
  refDepthMin
}) => {
  const recursiveUtil = {};
  const seenRefs = {};
  let depth = 0;
  let lastRef;
  let lastPath;
  recursiveUtil.resolveSchema = (sub, index, rootPath) => {
    if (sub === null || sub === void 0) {
      return null;
    }
    if (typeof sub.generate === "function") {
      return sub;
    }
    const _id = sub.$id || sub.id;
    if (typeof _id === "string") {
      delete sub.id;
      delete sub.$id;
      delete sub.$schema;
    }
    if (typeof sub.$ref === "string") {
      const maxDepth = Math.max(refDepthMin, refDepthMax) - 1;
      if (sub.$ref === "#" || seenRefs[sub.$ref] < 0 || lastRef === sub.$ref && ++depth > maxDepth) {
        if (sub.$ref !== "#" && lastPath && lastPath.length === rootPath.length) {
          return utils.getLocalRef(schema, sub.$ref, synchronous && refs);
        }
        delete sub.$ref;
        return sub;
      }
      if (typeof seenRefs[sub.$ref] === "undefined") {
        seenRefs[sub.$ref] = random.number(refDepthMin, refDepthMax) - 1;
      }
      lastPath = rootPath;
      lastRef = sub.$ref;
      let ref;
      if (sub.$ref.indexOf("#/") === -1) {
        ref = refs[sub.$ref] || null;
      } else {
        ref = utils.getLocalRef(schema, sub.$ref, synchronous && refs) || null;
      }
      let fixed;
      if (typeof ref !== "undefined") {
        if (!ref && optionAPI("ignoreMissingRefs") !== true) {
          throw new Error(`Reference not found: ${sub.$ref}`);
        }
        seenRefs[sub.$ref] -= 1;
        utils.merge(sub, ref || {});
        fixed = synchronous && ref && ref.$ref;
      }
      if (!fixed)
        delete sub.$ref;
      return sub;
    }
    if (Array.isArray(sub.allOf)) {
      const schemas = sub.allOf;
      delete sub.allOf;
      schemas.forEach((subSchema) => {
        const _sub = recursiveUtil.resolveSchema(subSchema, null, rootPath);
        utils.merge(sub, typeof _sub.thunk === "function" ? _sub.thunk(sub) : _sub);
        if (Array.isArray(sub.allOf)) {
          recursiveUtil.resolveSchema(sub, index, rootPath);
        }
      });
    }
    if (Array.isArray(sub.oneOf || sub.anyOf)) {
      const mix = sub.oneOf || sub.anyOf;
      if (sub.enum && sub.oneOf) {
        sub.enum = sub.enum.filter((x) => utils.validate(x, mix));
      }
      return {
        thunk(rootSchema) {
          const copy = utils.omitProps(sub, ["anyOf", "oneOf"]);
          const fixed = random.pick(mix);
          utils.merge(copy, fixed);
          mix.forEach((omit) => {
            if (omit.required && omit !== fixed) {
              omit.required.forEach((key) => {
                const includesKey = copy.required && copy.required.includes(key);
                if (copy.properties && !includesKey) {
                  delete copy.properties[key];
                }
                if (rootSchema && rootSchema.properties) {
                  delete rootSchema.properties[key];
                }
              });
            }
          });
          return copy;
        }
      };
    }
    Object.keys(sub).forEach((prop) => {
      if ((Array.isArray(sub[prop]) || typeof sub[prop] === "object") && !utils.isKey(prop)) {
        sub[prop] = recursiveUtil.resolveSchema(sub[prop], prop, rootPath.concat(prop));
      }
    });
    if (rootPath) {
      const lastProp = rootPath[rootPath.length - 1];
      if (lastProp === "properties" || lastProp === "items") {
        return sub;
      }
    }
    return container.wrap(sub);
  };
  return recursiveUtil;
};
var buildResolveSchema_default = buildResolveSchema;
module.exports=buildResolveSchema_default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvY29yZS9idWlsZFJlc29sdmVTY2hlbWEuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG9wdGlvbkFQSSBmcm9tICcuLi9hcGkvb3B0aW9uJztcbmltcG9ydCByYW5kb20gZnJvbSAnLi9yYW5kb20nO1xuaW1wb3J0IHV0aWxzIGZyb20gJy4vdXRpbHMnO1xuXG5jb25zdCBidWlsZFJlc29sdmVTY2hlbWEgPSAoe1xuICByZWZzLFxuICBzY2hlbWEsXG4gIGNvbnRhaW5lcixcbiAgc3luY2hyb25vdXMsXG4gIHJlZkRlcHRoTWF4LFxuICByZWZEZXB0aE1pbixcbn0pID0+IHtcbiAgY29uc3QgcmVjdXJzaXZlVXRpbCA9IHt9O1xuICBjb25zdCBzZWVuUmVmcyA9IHt9O1xuXG4gIGxldCBkZXB0aCA9IDA7XG4gIGxldCBsYXN0UmVmO1xuICBsZXQgbGFzdFBhdGg7XG5cbiAgcmVjdXJzaXZlVXRpbC5yZXNvbHZlU2NoZW1hID0gKHN1YiwgaW5kZXgsIHJvb3RQYXRoKSA9PiB7XG4gICAgLy8gcHJldmVudCBudWxsIHN1YiBmcm9tIGRlZmF1bHQvZXhhbXBsZSBudWxsIHZhbHVlcyB0byB0aHJvd1xuICAgIGlmIChzdWIgPT09IG51bGwgfHwgc3ViID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2Ygc3ViLmdlbmVyYXRlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gc3ViO1xuICAgIH1cblxuICAgIC8vIGNsZWFudXBcbiAgICBjb25zdCBfaWQgPSBzdWIuJGlkIHx8IHN1Yi5pZDtcblxuICAgIGlmICh0eXBlb2YgX2lkID09PSAnc3RyaW5nJykge1xuICAgICAgZGVsZXRlIHN1Yi5pZDtcbiAgICAgIGRlbGV0ZSBzdWIuJGlkO1xuICAgICAgZGVsZXRlIHN1Yi4kc2NoZW1hO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2Ygc3ViLiRyZWYgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb25zdCBtYXhEZXB0aCA9IE1hdGgubWF4KHJlZkRlcHRoTWluLCByZWZEZXB0aE1heCkgLSAxO1xuXG4gICAgICAvLyBpbmNyZWFzaW5nIGRlcHRoIG9ubHkgZm9yIHJlcGVhdGVkIHJlZnMgc2VlbXMgdG8gYmUgZml4aW5nICMyNThcbiAgICAgIGlmIChzdWIuJHJlZiA9PT0gJyMnIHx8IHNlZW5SZWZzW3N1Yi4kcmVmXSA8IDAgfHwgKGxhc3RSZWYgPT09IHN1Yi4kcmVmICYmICsrZGVwdGggPiBtYXhEZXB0aCkpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICBpZiAoc3ViLiRyZWYgIT09ICcjJyAmJiBsYXN0UGF0aCAmJiBsYXN0UGF0aC5sZW5ndGggPT09IHJvb3RQYXRoLmxlbmd0aCkge1xuICAgICAgICAgIHJldHVybiB1dGlscy5nZXRMb2NhbFJlZihzY2hlbWEsIHN1Yi4kcmVmLCBzeW5jaHJvbm91cyAmJiByZWZzKTtcbiAgICAgICAgfVxuICAgICAgICBkZWxldGUgc3ViLiRyZWY7XG4gICAgICAgIHJldHVybiBzdWI7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2Ygc2VlblJlZnNbc3ViLiRyZWZdID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBzZWVuUmVmc1tzdWIuJHJlZl0gPSByYW5kb20ubnVtYmVyKHJlZkRlcHRoTWluLCByZWZEZXB0aE1heCkgLSAxO1xuICAgICAgfVxuXG4gICAgICBsYXN0UGF0aCA9IHJvb3RQYXRoO1xuICAgICAgbGFzdFJlZiA9IHN1Yi4kcmVmO1xuXG4gICAgICBsZXQgcmVmO1xuXG4gICAgICBpZiAoc3ViLiRyZWYuaW5kZXhPZignIy8nKSA9PT0gLTEpIHtcbiAgICAgICAgcmVmID0gcmVmc1tzdWIuJHJlZl0gfHwgbnVsbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlZiA9IHV0aWxzLmdldExvY2FsUmVmKHNjaGVtYSwgc3ViLiRyZWYsIHN5bmNocm9ub3VzICYmIHJlZnMpIHx8IG51bGw7XG4gICAgICB9XG5cbiAgICAgIGxldCBmaXhlZDtcbiAgICAgIGlmICh0eXBlb2YgcmVmICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBpZiAoIXJlZiAmJiBvcHRpb25BUEkoJ2lnbm9yZU1pc3NpbmdSZWZzJykgIT09IHRydWUpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFJlZmVyZW5jZSBub3QgZm91bmQ6ICR7c3ViLiRyZWZ9YCk7XG4gICAgICAgIH1cblxuICAgICAgICBzZWVuUmVmc1tzdWIuJHJlZl0gLT0gMTtcbiAgICAgICAgdXRpbHMubWVyZ2Uoc3ViLCByZWYgfHwge30pO1xuICAgICAgICBmaXhlZCA9IHN5bmNocm9ub3VzICYmIHJlZiAmJiByZWYuJHJlZjtcbiAgICAgIH1cblxuICAgICAgLy8ganVzdCByZW1vdmUgdGhlIHJlZmVyZW5jZVxuICAgICAgaWYgKCFmaXhlZCkgZGVsZXRlIHN1Yi4kcmVmO1xuICAgICAgcmV0dXJuIHN1YjtcbiAgICB9XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheShzdWIuYWxsT2YpKSB7XG4gICAgICBjb25zdCBzY2hlbWFzID0gc3ViLmFsbE9mO1xuXG4gICAgICBkZWxldGUgc3ViLmFsbE9mO1xuXG4gICAgICAvLyB0aGlzIGlzIHRoZSBvbmx5IGNhc2Ugd2hlcmUgYWxsIHN1Yi1zY2hlbWFzXG4gICAgICAvLyBtdXN0IGJlIHJlc29sdmVkIGJlZm9yZSBhbnkgbWVyZ2VcbiAgICAgIHNjaGVtYXMuZm9yRWFjaChzdWJTY2hlbWEgPT4ge1xuICAgICAgICBjb25zdCBfc3ViID0gcmVjdXJzaXZlVXRpbC5yZXNvbHZlU2NoZW1hKHN1YlNjaGVtYSwgbnVsbCwgcm9vdFBhdGgpO1xuXG4gICAgICAgIC8vIGNhbGwgZ2l2ZW4gdGh1bmtzIGlmIHByZXNlbnRcbiAgICAgICAgdXRpbHMubWVyZ2Uoc3ViLCB0eXBlb2YgX3N1Yi50aHVuayA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICAgID8gX3N1Yi50aHVuayhzdWIpXG4gICAgICAgICAgOiBfc3ViKTtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoc3ViLmFsbE9mKSkge1xuICAgICAgICAgIHJlY3Vyc2l2ZVV0aWwucmVzb2x2ZVNjaGVtYShzdWIsIGluZGV4LCByb290UGF0aCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChBcnJheS5pc0FycmF5KHN1Yi5vbmVPZiB8fCBzdWIuYW55T2YpKSB7XG4gICAgICBjb25zdCBtaXggPSBzdWIub25lT2YgfHwgc3ViLmFueU9mO1xuXG4gICAgICAvLyB0ZXN0IGV2ZXJ5IHZhbHVlIGZyb20gdGhlIGVudW0gYWdhaW5zdCBlYWNoLW9uZU9mXG4gICAgICAvLyBzY2hlbWEsIG9ubHkgdmFsdWVzIHRoYXQgdmFsaWRhdGUgb25jZSBhcmUga2VwdFxuICAgICAgaWYgKHN1Yi5lbnVtICYmIHN1Yi5vbmVPZikge1xuICAgICAgICBzdWIuZW51bSA9IHN1Yi5lbnVtLmZpbHRlcih4ID0+IHV0aWxzLnZhbGlkYXRlKHgsIG1peCkpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICB0aHVuayhyb290U2NoZW1hKSB7XG4gICAgICAgICAgY29uc3QgY29weSA9IHV0aWxzLm9taXRQcm9wcyhzdWIsIFsnYW55T2YnLCAnb25lT2YnXSk7XG4gICAgICAgICAgY29uc3QgZml4ZWQgPSByYW5kb20ucGljayhtaXgpO1xuXG4gICAgICAgICAgdXRpbHMubWVyZ2UoY29weSwgZml4ZWQpO1xuXG4gICAgICAgICAgLy8gcmVtb3ZlIGFkZGl0aW9uYWwgcHJvcGVydGllcyBmcm9tIG1lcmdlZCBzY2hlbWFzXG4gICAgICAgICAgbWl4LmZvckVhY2gob21pdCA9PiB7XG4gICAgICAgICAgICBpZiAob21pdC5yZXF1aXJlZCAmJiBvbWl0ICE9PSBmaXhlZCkge1xuICAgICAgICAgICAgICBvbWl0LnJlcXVpcmVkLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbmNsdWRlc0tleSA9IGNvcHkucmVxdWlyZWQgJiYgY29weS5yZXF1aXJlZC5pbmNsdWRlcyhrZXkpO1xuICAgICAgICAgICAgICAgIGlmIChjb3B5LnByb3BlcnRpZXMgJiYgIWluY2x1ZGVzS2V5KSB7XG4gICAgICAgICAgICAgICAgICBkZWxldGUgY29weS5wcm9wZXJ0aWVzW2tleV07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHJvb3RTY2hlbWEgJiYgcm9vdFNjaGVtYS5wcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICAgICAgICBkZWxldGUgcm9vdFNjaGVtYS5wcm9wZXJ0aWVzW2tleV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHJldHVybiBjb3B5O1xuICAgICAgICB9LFxuICAgICAgfTtcbiAgICB9XG5cbiAgICBPYmplY3Qua2V5cyhzdWIpLmZvckVhY2gocHJvcCA9PiB7XG4gICAgICBpZiAoKEFycmF5LmlzQXJyYXkoc3ViW3Byb3BdKSB8fCB0eXBlb2Ygc3ViW3Byb3BdID09PSAnb2JqZWN0JykgJiYgIXV0aWxzLmlzS2V5KHByb3ApKSB7XG4gICAgICAgIHN1Yltwcm9wXSA9IHJlY3Vyc2l2ZVV0aWwucmVzb2x2ZVNjaGVtYShzdWJbcHJvcF0sIHByb3AsIHJvb3RQYXRoLmNvbmNhdChwcm9wKSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBhdm9pZCBleHRyYSBjYWxscyBvbiBzdWItc2NoZW1hcywgZml4ZXMgIzQ1OFxuICAgIGlmIChyb290UGF0aCkge1xuICAgICAgY29uc3QgbGFzdFByb3AgPSByb290UGF0aFtyb290UGF0aC5sZW5ndGggLSAxXTtcblxuICAgICAgaWYgKGxhc3RQcm9wID09PSAncHJvcGVydGllcycgfHwgbGFzdFByb3AgPT09ICdpdGVtcycpIHtcbiAgICAgICAgcmV0dXJuIHN1YjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY29udGFpbmVyLndyYXAoc3ViKTtcbiAgfTtcblxuICByZXR1cm4gcmVjdXJzaXZlVXRpbDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGJ1aWxkUmVzb2x2ZVNjaGVtYTtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBRUEsTUFBTSxxQkFBcUIsQ0FBQztBQUFBLEVBQzFCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxNQUNJO0FBQ0osUUFBTSxnQkFBZ0I7QUFDdEIsUUFBTSxXQUFXO0FBRWpCLE1BQUksUUFBUTtBQUNaLE1BQUk7QUFDSixNQUFJO0FBRUosZ0JBQWMsZ0JBQWdCLENBQUMsS0FBSyxPQUFPLGFBQWE7QUFFdEQsUUFBSSxRQUFRLFFBQVEsUUFBUSxRQUFXO0FBQ3JDLGFBQU87QUFBQTtBQUdULFFBQUksT0FBTyxJQUFJLGFBQWEsWUFBWTtBQUN0QyxhQUFPO0FBQUE7QUFJVCxVQUFNLE1BQU0sSUFBSSxPQUFPLElBQUk7QUFFM0IsUUFBSSxPQUFPLFFBQVEsVUFBVTtBQUMzQixhQUFPLElBQUk7QUFDWCxhQUFPLElBQUk7QUFDWCxhQUFPLElBQUk7QUFBQTtBQUdiLFFBQUksT0FBTyxJQUFJLFNBQVMsVUFBVTtBQUNoQyxZQUFNLFdBQVcsS0FBSyxJQUFJLGFBQWEsZUFBZTtBQUd0RCxVQUFJLElBQUksU0FBUyxPQUFPLFNBQVMsSUFBSSxRQUFRLEtBQU0sWUFBWSxJQUFJLFFBQVEsRUFBRSxRQUFRLFVBQVc7QUFDOUYsWUFBSSxJQUFJLFNBQVMsT0FBTyxZQUFZLFNBQVMsV0FBVyxTQUFTLFFBQVE7QUFDdkUsaUJBQU8sTUFBTSxZQUFZLFFBQVEsSUFBSSxNQUFNLGVBQWU7QUFBQTtBQUU1RCxlQUFPLElBQUk7QUFDWCxlQUFPO0FBQUE7QUFHVCxVQUFJLE9BQU8sU0FBUyxJQUFJLFVBQVUsYUFBYTtBQUM3QyxpQkFBUyxJQUFJLFFBQVEsT0FBTyxPQUFP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
