const thunk = require("../generators/thunk");
const ipv4 = require("../generators/ipv4");
const dateTime = require("../generators/dateTime");
const date = require("../generators/date");
const time = require("../generators/time");
const coreFormat = require("../generators/coreFormat");
const optionAPI = require("../api/option");
const format = require("../api/format");
const random = require("../core/random");
const utils = require("../core/utils");
function generateFormat(value, invalid) {
  const callback = format(value.format);
  if (typeof callback === "function") {
    return callback(value);
  }
  switch (value.format) {
    case "date-time":
    case "datetime":
      return dateTime();
    case "date":
      return date();
    case "time":
      return time();
    case "ipv4":
      return ipv4();
    case "regex":
      return ".+?";
    case "email":
    case "hostname":
    case "ipv6":
    case "uri":
    case "uri-reference":
    case "iri":
    case "iri-reference":
    case "idn-email":
    case "idn-hostname":
    case "json-pointer":
    case "slug":
    case "uri-template":
    case "uuid":
      return coreFormat(value.format);
    default:
      if (typeof callback === "undefined") {
        if (optionAPI("failOnInvalidFormat")) {
          throw new Error(`unknown registry key ${utils.short(value.format)}`);
        } else {
          return invalid();
        }
      }
      throw new Error(`unsupported format '${value.format}'`);
  }
}
function stringType(value) {
  const output = utils.typecast("string", value, (opts) => {
    if (value.format) {
      return generateFormat(value, () => thunk(opts.minLength, opts.maxLength));
    }
    if (value.pattern) {
      return random.randexp(value.pattern);
    }
    return thunk(opts.minLength, opts.maxLength);
  });
  return output;
}
var string_default = stringType;
module.exports=string_default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvdHlwZXMvc3RyaW5nLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0aHVuayBmcm9tICcuLi9nZW5lcmF0b3JzL3RodW5rJztcbmltcG9ydCBpcHY0IGZyb20gJy4uL2dlbmVyYXRvcnMvaXB2NCc7XG5pbXBvcnQgZGF0ZVRpbWUgZnJvbSAnLi4vZ2VuZXJhdG9ycy9kYXRlVGltZSc7XG5pbXBvcnQgZGF0ZSBmcm9tICcuLi9nZW5lcmF0b3JzL2RhdGUnO1xuaW1wb3J0IHRpbWUgZnJvbSAnLi4vZ2VuZXJhdG9ycy90aW1lJztcbmltcG9ydCBjb3JlRm9ybWF0IGZyb20gJy4uL2dlbmVyYXRvcnMvY29yZUZvcm1hdCc7XG5pbXBvcnQgb3B0aW9uQVBJIGZyb20gJy4uL2FwaS9vcHRpb24nO1xuaW1wb3J0IGZvcm1hdCBmcm9tICcuLi9hcGkvZm9ybWF0JztcbmltcG9ydCByYW5kb20gZnJvbSAnLi4vY29yZS9yYW5kb20nO1xuaW1wb3J0IHV0aWxzIGZyb20gJy4uL2NvcmUvdXRpbHMnO1xuXG5mdW5jdGlvbiBnZW5lcmF0ZUZvcm1hdCh2YWx1ZSwgaW52YWxpZCkge1xuICBjb25zdCBjYWxsYmFjayA9IGZvcm1hdCh2YWx1ZS5mb3JtYXQpO1xuXG4gIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gY2FsbGJhY2sodmFsdWUpO1xuICB9XG5cbiAgc3dpdGNoICh2YWx1ZS5mb3JtYXQpIHtcbiAgICBjYXNlICdkYXRlLXRpbWUnOlxuICAgIGNhc2UgJ2RhdGV0aW1lJzpcbiAgICAgIHJldHVybiBkYXRlVGltZSgpO1xuICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgcmV0dXJuIGRhdGUoKTtcbiAgICBjYXNlICd0aW1lJzpcbiAgICAgIHJldHVybiB0aW1lKCk7XG4gICAgY2FzZSAnaXB2NCc6XG4gICAgICByZXR1cm4gaXB2NCgpO1xuICAgIGNhc2UgJ3JlZ2V4JzpcbiAgICAgIC8vIFRPRE86IGRpc2N1c3NcbiAgICAgIHJldHVybiAnLis/JztcbiAgICBjYXNlICdlbWFpbCc6XG4gICAgY2FzZSAnaG9zdG5hbWUnOlxuICAgIGNhc2UgJ2lwdjYnOlxuICAgIGNhc2UgJ3VyaSc6XG4gICAgY2FzZSAndXJpLXJlZmVyZW5jZSc6XG4gICAgY2FzZSAnaXJpJzpcbiAgICBjYXNlICdpcmktcmVmZXJlbmNlJzpcbiAgICBjYXNlICdpZG4tZW1haWwnOlxuICAgIGNhc2UgJ2lkbi1ob3N0bmFtZSc6XG4gICAgY2FzZSAnanNvbi1wb2ludGVyJzpcbiAgICBjYXNlICdzbHVnJzpcbiAgICBjYXNlICd1cmktdGVtcGxhdGUnOlxuICAgIGNhc2UgJ3V1aWQnOlxuICAgICAgcmV0dXJuIGNvcmVGb3JtYXQodmFsdWUuZm9ybWF0KTtcbiAgICBkZWZhdWx0OlxuICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgaWYgKG9wdGlvbkFQSSgnZmFpbE9uSW52YWxpZEZvcm1hdCcpKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGB1bmtub3duIHJlZ2lzdHJ5IGtleSAke3V0aWxzLnNob3J0KHZhbHVlLmZvcm1hdCl9YCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGludmFsaWQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHVuc3VwcG9ydGVkIGZvcm1hdCAnJHt2YWx1ZS5mb3JtYXR9J2ApO1xuICB9XG59XG5cbmZ1bmN0aW9uIHN0cmluZ1R5cGUodmFsdWUpIHtcbiAgLy8gaGVyZSB3ZSBuZWVkIHRvIGZvcmNlIHR5cGUgdG8gZml4ICM0NjdcbiAgY29uc3Qgb3V0cHV0ID0gdXRpbHMudHlwZWNhc3QoJ3N0cmluZycsIHZhbHVlLCBvcHRzID0+IHtcbiAgICBpZiAodmFsdWUuZm9ybWF0KSB7XG4gICAgICByZXR1cm4gZ2VuZXJhdGVGb3JtYXQodmFsdWUsICgpID0+IHRodW5rKG9wdHMubWluTGVuZ3RoLCBvcHRzLm1heExlbmd0aCkpO1xuICAgIH1cblxuICAgIGlmICh2YWx1ZS5wYXR0ZXJuKSB7XG4gICAgICByZXR1cm4gcmFuZG9tLnJhbmRleHAodmFsdWUucGF0dGVybik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRodW5rKG9wdHMubWluTGVuZ3RoLCBvcHRzLm1heExlbmd0aCk7XG4gIH0pO1xuXG4gIHJldHVybiBvdXRwdXQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0cmluZ1R5cGU7XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsd0JBQXdCLE9BQU8sU0FBUztBQUN0QyxRQUFNLFdBQVcsT0FBTyxNQUFNO0FBRTlCLE1BQUksT0FBTyxhQUFhLFlBQVk7QUFDbEMsV0FBTyxTQUFTO0FBQUE7QUFHbEIsVUFBUSxNQUFNO0FBQUEsU0FDUDtBQUFBLFNBQ0E7QUFDSCxhQUFPO0FBQUEsU0FDSjtBQUNILGFBQU87QUFBQSxTQUNKO0FBQ0gsYUFBTztBQUFBLFNBQ0o7QUFDSCxhQUFPO0FBQUEsU0FDSjtBQUVILGFBQU87QUFBQSxTQUNKO0FBQUEsU0FDQTtBQUFBLFNBQ0E7QUFBQSxTQUNBO0FBQUEsU0FDQTtBQUFBLFNBQ0E7QUFBQSxTQUNBO0FBQUEsU0FDQTtBQUFBLFNBQ0E7QUFBQSxTQUNBO0FBQUEsU0FDQTtBQUFBLFNBQ0E7QUFBQSxTQUNBO0FBQ0gsYUFBTyxXQUFXLE1BQU07QUFBQTtBQUV4QixVQUFJLE9BQU8sYUFBYSxhQUFhO0FBQ25DLFlBQUksVUFBVSx3QkFBd0I7QUFDcEMsZ0JBQU0sSUFBSSxNQUFNLHdCQUF3QixNQUFNLE1BQU0sTUFBTTtBQUFBLGVBQ3JEO0FBQ0wsaUJBQU87QUFBQTtBQUFBO0FBSVgsWUFBTSxJQUFJLE1BQU0sdUJBQXVCLE1BQU07QUFBQTtBQUFBO0FBSW5ELG9CQUFvQixPQUFPO0FBRXpCLFFBQU0sU0FBUyxNQUFNLFNBQVMsVUFBVSxPQUFPLFVBQVE7QUFDckQsUUFBSSxNQUFNLFFBQVE7QUFDaEIsYUFBTyxlQUFlLE9BQU8sTUFBTSxNQUFNLEtBQUssV0FBVyxLQUFLO0FBQUE7QUFHaEUsUUFBSSxNQUFNLFNBQVM7QUFDakIsYUFBTyxPQUFPLFFBQVEsTUFBTTtBQUFBO0FBRzlCLFdBQU8sTUFBTSxLQUFLLFdBQVcsS0FBSztBQUFBO0FBR3BDLFNBQU87QUFBQTtBQUdULElBQU8saUJBQVE7IiwibmFtZXMiOltdfQ==
