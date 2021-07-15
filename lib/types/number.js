const random = require("../core/random");
const env = require("../core/constants");
function numberType(value) {
  let min = typeof value.minimum === "undefined" ? env.MIN_INTEGER : value.minimum;
  let max = typeof value.maximum === "undefined" ? env.MAX_INTEGER : value.maximum;
  const multipleOf = value.multipleOf;
  if (multipleOf) {
    max = Math.floor(max / multipleOf) * multipleOf;
    min = Math.ceil(min / multipleOf) * multipleOf;
  }
  if (value.exclusiveMinimum && min === value.minimum) {
    min += multipleOf || 1;
  }
  if (value.exclusiveMaximum && max === value.maximum) {
    max -= multipleOf || 1;
  }
  if (min > max) {
    return NaN;
  }
  if (multipleOf) {
    if (String(multipleOf).indexOf(".") === -1) {
      let base = random.number(Math.floor(min / multipleOf), Math.floor(max / multipleOf)) * multipleOf;
      while (base < min) {
        base += value.multipleOf;
      }
      return base;
    }
    const boundary = (max - min) / multipleOf;
    let num;
    let fix;
    do {
      num = random.number(0, boundary) * multipleOf;
      fix = num / multipleOf % 1;
    } while (fix !== 0);
    return min + num;
  }
  return random.number(min, max, void 0, void 0, true);
}
var number_default = numberType;
module.exports=number_default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvdHlwZXMvbnVtYmVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCByYW5kb20gZnJvbSAnLi4vY29yZS9yYW5kb20nO1xuaW1wb3J0IGVudiBmcm9tICcuLi9jb3JlL2NvbnN0YW50cyc7XG5cbmZ1bmN0aW9uIG51bWJlclR5cGUodmFsdWUpIHtcbiAgbGV0IG1pbiA9IHR5cGVvZiB2YWx1ZS5taW5pbXVtID09PSAndW5kZWZpbmVkJyA/IGVudi5NSU5fSU5URUdFUiA6IHZhbHVlLm1pbmltdW07XG4gIGxldCBtYXggPSB0eXBlb2YgdmFsdWUubWF4aW11bSA9PT0gJ3VuZGVmaW5lZCcgPyBlbnYuTUFYX0lOVEVHRVIgOiB2YWx1ZS5tYXhpbXVtO1xuXG4gIGNvbnN0IG11bHRpcGxlT2YgPSB2YWx1ZS5tdWx0aXBsZU9mO1xuXG4gIGlmIChtdWx0aXBsZU9mKSB7XG4gICAgbWF4ID0gTWF0aC5mbG9vcihtYXggLyBtdWx0aXBsZU9mKSAqIG11bHRpcGxlT2Y7XG4gICAgbWluID0gTWF0aC5jZWlsKG1pbiAvIG11bHRpcGxlT2YpICogbXVsdGlwbGVPZjtcbiAgfVxuXG4gIGlmICh2YWx1ZS5leGNsdXNpdmVNaW5pbXVtICYmIG1pbiA9PT0gdmFsdWUubWluaW11bSkge1xuICAgIG1pbiArPSBtdWx0aXBsZU9mIHx8IDE7XG4gIH1cblxuICBpZiAodmFsdWUuZXhjbHVzaXZlTWF4aW11bSAmJiBtYXggPT09IHZhbHVlLm1heGltdW0pIHtcbiAgICBtYXggLT0gbXVsdGlwbGVPZiB8fCAxO1xuICB9XG5cbiAgaWYgKG1pbiA+IG1heCkge1xuICAgIHJldHVybiBOYU47XG4gIH1cblxuICBpZiAobXVsdGlwbGVPZikge1xuICAgIGlmIChTdHJpbmcobXVsdGlwbGVPZikuaW5kZXhPZignLicpID09PSAtMSkge1xuICAgICAgbGV0IGJhc2UgPSByYW5kb20ubnVtYmVyKE1hdGguZmxvb3IobWluIC8gbXVsdGlwbGVPZiksIE1hdGguZmxvb3IobWF4IC8gbXVsdGlwbGVPZikpICogbXVsdGlwbGVPZjtcblxuICAgICAgd2hpbGUgKGJhc2UgPCBtaW4pIHtcbiAgICAgICAgYmFzZSArPSB2YWx1ZS5tdWx0aXBsZU9mO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gYmFzZTtcbiAgICB9XG5cbiAgICBjb25zdCBib3VuZGFyeSA9IChtYXggLSBtaW4pIC8gbXVsdGlwbGVPZjtcblxuICAgIGxldCBudW07XG4gICAgbGV0IGZpeDtcblxuICAgIGRvIHtcbiAgICAgIG51bSA9IHJhbmRvbS5udW1iZXIoMCwgYm91bmRhcnkpICogbXVsdGlwbGVPZjtcbiAgICAgIGZpeCA9IChudW0gLyBtdWx0aXBsZU9mKSAlIDE7XG4gICAgfSB3aGlsZSAoZml4ICE9PSAwKTtcblxuICAgIC8vIEZJWE1FOiBodHRwczovL2dpdGh1Yi5jb20vanNvbi1zY2hlbWEtZmFrZXIvanNvbi1zY2hlbWEtZmFrZXIvaXNzdWVzLzM3OVxuXG4gICAgcmV0dXJuIG1pbiArIG51bTtcbiAgfVxuXG4gIHJldHVybiByYW5kb20ubnVtYmVyKG1pbiwgbWF4LCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdHJ1ZSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IG51bWJlclR5cGU7XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFFQSxvQkFBb0IsT0FBTztBQUN6QixNQUFJLE1BQU0sT0FBTyxNQUFNLFlBQVksY0FBYyxJQUFJLGNBQWMsTUFBTTtBQUN6RSxNQUFJLE1BQU0sT0FBTyxNQUFNLFlBQVksY0FBYyxJQUFJLGNBQWMsTUFBTTtBQUV6RSxRQUFNLGFBQWEsTUFBTTtBQUV6QixNQUFJLFlBQVk7QUFDZCxVQUFNLEtBQUssTUFBTSxNQUFNLGNBQWM7QUFDckMsVUFBTSxLQUFLLEtBQUssTUFBTSxjQUFjO0FBQUE7QUFHdEMsTUFBSSxNQUFNLG9CQUFvQixRQUFRLE1BQU0sU0FBUztBQUNuRCxXQUFPLGNBQWM7QUFBQTtBQUd2QixNQUFJLE1BQU0sb0JBQW9CLFFBQVEsTUFBTSxTQUFTO0FBQ25ELFdBQU8sY0FBYztBQUFBO0FBR3ZCLE1BQUksTUFBTSxLQUFLO0FBQ2IsV0FBTztBQUFBO0FBR1QsTUFBSSxZQUFZO0FBQ2QsUUFBSSxPQUFPLFlBQVksUUFBUSxTQUFTLElBQUk7QUFDMUMsVUFBSSxPQUFPLE9BQU8sT0FBTyxLQUFLLE1BQU0sTUFBTSxhQUFhLEtBQUssTUFBTSxNQUFNLGVBQWU7QUFFdkYsYUFBTyxPQUFPLEtBQUs7QUFDakIsZ0JBQVEsTUFBTTtBQUFBO0FBR2hCLGFBQU87QUFBQTtBQUdULFVBQU0sV0FBWSxPQUFNLE9BQU87QUFFL0IsUUFBSTtBQUNKLFFBQUk7QUFFSixPQUFHO0FBQ0QsWUFBTSxPQUFPLE9BQU8sR0FBRyxZQUFZO0FBQ25DLFlBQU8sTUFBTSxhQUFjO0FBQUEsYUFDcEIsUUFBUTtBQUlqQixXQUFPLE1BQU07QUFBQTtBQUdmLFNBQU8sT0FBTyxPQUFPLEtBQUssS0FBSyxRQUFXLFFBQVc7QUFBQTtBQUd2RCxJQUFPLGlCQUFROyIsIm5hbWVzIjpbXX0=
