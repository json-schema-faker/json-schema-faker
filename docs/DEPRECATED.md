# Deprecation Notice

## Importing

### Don't use the default export

CommonJS:

```js
const JSONSchemaFaker = require("json-schema-faker");
```

ESM:

```js
import JSONSchemaFaker from "json-schema-faker";
```

### Do use the named export

CommonJS:

```js
const { JSONSchemaFaker } = require("json-schema-faker");
```

ESM:

```js
import { JSONSchemaFaker } from "json-schema-faker";
```

## API

### Don't call `JSONSchemaFaker` as a function

This API is deprecated.

```js
const data = JSONSchemaFaker(schema, refs, cwd);
```

### Do call `.generate()`

This code is equivalent to the previous snippet.

```js
const data = JSONSchemaFaker.generate(schema, refs, cwd);
```

### Do call `.resolve()`

If possible, use `async` / `await` and `.resolve()` to generate data without blocking the thread.

```js
const data = await JSONSchemaFaker.resolve(schema, refs, cwd);
```
