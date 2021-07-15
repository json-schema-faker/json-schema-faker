const random = require("../core/random");
const FRAGMENT = "[a-zA-Z][a-zA-Z0-9+-.]*";
const URI_PATTERN = `https?://{hostname}(?:${FRAGMENT})+`;
const PARAM_PATTERN = "(?:\\?([a-z]{1,7}(=\\w{1,5})?&){0,3})?";
const regexps = {
  email: "[a-zA-Z\\d][a-zA-Z\\d-]{1,13}[a-zA-Z\\d]@{hostname}",
  hostname: "[a-zA-Z]{1,33}\\.[a-z]{2,4}",
  ipv6: "[a-f\\d]{4}(:[a-f\\d]{4}){7}",
  uri: URI_PATTERN,
  slug: "[a-zA-Z\\d_-]+",
  "uri-reference": `${URI_PATTERN}${PARAM_PATTERN}`,
  "uri-template": URI_PATTERN.replace("(?:", "(?:/\\{[a-z][:a-zA-Z0-9-]*\\}|"),
  "json-pointer": `(/(?:${FRAGMENT.replace("]*", "/]*")}|~[01]))+`,
  uuid: "^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$"
};
regexps.iri = regexps["uri-reference"];
regexps["iri-reference"] = regexps["uri-reference"];
regexps["idn-email"] = regexps.email;
regexps["idn-hostname"] = regexps.hostname;
const ALLOWED_FORMATS = new RegExp(`\\{(${Object.keys(regexps).join("|")})\\}`);
function coreFormatGenerator(coreFormat) {
  return random.randexp(regexps[coreFormat]).replace(ALLOWED_FORMATS, (match, key) => {
    return random.randexp(regexps[key]);
  });
}
var coreFormat_default = coreFormatGenerator;
module.exports=coreFormat_default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvZ2VuZXJhdG9ycy9jb3JlRm9ybWF0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCByYW5kb20gZnJvbSAnLi4vY29yZS9yYW5kb20nO1xuXG5jb25zdCBGUkFHTUVOVCA9ICdbYS16QS1aXVthLXpBLVowLTkrLS5dKic7XG5jb25zdCBVUklfUEFUVEVSTiA9IGBodHRwcz86Ly97aG9zdG5hbWV9KD86JHtGUkFHTUVOVH0pK2A7XG5jb25zdCBQQVJBTV9QQVRURVJOID0gJyg/OlxcXFw/KFthLXpdezEsN30oPVxcXFx3ezEsNX0pPyYpezAsM30pPyc7XG5cbi8qKlxuICogUHJlZGVmaW5lZCBjb3JlIGZvcm1hdHNcbiAqIEB0eXBlIHtba2V5OiBzdHJpbmddOiBzdHJpbmd9XG4gKi9cbmNvbnN0IHJlZ2V4cHMgPSB7XG4gIGVtYWlsOiAnW2EtekEtWlxcXFxkXVthLXpBLVpcXFxcZC1dezEsMTN9W2EtekEtWlxcXFxkXUB7aG9zdG5hbWV9JyxcbiAgaG9zdG5hbWU6ICdbYS16QS1aXXsxLDMzfVxcXFwuW2Etel17Miw0fScsXG4gIGlwdjY6ICdbYS1mXFxcXGRdezR9KDpbYS1mXFxcXGRdezR9KXs3fScsXG4gIHVyaTogVVJJX1BBVFRFUk4sXG4gIHNsdWc6ICdbYS16QS1aXFxcXGRfLV0rJyxcblxuICAvLyB0eXBlcyBmcm9tIGRyYWZ0LTBbNjddICg/KVxuICAndXJpLXJlZmVyZW5jZSc6IGAke1VSSV9QQVRURVJOfSR7UEFSQU1fUEFUVEVSTn1gLFxuICAndXJpLXRlbXBsYXRlJzogVVJJX1BBVFRFUk4ucmVwbGFjZSgnKD86JywgJyg/Oi9cXFxce1thLXpdWzphLXpBLVowLTktXSpcXFxcfXwnKSxcbiAgJ2pzb24tcG9pbnRlcic6IGAoLyg/OiR7RlJBR01FTlQucmVwbGFjZSgnXSonLCAnL10qJyl9fH5bMDFdKSkrYCxcblxuICAvLyBzb21lIHR5cGVzIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL09BSS9PcGVuQVBJLVNwZWNpZmljYXRpb24vYmxvYi9tYXN0ZXIvdmVyc2lvbnMvMy4wLjEubWQjZGF0YS10eXBlcyAoPylcbiAgdXVpZDogJ15bMC05YS1mXXs4fS0oPzpbMC05YS1mXXs0fS0pezN9WzAtOWEtZl17MTJ9JCcsXG59O1xuXG5yZWdleHBzLmlyaSA9IHJlZ2V4cHNbJ3VyaS1yZWZlcmVuY2UnXTtcbnJlZ2V4cHNbJ2lyaS1yZWZlcmVuY2UnXSA9IHJlZ2V4cHNbJ3VyaS1yZWZlcmVuY2UnXTtcblxucmVnZXhwc1snaWRuLWVtYWlsJ10gPSByZWdleHBzLmVtYWlsO1xucmVnZXhwc1snaWRuLWhvc3RuYW1lJ10gPSByZWdleHBzLmhvc3RuYW1lO1xuXG5jb25zdCBBTExPV0VEX0ZPUk1BVFMgPSBuZXcgUmVnRXhwKGBcXFxceygke09iamVjdC5rZXlzKHJlZ2V4cHMpLmpvaW4oJ3wnKX0pXFxcXH1gKTtcblxuLyoqXG4gKiBHZW5lcmF0ZXMgcmFuZG9taXplZCBzdHJpbmcgYmFzaW5nIG9uIGEgYnVpbHQtaW4gcmVnZXggZm9ybWF0XG4gKlxuICogQHBhcmFtIGNvcmVGb3JtYXRcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGNvcmVGb3JtYXRHZW5lcmF0b3IoY29yZUZvcm1hdCkge1xuICByZXR1cm4gcmFuZG9tLnJhbmRleHAocmVnZXhwc1tjb3JlRm9ybWF0XSkucmVwbGFjZShBTExPV0VEX0ZPUk1BVFMsIChtYXRjaCwga2V5KSA9PiB7XG4gICAgcmV0dXJuIHJhbmRvbS5yYW5kZXhwKHJlZ2V4cHNba2V5XSk7XG4gIH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjb3JlRm9ybWF0R2VuZXJhdG9yO1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUVBLE1BQU0sV0FBVztBQUNqQixNQUFNLGNBQWMseUJBQXlCO0FBQzdDLE1BQU0sZ0JBQWdCO0FBTXRCLE1BQU0sVUFBVTtBQUFBLEVBQ2QsT0FBTztBQUFBLEVBQ1AsVUFBVTtBQUFBLEVBQ1YsTUFBTTtBQUFBLEVBQ04sS0FBSztBQUFBLEVBQ0wsTUFBTTtBQUFBLEVBR04saUJBQWlCLEdBQUcsY0FBYztBQUFBLEVBQ2xDLGdCQUFnQixZQUFZLFFBQVEsT0FBTztBQUFBLEVBQzNDLGdCQUFnQixRQUFRLFNBQVMsUUFBUSxNQUFNO0FBQUEsRUFHL0MsTUFBTTtBQUFBO0FBR1IsUUFBUSxNQUFNLFFBQVE7QUFDdEIsUUFBUSxtQkFBbUIsUUFBUTtBQUVuQyxRQUFRLGVBQWUsUUFBUTtBQUMvQixRQUFRLGtCQUFrQixRQUFRO0FBRWxDLE1BQU0sa0JBQWtCLElBQUksT0FBTyxPQUFPLE9BQU8sS0FBSyxTQUFTLEtBQUs7QUFRcEUsNkJBQTZCLFlBQVk7QUFDdkMsU0FBTyxPQUFPLFFBQVEsUUFBUSxhQUFhLFFBQVEsaUJBQWlCLENBQUMsT0FBTyxRQUFRO0FBQ2xGLFdBQU8sT0FBTyxRQUFRLFFBQVE7QUFBQTtBQUFBO0FBSWxDLElBQU8scUJBQVE7IiwibmFtZXMiOltdfQ==
