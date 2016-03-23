#!/bin/sh

# --out will not work with CommonJS, see https://github.com/Microsoft/TypeScript/issues/1544
tsc --module commonjs ts/generators/boolean.ts ts/generators/null.ts ts/generators/words.ts
tsc --module commonjs ts/util/random.ts ts/util/has-properties.ts ts/util/error.ts
tsc --module commonjs ts/class/FormatRegistry.ts ts/class/Container.ts
tsc --module commonjs ts/api/formats.ts ts/api/extends.ts

mv ts/generators/*.js lib/generators/
#mv ts/types/*.js lib/types/
mv ts/class/*.js lib/class/
mv ts/util/*.js lib/util/
mv ts/api/*.js lib/api/
