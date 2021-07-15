import util from "../core/utils";
function proxy(gen) {
  return (value, schema, property, rootSchema) => {
    let fn = value;
    let args = [];
    if (typeof value === "object") {
      fn = Object.keys(value)[0];
      if (Array.isArray(value[fn])) {
        args = value[fn];
      } else {
        args.push(value[fn]);
      }
    }
    const props = fn.split(".");
    let ctx = gen();
    while (props.length > 1) {
      ctx = ctx[props.shift()];
    }
    value = typeof ctx === "object" ? ctx[props[0]] : ctx;
    if (typeof value === "function") {
      value = value.apply(ctx, args.map((x) => util.template(x, rootSchema)));
    }
    if (Object.prototype.toString.call(value) === "[object Object]") {
      Object.keys(value).forEach((key) => {
        if (typeof value[key] === "function") {
          throw new Error(`Cannot resolve value for '${property}: ${fn}', given: ${value}`);
        }
      });
    }
    return value;
  };
}
class Container {
  constructor() {
    this.registry = {};
    this.support = {};
  }
  reset(name) {
    if (!name) {
      this.registry = {};
      this.support = {};
    } else {
      delete this.registry[name];
      delete this.support[name];
    }
  }
  extend(name, callback) {
    this.registry[name] = callback(this.registry[name]);
    if (!this.support[name]) {
      this.support[name] = proxy(() => this.registry[name]);
    }
  }
  define(name, callback) {
    this.support[name] = callback;
  }
  get(name) {
    if (typeof this.registry[name] === "undefined") {
      throw new ReferenceError(`'${name}' dependency doesn't exist.`);
    }
    return this.registry[name];
  }
  wrap(schema) {
    if (!("generate" in schema)) {
      const keys = Object.keys(schema);
      const context = {};
      let length = keys.length;
      while (length--) {
        const fn = keys[length].replace(/^x-/, "");
        const gen = this.support[fn];
        if (typeof gen === "function") {
          Object.defineProperty(schema, "generate", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: (rootSchema, key) => gen.call(context, schema[keys[length]], schema, keys[length], rootSchema, key.slice())
          });
          break;
        }
      }
    }
    return schema;
  }
}
var Container_default = Container;
module.exports=Container_default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvY2xhc3MvQ29udGFpbmVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB1dGlsIGZyb20gJy4uL2NvcmUvdXRpbHMnO1xuXG4vLyBkeW5hbWljIHByb3h5IGZvciBjdXN0b20gZ2VuZXJhdG9yc1xuZnVuY3Rpb24gcHJveHkoZ2VuKSB7XG4gIHJldHVybiAodmFsdWUsIHNjaGVtYSwgcHJvcGVydHksIHJvb3RTY2hlbWEpID0+IHtcbiAgICBsZXQgZm4gPSB2YWx1ZTtcbiAgICBsZXQgYXJncyA9IFtdO1xuXG4gICAgLy8gc3VwcG9ydCBmb3IgbmVzdGVkIG9iamVjdCwgZmlyc3Qta2V5IGlzIHRoZSBnZW5lcmF0b3JcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgZm4gPSBPYmplY3Qua2V5cyh2YWx1ZSlbMF07XG5cbiAgICAgIC8vIHRyZWF0IHRoZSBnaXZlbiBhcnJheSBhcyBhcmd1bWVudHMsXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZVtmbl0pKSB7XG4gICAgICAgIC8vIGlmIHRoZSBnZW5lcmF0b3IgaXMgZXhwZWN0aW5nIGFycmF5cyB0aGV5IHNob3VsZCBiZSBuZXN0ZWQsIGUuZy4gYFtbMSwgMiwgM10sIHRydWUsIC4uLl1gXG4gICAgICAgIGFyZ3MgPSB2YWx1ZVtmbl07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhcmdzLnB1c2godmFsdWVbZm5dKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBzdXBwb3J0IGZvciBrZXlwYXRocywgZS5nLiBcImludGVybmV0LmVtYWlsXCJcbiAgICBjb25zdCBwcm9wcyA9IGZuLnNwbGl0KCcuJyk7XG5cbiAgICAvLyByZXRyaWV2ZSBhIGZyZXNoIGRlcGVuZGVuY3lcbiAgICBsZXQgY3R4ID0gZ2VuKCk7XG5cbiAgICB3aGlsZSAocHJvcHMubGVuZ3RoID4gMSkge1xuICAgICAgY3R4ID0gY3R4W3Byb3BzLnNoaWZ0KCldO1xuICAgIH1cblxuICAgIC8vIHJldHJpZXZlIGxhc3QgdmFsdWUgZnJvbSBjb250ZXh0IG9iamVjdFxuICAgIHZhbHVlID0gdHlwZW9mIGN0eCA9PT0gJ29iamVjdCcgPyBjdHhbcHJvcHNbMF1dIDogY3R4O1xuXG4gICAgLy8gaW52b2tlIGR5bmFtaWMgZ2VuZXJhdG9yc1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHZhbHVlID0gdmFsdWUuYXBwbHkoY3R4LCBhcmdzLm1hcCh4ID0+IHV0aWwudGVtcGxhdGUoeCwgcm9vdFNjaGVtYSkpKTtcbiAgICB9XG5cbiAgICAvLyB0ZXN0IGZvciBwZW5kaW5nIGNhbGxiYWNrc1xuICAgIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpID09PSAnW29iamVjdCBPYmplY3RdJykge1xuICAgICAgT2JqZWN0LmtleXModmFsdWUpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZVtrZXldID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3QgcmVzb2x2ZSB2YWx1ZSBmb3IgJyR7cHJvcGVydHl9OiAke2ZufScsIGdpdmVuOiAke3ZhbHVlfWApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWU7XG4gIH07XG59XG5cbi8qKlxuICogQ29udGFpbmVyIGlzIHVzZWQgdG8gd3JhcCBleHRlcm5hbCBnZW5lcmF0b3JzIChmYWtlciwgY2hhbmNlLCBjYXN1YWwsIGV0Yy4pIGFuZCBpdHMgZGVwZW5kZW5jaWVzLlxuICpcbiAqIC0gYGpzZi5leHRlbmQoJ2Zha2VyJylgIHdpbGwgZW5oYW5jZSBvciBkZWZpbmUgdGhlIGdpdmVuIGRlcGVuZGVuY3kuXG4gKiAtIGBqc2YuZGVmaW5lKCdmYWtlcicpYCB3aWxsIHByb3ZpZGUgdGhlIFwiZmFrZXJcIiBrZXl3b3JkIHN1cHBvcnQuXG4gKlxuICogUmFuZEV4cCBpcyBub3QgbG9uZ2VyIGNvbnNpZGVyZWQgYW4gXCJleHRlbnNpb25cIi5cbiAqL1xuY2xhc3MgQ29udGFpbmVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgLy8gZHluYW1pYyByZXF1aXJlcyAtIGhhbmRsZSBhbGwgZGVwZW5kZW5jaWVzXG4gICAgLy8gdGhleSB3aWxsIE5PVCBiZSBpbmNsdWRlZCBvbiB0aGUgYnVuZGxlXG4gICAgdGhpcy5yZWdpc3RyeSA9IHt9O1xuICAgIHRoaXMuc3VwcG9ydCA9IHt9O1xuICB9XG5cbiAgLyoqXG4gICAqIFVucmVnaXN0ZXIgZXh0ZW5zaW9uc1xuICAgKiBAcGFyYW0gbmFtZVxuICAgKi9cbiAgcmVzZXQobmFtZSkge1xuICAgIGlmICghbmFtZSkge1xuICAgICAgdGhpcy5yZWdpc3RyeSA9IHt9O1xuICAgICAgdGhpcy5zdXBwb3J0ID0ge307XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSB0aGlzLnJlZ2lzdHJ5W25hbWVdO1xuICAgICAgZGVsZXRlIHRoaXMuc3VwcG9ydFtuYW1lXTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogT3ZlcnJpZGUgZGVwZW5kZW5jeSBnaXZlbiBieSBuYW1lXG4gICAqIEBwYXJhbSBuYW1lXG4gICAqIEBwYXJhbSBjYWxsYmFja1xuICAgKi9cbiAgZXh0ZW5kKG5hbWUsIGNhbGxiYWNrKSB7XG4gICAgdGhpcy5yZWdpc3RyeVtuYW1lXSA9IGNhbGxiYWNrKHRoaXMucmVnaXN0cnlbbmFtZV0pO1xuXG4gICAgLy8gYnVpbHQtaW4gcHJveHkgKGNhbiBiZSBvdmVycmlkZGVuKVxuICAgIGlmICghdGhpcy5zdXBwb3J0W25hbWVdKSB7XG4gICAgICB0aGlzLnN1cHBvcnRbbmFtZV0gPSBwcm94eSgoKSA9PiB0aGlzLnJlZ2lzdHJ5W25hbWVdKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0IGtleXdvcmQgc3VwcG9ydCBieSBuYW1lXG4gICAqIEBwYXJhbSBuYW1lXG4gICAqIEBwYXJhbSBjYWxsYmFja1xuICAgKi9cbiAgZGVmaW5lKG5hbWUsIGNhbGxiYWNrKSB7XG4gICAgdGhpcy5zdXBwb3J0W25hbWVdID0gY2FsbGJhY2s7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBkZXBlbmRlbmN5IGdpdmVuIGJ5IG5hbWVcbiAgICogQHBhcmFtIG5hbWVcbiAgICogQHJldHVybnMge0RlcGVuZGVuY3l9XG4gICAqL1xuICBnZXQobmFtZSkge1xuICAgIGlmICh0eXBlb2YgdGhpcy5yZWdpc3RyeVtuYW1lXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihgJyR7bmFtZX0nIGRlcGVuZGVuY3kgZG9lc24ndCBleGlzdC5gKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucmVnaXN0cnlbbmFtZV07XG4gIH1cblxuICAvKipcbiAgICogQXBwbHkgYSBjdXN0b20ga2V5d29yZFxuICAgKiBAcGFyYW0gc2NoZW1hXG4gICAqL1xuICB3cmFwKHNjaGVtYSkge1xuICAgIGlmICghKCdnZW5lcmF0ZScgaW4gc2NoZW1hKSkge1xuICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHNjaGVtYSk7XG4gICAgICBjb25zdCBjb250ZXh0ID0ge307XG5cbiAgICAgIGxldCBsZW5ndGggPSBrZXlzLmxlbmd0aDtcblxuICAgICAgd2hpbGUgKGxlbmd0aC0tKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgY29uc3QgZm4gPSBrZXlzW2xlbmd0aF0ucmVwbGFjZSgvXngtLywgJycpO1xuICAgICAgICBjb25zdCBnZW4gPSB0aGlzLnN1cHBvcnRbZm5dO1xuXG4gICAgICAgIGlmICh0eXBlb2YgZ2VuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHNjaGVtYSwgJ2dlbmVyYXRlJywge1xuICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgdmFsdWU6IChyb290U2NoZW1hLCBrZXkpID0+IGdlbi5jYWxsKGNvbnRleHQsIHNjaGVtYVtrZXlzW2xlbmd0aF1dLCBzY2hlbWEsIGtleXNbbGVuZ3RoXSwgcm9vdFNjaGVtYSwga2V5LnNsaWNlKCkpLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHNjaGVtYTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDb250YWluZXI7XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBR0EsZUFBZSxLQUFLO0FBQ2xCLFNBQU8sQ0FBQyxPQUFPLFFBQVEsVUFBVSxlQUFlO0FBQzlDLFFBQUksS0FBSztBQUNULFFBQUksT0FBTztBQUdYLFFBQUksT0FBTyxVQUFVLFVBQVU7QUFDN0IsV0FBSyxPQUFPLEtBQUssT0FBTztBQUd4QixVQUFJLE1BQU0sUUFBUSxNQUFNLE1BQU07QUFFNUIsZUFBTyxNQUFNO0FBQUEsYUFDUjtBQUNMLGFBQUssS0FBSyxNQUFNO0FBQUE7QUFBQTtBQUtwQixVQUFNLFFBQVEsR0FBRyxNQUFNO0FBR3ZCLFFBQUksTUFBTTtBQUVWLFdBQU8sTUFBTSxTQUFTLEdBQUc7QUFDdkIsWUFBTSxJQUFJLE1BQU07QUFBQTtBQUlsQixZQUFRLE9BQU8sUUFBUSxXQUFXLElBQUksTUFBTSxNQUFNO0FBR2xELFFBQUksT0FBTyxVQUFVLFlBQVk7QUFDL0IsY0FBUSxNQUFNLE1BQU0sS0FBSyxLQUFLLElBQUksT0FBSyxLQUFLLFNBQVMsR0FBRztBQUFBO0FBSTFELFFBQUksT0FBTyxVQUFVLFNBQVMsS0FBSyxXQUFXLG1CQUFtQjtBQUMvRCxhQUFPLEtBQUssT0FBTyxRQUFRLFNBQU87QUFDaEMsWUFBSSxPQUFPLE1BQU0sU0FBUyxZQUFZO0FBQ3BDLGdCQUFNLElBQUksTUFBTSw2QkFBNkIsYUFBYSxlQUFlO0FBQUE7QUFBQTtBQUFBO0FBSy9FLFdBQU87QUFBQTtBQUFBO0FBWVgsZ0JBQWdCO0FBQUEsRUFDZCxjQUFjO0FBR1osU0FBSyxXQUFXO0FBQ2hCLFNBQUssVUFBVTtBQUFBO0FBQUEsRUFPakIsTUFBTSxNQUFNO0FBQ1YsUUFBSSxDQUFDLE1BQU07QUFDVCxXQUFLLFdBQVc7QUFDaEIsV0FBSyxVQUFVO0FBQUEsV0FDVjtBQUNMLGFBQU8sS0FBSyxTQUFTO0FBQ3JCLGFBQU8sS0FBSyxRQUFRO0FBQUE7QUFBQTtBQUFBLEVBU3hCLE9BQU8sTUFBTSxVQUFVO0FBQ3JCLFNBQUssU0FBUyxRQUFRLFNBQVMsS0FBSyxTQUFTO0FBRzdDLFFBQUksQ0FBQyxLQUFLLFFBQVEsT0FBTztBQUN2QixXQUFLLFFBQVEsUUFBUSxNQUFNLE1BQU0sS0FBSyxTQUFTO0FBQUE7QUFBQTtBQUFBLEVBU25ELE9BQU8sTUFBTSxVQUFVO0FBQ3JCLFNBQUssUUFBUSxRQUFRO0FBQUE7QUFBQSxFQVF2QixJQUFJLE1BQU07QUFDUixRQUFJLE9BQU8sS0FBSyxTQUFTLFVBQVUsYUFBYTtBQUM5QyxZQUFNLElBQUksZUFBZSxJQUFJO0FBQUE7QUFFL0IsV0FBTyxLQUFLLFNBQVM7QUFBQTtBQUFBLEVBT3ZCLEtBQUssUUFBUTtBQUNYLFFBQUksQ0FBRSxlQUFjLFNBQVM7QUFDM0IsWUFBTSxPQUFPLE9BQU8sS0FBSztBQUN6QixZQUFNLFVBQVU7QUFFaEIsVUFBSSxTQUFTLEtBQUs7QUFFbEIsYUFBTyxVQUFVO0FBQ2YsY0FBTSxLQUFLLEtBQUssUUFBUSxRQUFRLE9BQU87QUFDdkMsY0FBTSxNQUFNLEtBQUssUUFBUTtBQUV6QixZQUFJLE9BQU8sUUFBUSxZQUFZO0FBQzdCLGlCQUFPLGVBQWUsUUFBUSxZQUFZO0FBQUEsWUFDeEMsY0FBYztBQUFBLFlBQ2QsWUFBWTtBQUFBLFlBQ1osVUFBVTtBQUFBLFlBQ1YsT0FBTyxDQUFDLFlBQVksUUFBUSxJQUFJLEtBQUssU0FBUyxPQUFPLEtBQUssVUFBVSxRQUFRLEtBQUssU0FBUyxZQUFZLElBQUk7QUFBQTtBQUU1RztBQUFBO0FBQUE7QUFBQTtBQUlOLFdBQU87QUFBQTtBQUFBO0FBSVgsSUFBTyxvQkFBUTsiLCJuYW1lcyI6W119
