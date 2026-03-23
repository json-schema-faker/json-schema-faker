# Migration from 0.5.x

This guide covers the main API changes for users moving from the historical `0.5.x` API to the current TypeScript implementation.

## Quick Mapping

| 0.5.x | Current |
| --- | --- |
| `random` option | `seed` option |
| `requiredOnly` | Still accepted as a compatibility option |
| `ignoreProperties` | Still accepted as a compatibility option |
| ad-hoc output filtering | `outputTransform(value, schema, path)` |

## `random` -> `seed`

Older usage often looked like this:

```js
jsf.option({
  random: 42
});
```

Use `seed` instead:

```ts
await generate(schema, {
  seed: 42
});
```

For reusable generators:

```ts
const generator = createGenerator({ seed: 42 });
```

Notes:
- `seed` is the public deterministic generation option.
- The compatibility test harness still understands a `random` field in legacy fixtures, but application code should migrate to `seed`.

## `requiredOnly`

If you relied on `requiredOnly`, it is still supported as a compatibility option:

```ts
await generate(schema, {
  requiredOnly: true
} as any);
```

Behavior:
- Optional object properties are omitted.
- Required properties are still generated.

For new code, prefer explicit option control where possible.

## `ignoreProperties`

Legacy `ignoreProperties` is also still supported:

```ts
await generate(schema, {
  ignoreProperties: [
    "internalId",
    /^debug/,
    (subschema) => typeof subschema === "object" && subschema !== null && subschema.default === null,
  ],
} as any);
```

Behavior:
- Matching object properties are removed from the generated output.
- Matching array items are omitted when the transform resolves to `undefined`.

## New `outputTransform`

The recommended replacement for custom output shaping is `outputTransform`.

```ts
await generate(schema, {
  outputTransform(value, schema, path) {
    if (path === "/user/name") {
      return String(value).toUpperCase();
    }

    if (path === "/internal") {
      return undefined;
    }

    return value;
  }
});
```

Properties:
- Runs for top-level and nested values.
- Receives the generated value, the schema node, and the generated output path.
- `path` is an output JSON pointer such as `/user/name`, not a schema traversal path like `/properties/user/properties/name`.
- Returning `undefined` omits the property or item from the final output.

## Browser Bundle Notes

The browser bundle keeps the familiar global shape:

```js
JSONSchemaFaker.option({ seed: 42 });
const value = await JSONSchemaFaker.resolve(schema);
```

If you previously used `random` there, switch to `seed`.

## Recommended Migration Order

1. Replace `random` with `seed`.
2. Keep `requiredOnly` and `ignoreProperties` temporarily if needed.
3. Move custom filtering logic to `outputTransform`.
4. Remove compatibility casts once your application code is using the typed current API directly.
