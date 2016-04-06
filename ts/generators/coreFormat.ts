import container = require('../class/Container');
var randexp = container.get('randexp').randexp;

var regexps = {
  email: '[a-zA-Z\\d][a-zA-Z\\d-]{1,13}[a-zA-Z\\d]@{hostname}',
  hostname: '[a-zA-Z]{1,33}\\.[a-z]{2,4}',
  ipv6: '[abcdef\\d]{4}(:[abcdef\\d]{4}){7}',
  uri: '[a-zA-Z][a-zA-Z0-9+-.]*'
};

/**
 * Generates randomized boolean value.
 *
 * @returns {boolean}
 */
function coreFormatGenerator(coreFormat: string): string {
  return randexp(regexps[coreFormat]).replace(/\{(\w+)\}/, function(match: string, key: string) {
    return randexp(regexps[key]);
  });
}

export = coreFormatGenerator;
