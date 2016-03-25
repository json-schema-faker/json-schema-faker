#!/bin/sh

# --out will not work with CommonJS, see https://github.com/Microsoft/TypeScript/issues/1544
tsc --module commonjs ts/api/formats.ts ts/api/extends.ts
tsc --module commonjs ts/class/FormatRegistry.ts ts/class/Container.ts
tsc --module commonjs ts/core/random.ts ts/core/utils.ts ts/core/error.ts ts/core/infer.ts ts/core/traverse.ts
tsc --module commonjs ts/generators/boolean.ts ts/generators/null.ts ts/generators/words.ts
tsc --module commonjs ts/types/array.ts ts/types/integer.ts ts/types/number.ts ts/types/object.ts ts/types/string.ts

mv ts/api/*.js lib/api/
mv ts/class/*.js lib/class/
mv ts/core/*.js lib/core/
mv ts/generators/*.js lib/generators/
mv ts/types/*.js lib/types/
