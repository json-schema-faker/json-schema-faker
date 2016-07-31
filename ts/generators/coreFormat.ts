import container = require('../class/Container');
var randexp = container.get('randexp');

/**
 * Predefined core formats
 * @type {[key: string]: string}
 */
var regexps: IStringMap = {
  email: '[a-zA-Z\\d][a-zA-Z\\d-]{1,13}[a-zA-Z\\d]@{hostname}',
  hostname: '[a-zA-Z]{1,33}\\.[a-z]{2,4}',
  ipv6: '[a-f\\d]{4}(:[a-f\\d]{4}){7}',
  uri: '[a-zA-Z][a-zA-Z0-9+-.]*'
};

/**
 * Generates randomized string basing on a built-in regex format
 *
 * @param coreFormat
 * @returns {string}
 */
function coreFormatGenerator(coreFormat: string): string {
  return randexp(regexps[coreFormat]).replace(/\{(\w+)\}/, function(match: string, key: string) {
    return randexp(regexps[key]);
  });
}

export = coreFormatGenerator;
