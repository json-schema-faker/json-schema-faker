import { writeFileSync, readFileSync } from 'fs';

let cjs = readFileSync('dist/main.cjs').toString();
cjs = cjs.replace(/module\.exports = Object\.assign/, '// $&');

writeFileSync('dist/main.cjs', cjs);
writeFileSync('dist/index.cjs', 'module.exports = require("./main.cjs").default;\n');

let vendor = readFileSync('dist/vendor.js').toString();
vendor = `if (typeof process !== 'undefined') { global.location = { href: \`\${process.cwd()}/\` }; }\n${vendor}`;

writeFileSync('dist/vendor.js', vendor);
