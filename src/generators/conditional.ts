import type { JsonSchema, JsonSchemaObject, Random } from "../types.js";
import { mergeSchemas } from "../merge.js";

export interface Conditional {
  if: JsonSchema;
  then?: JsonSchema;
  else?: JsonSchema;
}

function asObject(schema: JsonSchema | undefined): JsonSchemaObject | undefined {
  return typeof schema === "object" && schema !== null ? schema : undefined;
}

function listedValues(schema: JsonSchema | undefined): unknown[] | undefined {
  const obj = asObject(schema);
  if (!obj) return undefined;
  if (obj.const !== undefined) return [obj.const];
  if (Array.isArray(obj.enum)) return obj.enum;
  return undefined;
}

function includesValue(values: unknown[], value: unknown): boolean {
  const key = JSON.stringify(value);
  return values.some((v) => JSON.stringify(v) === key);
}

function withValues(schema: JsonSchema | undefined, values: unknown[]): JsonSchemaObject {
  const { const: _const, enum: _enum, ...rest } = asObject(schema) ?? {};
  return { ...rest, enum: values };
}

/**
 * Builds the `if` + `then` branch, or returns undefined when `if` cannot hold
 * against the values the schema already allows.
 */
function thenBranch(schema: JsonSchemaObject, cond: Conditional): JsonSchemaObject | undefined {
  if (cond.if === false || cond.then === false) return undefined;

  const ifObj = asObject(cond.if);
  if (!ifObj) return mergeSchemas([schema, cond.then ?? true]);

  const narrowed: Record<string, JsonSchema> = {};
  for (const [key, ifProp] of Object.entries(ifObj.properties ?? {})) {
    const wanted = listedValues(ifProp);
    const allowed = listedValues(schema.properties?.[key]);
    if (wanted && allowed) {
      const common = allowed.filter((v) => includesValue(wanted, v));
      if (common.length === 0) return undefined;
      narrowed[key] = withValues(ifProp, common);
    } else {
      narrowed[key] = ifProp;
    }
  }

  for (const key of ifObj.required ?? []) {
    if (schema.properties?.[key] === false) return undefined;
  }

  return mergeSchemas([schema, { ...ifObj, properties: narrowed }, cond.then ?? true]);
}

/**
 * Builds a branch where `if` fails, then merges `else` into it. `if` is a
 * conjunction of its keywords, so it is enough to falsify one of them: a listed
 * property value is excluded, or an optional `required` property is omitted.
 * Returns undefined when no conjunct can be falsified.
 */
function elseBranch(schema: JsonSchemaObject, cond: Conditional, random: Random): JsonSchemaObject | undefined {
  if (cond.if === true || cond.else === false) return undefined;

  const ifObj = asObject(cond.if);
  if (!ifObj) return mergeSchemas([schema, cond.else ?? true]);

  const required = new Set(schema.required ?? []);
  const negations: Array<() => JsonSchemaObject> = [];

  for (const [key, ifProp] of Object.entries(ifObj.properties ?? {})) {
    const excluded = listedValues(ifProp);
    const current = schema.properties?.[key];
    if (!excluded || current === false) continue;

    const allowed = listedValues(current);
    if (allowed) {
      const remaining = allowed.filter((v) => !includesValue(excluded, v));
      if (remaining.length === 0) continue;
      negations.push(() => ({
        ...schema,
        properties: { ...schema.properties, [key]: withValues(current, remaining) },
        required: [...required, key],
      }));
    } else if (asObject(current)?.not === undefined) {
      negations.push(() => ({
        ...schema,
        properties: { ...schema.properties, [key]: { ...asObject(current), not: { enum: excluded } } },
        required: [...required, key],
      }));
    }
  }

  for (const key of ifObj.required ?? []) {
    if (required.has(key)) continue;
    negations.push(() => ({
      ...schema,
      properties: { ...schema.properties, [key]: false },
    }));
  }

  if (negations.length === 0) return undefined;
  return mergeSchemas([random.pick(negations)(), cond.else ?? true]);
}

/**
 * Returns the feasible branches of a conditional, in the order they should be
 * tried: a seeded pick first, then the other one as a fallback.
 */
export function conditionalBranches(
  schema: JsonSchemaObject,
  cond: Conditional,
  random: Random
): JsonSchemaObject[] {
  const branches = [thenBranch(schema, cond), elseBranch(schema, cond, random)]
    .filter((branch): branch is JsonSchemaObject => branch !== undefined);
  return branches.length > 1 && random.bool() ? branches.reverse() : branches;
}
