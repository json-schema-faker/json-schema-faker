import { writeFileSync, readFileSync } from 'fs';

let cjs = readFileSync('dist/main.cjs').toString();
cjs = cjs.replace(/module\.exports = Object\.assign/, '// $&');

writeFileSync('dist/main.cjs', cjs);
writeFileSync('dist/index.cjs', 'module.exports = require("./main.cjs").default;\n');

const prefix = `var location = typeof window !== "undefined" && typeof window.location !== "undefined"
? window.location : (typeof process !== "undefined" && typeof process.cwd === "function"
? { href: process.cwd() + "/" } : { href: "/" });`;

let vendor = readFileSync('dist/vendor.js').toString();
vendor = `${prefix}\n${vendor}`;

writeFileSync('dist/vendor.js', vendor);
