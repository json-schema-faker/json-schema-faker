const { getDependencies } = require("./vendor");
const Container = require("./class/Container");
const format = require("./api/format");
const option = require("./api/option");
const env = require("./core/constants");
const random = require("./core/random");
const utils = require("./core/utils");
const run = require("./core/run");
const { renderJS, renderYAML } = require("./renderers");
const container = new Container();
function setupKeywords() {
  container.define("autoIncrement", function autoIncrement(value, schema) {
    if (!this.offset) {
      const min = schema.minimum || 1;
      const max = min + env.MAX_NUMBER;
      const offset = value.initialOffset || schema.initialOffset;
      this.offset = offset || random.number(min, max);
    }
    if (value === true) {
      return this.offset++;
    }
    return schema;
  });
  container.define("sequentialDate", function sequentialDate(value, schema) {
    if (!this.now) {
      this.now = random.date();
    }
    if (value) {
      schema = this.now.toISOString();
      value = value === true ? "days" : value;
      if (["seconds", "minutes", "hours", "days", "weeks", "months", "years"].indexOf(value) === -1) {
        throw new Error(`Unsupported increment by ${utils.short(value)}`);
      }
      this.now.setTime(this.now.getTime() + random.date(value));
    }
    return schema;
  });
}
function getRefs(refs, schema) {
  let $refs = {};
  if (Array.isArray(refs)) {
    refs.forEach((_schema) => {
      $refs[_schema.$id || _schema.id] = _schema;
    });
  } else {
    $refs = refs || {};
  }
  function walk(obj) {
    if (!obj || typeof obj !== "object")
      return;
    if (Array.isArray(obj))
      return obj.forEach(walk);
    const _id = obj.$id || obj.id;
    if (typeof _id === "string" && !$refs[_id]) {
      $refs[_id] = obj;
    }
    Object.keys(obj).forEach((key) => {
      walk(obj[key]);
    });
  }
  walk(refs);
  walk(schema);
  return $refs;
}
const jsf = (schema, refs, cwd) => {
  console.log("[json-schema-faker] calling JsonSchemaFaker() is deprecated, call either .generate() or .resolve()");
  if (cwd) {
    console.log("[json-schema-faker] references are only supported by calling .resolve()");
  }
  return jsf.generate(schema, refs);
};
jsf.generateWithContext = (schema, refs) => {
  const $refs = getRefs(refs, schema);
  return run($refs, schema, container, true);
};
jsf.generate = (schema, refs) => renderJS(jsf.generateWithContext(schema, refs));
jsf.generateYAML = (schema, refs) => renderYAML(jsf.generateWithContext(schema, refs));
jsf.resolveWithContext = (schema, refs, cwd) => {
  if (typeof refs === "string") {
    cwd = refs;
    refs = {};
  }
  cwd = cwd || (typeof process !== "undefined" ? process.cwd() : "");
  cwd = `${cwd.replace(/\/+$/, "")}/`;
  const $refs = getRefs(refs, schema);
  const fixedRefs = {
    order: 1,
    canRead(file) {
      const key = file.url.replace("/:", ":");
      return $refs[key] || $refs[key.split("/").pop()];
    },
    read(file, callback) {
      try {
        callback(null, this.canRead(file));
      } catch (e) {
        callback(e);
      }
    }
  };
  const { $RefParser } = getDependencies();
  return $RefParser.bundle(cwd, schema, {
    resolve: {
      file: { order: 100 },
      http: { order: 200 },
      fixedRefs
    },
    dereference: {
      circular: "ignore"
    }
  }).then((sub) => run($refs, sub, container)).catch((e) => {
    throw new Error(`Error while resolving schema (${e.message})`);
  });
};
jsf.resolve = (schema, refs, cwd) => jsf.resolveWithContext(schema, refs, cwd).then(renderJS);
jsf.resolveYAML = (schema, refs, cwd) => jsf.resolveWithContext(schema, refs, cwd).then(renderYAML);
setupKeywords();
jsf.format = format;
jsf.option = option;
jsf.random = random;
jsf.extend = (name, cb) => {
  container.extend(name, cb);
  return jsf;
};
jsf.define = (name, cb) => {
  container.define(name, cb);
  return jsf;
};
jsf.reset = (name) => {
  container.reset(name);
  setupKeywords();
  return jsf;
};
jsf.locate = (name) => {
  return container.get(name);
};
var VERSION = "0.5.0-rcv.35";
if (typeof VERSION !== "undefined") {
  jsf.VERSION = VERSION;
}
var lib_default = jsf;
module.exports=lib_default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0RGVwZW5kZW5jaWVzIH0gZnJvbSAnLi92ZW5kb3InO1xuaW1wb3J0IENvbnRhaW5lciBmcm9tICcuL2NsYXNzL0NvbnRhaW5lcic7XG5pbXBvcnQgZm9ybWF0IGZyb20gJy4vYXBpL2Zvcm1hdCc7XG5pbXBvcnQgb3B0aW9uIGZyb20gJy4vYXBpL29wdGlvbic7XG5pbXBvcnQgZW52IGZyb20gJy4vY29yZS9jb25zdGFudHMnO1xuaW1wb3J0IHJhbmRvbSBmcm9tICcuL2NvcmUvcmFuZG9tJztcbmltcG9ydCB1dGlscyBmcm9tICcuL2NvcmUvdXRpbHMnO1xuaW1wb3J0IHJ1biBmcm9tICcuL2NvcmUvcnVuJztcbmltcG9ydCB7IHJlbmRlckpTLCByZW5kZXJZQU1MIH0gZnJvbSAnLi9yZW5kZXJlcnMnO1xuXG5jb25zdCBjb250YWluZXIgPSBuZXcgQ29udGFpbmVyKCk7XG5cbmZ1bmN0aW9uIHNldHVwS2V5d29yZHMoKSB7XG4gIC8vIHNhZmUgYXV0by1pbmNyZW1lbnQgdmFsdWVzXG4gIGNvbnRhaW5lci5kZWZpbmUoJ2F1dG9JbmNyZW1lbnQnLCBmdW5jdGlvbiBhdXRvSW5jcmVtZW50KHZhbHVlLCBzY2hlbWEpIHtcbiAgICBpZiAoIXRoaXMub2Zmc2V0KSB7XG4gICAgICBjb25zdCBtaW4gPSBzY2hlbWEubWluaW11bSB8fCAxO1xuICAgICAgY29uc3QgbWF4ID0gbWluICsgZW52Lk1BWF9OVU1CRVI7XG4gICAgICBjb25zdCBvZmZzZXQgPSB2YWx1ZS5pbml0aWFsT2Zmc2V0IHx8IHNjaGVtYS5pbml0aWFsT2Zmc2V0O1xuXG4gICAgICB0aGlzLm9mZnNldCA9IG9mZnNldCB8fCByYW5kb20ubnVtYmVyKG1pbiwgbWF4KTtcbiAgICB9XG5cbiAgICBpZiAodmFsdWUgPT09IHRydWUpIHtcbiAgICAgIHJldHVybiB0aGlzLm9mZnNldCsrOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgfVxuXG4gICAgcmV0dXJuIHNjaGVtYTtcbiAgfSk7XG5cbiAgLy8gc2FmZS1hbmQtc2VxdWVudGlhbCBkYXRlc1xuICBjb250YWluZXIuZGVmaW5lKCdzZXF1ZW50aWFsRGF0ZScsIGZ1bmN0aW9uIHNlcXVlbnRpYWxEYXRlKHZhbHVlLCBzY2hlbWEpIHtcbiAgICBpZiAoIXRoaXMubm93KSB7XG4gICAgICB0aGlzLm5vdyA9IHJhbmRvbS5kYXRlKCk7XG4gICAgfVxuXG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICBzY2hlbWEgPSB0aGlzLm5vdy50b0lTT1N0cmluZygpO1xuICAgICAgdmFsdWUgPSB2YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICA/ICdkYXlzJ1xuICAgICAgICA6IHZhbHVlO1xuXG4gICAgICBpZiAoWydzZWNvbmRzJywgJ21pbnV0ZXMnLCAnaG91cnMnLCAnZGF5cycsICd3ZWVrcycsICdtb250aHMnLCAneWVhcnMnXS5pbmRleE9mKHZhbHVlKSA9PT0gLTEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbnN1cHBvcnRlZCBpbmNyZW1lbnQgYnkgJHt1dGlscy5zaG9ydCh2YWx1ZSl9YCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMubm93LnNldFRpbWUodGhpcy5ub3cuZ2V0VGltZSgpICsgcmFuZG9tLmRhdGUodmFsdWUpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2NoZW1hO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZ2V0UmVmcyhyZWZzLCBzY2hlbWEpIHtcbiAgbGV0ICRyZWZzID0ge307XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkocmVmcykpIHtcbiAgICByZWZzLmZvckVhY2goX3NjaGVtYSA9PiB7XG4gICAgICAkcmVmc1tfc2NoZW1hLiRpZCB8fCBfc2NoZW1hLmlkXSA9IF9zY2hlbWE7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgJHJlZnMgPSByZWZzIHx8IHt9O1xuICB9XG5cbiAgZnVuY3Rpb24gd2FsayhvYmopIHtcbiAgICBpZiAoIW9iaiB8fCB0eXBlb2Ygb2JqICE9PSAnb2JqZWN0JykgcmV0dXJuO1xuICAgIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHJldHVybiBvYmouZm9yRWFjaCh3YWxrKTtcblxuICAgIGNvbnN0IF9pZCA9IG9iai4kaWQgfHwgb2JqLmlkO1xuXG4gICAgaWYgKHR5cGVvZiBfaWQgPT09ICdzdHJpbmcnICYmICEkcmVmc1tfaWRdKSB7XG4gICAgICAkcmVmc1tfaWRdID0gb2JqO1xuICAgIH1cblxuICAgIE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgd2FsayhvYmpba2V5XSk7XG4gICAgfSk7XG4gIH1cblxuICB3YWxrKHJlZnMpO1xuICB3YWxrKHNjaGVtYSk7XG5cbiAgcmV0dXJuICRyZWZzO1xufVxuXG5jb25zdCBqc2YgPSAoc2NoZW1hLCByZWZzLCBjd2QpID0+IHtcbiAgY29uc29sZS5sb2coJ1tqc29uLXNjaGVtYS1mYWtlcl0gY2FsbGluZyBKc29uU2NoZW1hRmFrZXIoKSBpcyBkZXByZWNhdGVkLCBjYWxsIGVpdGhlciAuZ2VuZXJhdGUoKSBvciAucmVzb2x2ZSgpJyk7XG5cbiAgaWYgKGN3ZCkge1xuICAgIGNvbnNvbGUubG9nKCdbanNvbi1zY2hlbWEtZmFrZXJdIHJlZmVyZW5jZXMgYXJlIG9ubHkgc3VwcG9ydGVkIGJ5IGNhbGxpbmcgLnJlc29sdmUoKScpO1xuICB9XG5cbiAgcmV0dXJuIGpzZi5nZW5lcmF0ZShzY2hlbWEsIHJlZnMpO1xufTtcblxuanNmLmdlbmVyYXRlV2l0aENvbnRleHQgPSAoc2NoZW1hLCByZWZzKSA9PiB7XG4gIGNvbnN0ICRyZWZzID0gZ2V0UmVmcyhyZWZzLCBzY2hlbWEpO1xuXG4gIHJldHVybiBydW4oJHJlZnMsIHNjaGVtYSwgY29udGFpbmVyLCB0cnVlKTtcbn07XG5cbmpzZi5nZW5lcmF0ZSA9IChzY2hlbWEsIHJlZnMpID0+IHJlbmRlckpTKFxuICAgIGpzZi5nZW5lcmF0ZVdpdGhDb250ZXh0KHNjaGVtYSwgcmVmcyksXG4gICk7XG5cbmpzZi5nZW5lcmF0ZVlBTUwgPSAoc2NoZW1hLCByZWZzKSA9PiByZW5kZXJZQU1MKFxuICAgIGpzZi5nZW5lcmF0ZVdpdGhDb250ZXh0KHNjaGVtYSwgcmVmcyksXG4gICk7XG5cbmpzZi5yZXNvbHZlV2l0aENvbnRleHQgPSAoc2NoZW1hLCByZWZzLCBjd2QpID0+IHtcbiAgaWYgKHR5cGVvZiByZWZzID09PSAnc3RyaW5nJykge1xuICAgIGN3ZCA9IHJlZnM7XG4gICAgcmVmcyA9IHt9O1xuICB9XG5cbiAgLy8gbm9ybWFsaXplIGJhc2VkaXIgKGJyb3dzZXIgYXdhcmUpXG4gIGN3ZCA9IGN3ZCB8fCAodHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnID8gcHJvY2Vzcy5jd2QoKSA6ICcnKTtcbiAgY3dkID0gYCR7Y3dkLnJlcGxhY2UoL1xcLyskLywgJycpfS9gO1xuXG4gIGNvbnN0ICRyZWZzID0gZ2V0UmVmcyhyZWZzLCBzY2hlbWEpO1xuXG4gIC8vIGlkZW50aWNhbCBzZXR1cCBhcyBqc29uLXNjaGVtYS1zZXF1ZWxpemVyXG4gIGNvbnN0IGZpeGVkUmVmcyA9IHtcbiAgICBvcmRlcjogMSxcbiAgICBjYW5SZWFkKGZpbGUpIHtcbiAgICAgIGNvbnN0IGtleSA9IGZpbGUudXJsLnJlcGxhY2UoJy86JywgJzonKTtcblxuICAgICAgcmV0dXJuICRyZWZzW2tleV0gfHwgJHJlZnNba2V5LnNwbGl0KCcvJykucG9wKCldO1xuICAgIH0sXG4gICAgcmVhZChmaWxlLCBjYWxsYmFjaykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY2FsbGJhY2sobnVsbCwgdGhpcy5jYW5SZWFkKGZpbGUpKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FsbGJhY2soZSk7XG4gICAgICB9XG4gICAgfSxcbiAgfTtcblxuICBjb25zdCB7ICRSZWZQYXJzZXIgfSA9IGdldERlcGVuZGVuY2llcygpO1xuXG4gIHJldHVybiAkUmVmUGFyc2VyXG4gICAgLmJ1bmRsZShjd2QsIHNjaGVtYSwge1xuICAgICAgcmVzb2x2ZToge1xuICAgICAgICBmaWxlOiB7IG9yZGVyOiAxMDAgfSxcbiAgICAgICAgaHR0cDogeyBvcmRlcjogMjAwIH0sXG4gICAgICAgIGZpeGVkUmVmcyxcbiAgICAgIH0sXG4gICAgICBkZXJlZmVyZW5jZToge1xuICAgICAgICBjaXJjdWxhcjogJ2lnbm9yZScsXG4gICAgICB9LFxuICAgIH0pLnRoZW4oc3ViID0+IHJ1bigkcmVmcywgc3ViLCBjb250YWluZXIpKVxuICAgIC5jYXRjaChlID0+IHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRXJyb3Igd2hpbGUgcmVzb2x2aW5nIHNjaGVtYSAoJHtlLm1lc3NhZ2V9KWApO1xuICAgIH0pO1xufTtcblxuanNmLnJlc29sdmUgPSAoc2NoZW1hLCByZWZzLCBjd2QpID0+IGpzZi5yZXNvbHZlV2l0aENvbnRleHQoc2NoZW1hLCByZWZzLCBjd2QpLnRoZW4ocmVuZGVySlMpO1xuXG5qc2YucmVzb2x2ZVlBTUwgPSAoc2NoZW1hLCByZWZzLCBjd2QpID0+IGpzZi5yZXNvbHZlV2l0aENvbnRleHQoc2NoZW1hLCByZWZzLCBjd2QpLnRoZW4ocmVuZGVyWUFNTCk7XG5cbnNldHVwS2V5d29yZHMoKTtcblxuanNmLmZvcm1hdCA9IGZvcm1hdDtcbmpzZi5vcHRpb24gPSBvcHRpb247XG5qc2YucmFuZG9tID0gcmFuZG9tO1xuXG4vLyByZXR1cm5zIGl0c2VsZiBmb3IgY2hhaW5pbmdcbmpzZi5leHRlbmQgPSAobmFtZSwgY2IpID0+IHtcbiAgY29udGFpbmVyLmV4dGVuZChuYW1lLCBjYik7XG4gIHJldHVybiBqc2Y7XG59O1xuXG5qc2YuZGVmaW5lID0gKG5hbWUsIGNiKSA9PiB7XG4gIGNvbnRhaW5lci5kZWZpbmUobmFtZSwgY2IpO1xuICByZXR1cm4ganNmO1xufTtcblxuanNmLnJlc2V0ID0gbmFtZSA9PiB7XG4gIGNvbnRhaW5lci5yZXNldChuYW1lKTtcbiAgc2V0dXBLZXl3b3JkcygpO1xuICByZXR1cm4ganNmO1xufTtcblxuanNmLmxvY2F0ZSA9IG5hbWUgPT4ge1xuICByZXR1cm4gY29udGFpbmVyLmdldChuYW1lKTtcbn07XG5cbnZhciBWRVJTSU9OPVwiMC41LjAtcmN2LjM1XCI7XG5pZiAodHlwZW9mIFZFUlNJT04gIT09ICd1bmRlZmluZWQnKSB7XG4gIGpzZi5WRVJTSU9OID0gVkVSU0lPTjtcbn1cblxuZXhwb3J0IGRlZmF1bHQganNmO1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQSxNQUFNLFlBQVksSUFBSTtBQUV0Qix5QkFBeUI7QUFFdkIsWUFBVSxPQUFPLGlCQUFpQix1QkFBdUIsT0FBTyxRQUFRO0FBQ3RFLFFBQUksQ0FBQyxLQUFLLFFBQVE7QUFDaEIsWUFBTSxNQUFNLE9BQU8sV0FBVztBQUM5QixZQUFNLE1BQU0sTUFBTSxJQUFJO0FBQ3RCLFlBQU0sU0FBUyxNQUFNLGlCQUFpQixPQUFPO0FBRTdDLFdBQUssU0FBUyxVQUFVLE9BQU8sT0FBTyxLQUFLO0FBQUE7QUFHN0MsUUFBSSxVQUFVLE1BQU07QUFDbEIsYUFBTyxLQUFLO0FBQUE7QUFHZCxXQUFPO0FBQUE7QUFJVCxZQUFVLE9BQU8sa0JBQWtCLHdCQUF3QixPQUFPLFFBQVE7QUFDeEUsUUFBSSxDQUFDLEtBQUssS0FBSztBQUNiLFdBQUssTUFBTSxPQUFPO0FBQUE7QUFHcEIsUUFBSSxPQUFPO0FBQ1QsZUFBUyxLQUFLLElBQUk7QUFDbEIsY0FBUSxVQUFVLE9BQ2QsU0FDQTtBQUVKLFVBQUksQ0FBQyxXQUFXLFdBQVcsU0FBUyxRQUFRLFNBQVMsVUFBVSxTQUFTLFFBQVEsV0FBVyxJQUFJO0FBQzdGLGNBQU0sSUFBSSxNQUFNLDRCQUE0QixNQUFNLE1BQU07QUFBQTtBQUcxRCxXQUFLLElBQUksUUFBUSxLQUFLLElBQUksWUFBWSxPQUFPLEtBQUs7QUFBQTtBQUdwRCxXQUFPO0FB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
