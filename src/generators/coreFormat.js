import random from '../core/random';

const FRAGMENT = '[a-zA-Z][a-zA-Z0-9+-.]*';
const URI_PATTERN = `https?://{hostname}(?:${FRAGMENT})+`;
const PARAM_PATTERN = '(?:\\?([a-z]{1,7}(=\\w{1,5})?&){0,3})?';

/**
 * Predefined core formats
 * @type {[key: string]: string}
 */
const regexps = {
  email: '[a-zA-Z\\d][a-zA-Z\\d-]{1,13}[a-zA-Z\\d]@{hostname}',
  hostname: '[a-zA-Z]{1,33}\\.[a-z]{2,4}',
  ipv6: '[a-f\\d]{4}(:[a-f\\d]{4}){7}',
  uri: URI_PATTERN,

  // types from draft-0[67] (?)
  'uri-reference': `${URI_PATTERN}${PARAM_PATTERN}`,
  'uri-template': URI_PATTERN.replace('(?:', '(?:/\\{[a-z][:a-zA-Z0-9-]*\\}|'),
  'json-pointer': `(/(?:${FRAGMENT.replace(']*', '/]*')}|~[01]))+`,

  // some types from https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.1.md#data-types (?)
  uuid: '^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$',
};

regexps.iri = regexps['uri-reference'];
regexps['iri-reference'] = regexps['uri-reference'];

regexps['idn-email'] = regexps.email;
regexps['idn-hostname'] = regexps.hostname;

const ALLOWED_FORMATS = new RegExp(`\\{(${Object.keys(regexps).join('|')})\\}`);

/**
 * Generates randomized string basing on a built-in regex format
 *
 * @param coreFormat
 * @returns {string}
 */
function coreFormatGenerator(coreFormat) {
  return random.randexp(regexps[coreFormat]).replace(ALLOWED_FORMATS, (match, key) => {
    return random.randexp(regexps[key]);
  });
}

export default coreFormatGenerator;
