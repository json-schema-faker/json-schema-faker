import { writeFileSync, readFileSync } from 'fs';

let cjs = readFileSync('dist/main.cjs').toString();
cjs = cjs.replace(/module\.exports = Object\.assign/, '// $&');

writeFileSync('dist/main.cjs', cjs);
writeFileSync('dist/index.cjs', 'module.exports = require("./main.cjs").default;\n');

// prefix was setting `location` and that caused redirections under browser-like environments
// if you run this module on a browser-like environment that does not have `location` set it'll fail

let vendor = readFileSync('dist/vendor.js').toString();
vendor = `!(()=>{${vendor}})()`;

writeFileSync('dist/vendor.js', vendor);
