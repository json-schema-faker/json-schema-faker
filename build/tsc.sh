#!/bin/sh

# --out will not work with CommonJS, see https://github.com/Microsoft/TypeScript/issues/1544
tsc --module commonjs ts/index.ts ts/index.ts
mkdir -p lib/api lib/class lib/core lib/generators lib/types

mv ts/api/*.js lib/api/
mv ts/class/*.js lib/class/
mv ts/core/*.js lib/core/
mv ts/generators/*.js lib/generators/
mv ts/types/*.js lib/types/
mv ts/*.js lib/
