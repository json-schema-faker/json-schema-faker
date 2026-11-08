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

  // `then` must not undo what made `if` hold
  const merged = mergeSchemas([schema, { ...ifObj, properties: narrowed }, cond.then ?? true]);
  for (const [key, ifProp] of Object.entries(ifObj.properties ?? {})) {
    const wanted = listedValues(ifProp);
    const values = listedValues(merged.properties?.[key]);
    if (wanted && values && !values.every((v) => includesValue(wanted, v))) return undefined;
  }
  for (const key of ifObj.required ?? []) {
    if (merged.properties?.[key] === false) return undefined;
  }
  return merged;
}

/**
 * Builds a branch where `if` fails, then merges `else` into it. `if` is a
 * conjunction of its keywords, so it is enough to falsify one of them: a listed
 * property value is excluded, or an optional `required` property is omitted.
 * Negations that `else` would undo are discarded. Returns undefined when no
 * conjunct can be falsified.
 */
function elseBranch(schema: JsonSchemaObject, cond: Conditional, random: Random): JsonSchemaObject | undefined {
  if (cond.if === true || cond.else === false) return undefined;

  const ifObj = asObject(cond.if);
  if (!ifObj) return mergeSchemas([schema, cond.else ?? true]);

  const required = new Set(schema.required ?? []);
  const negations: Array<{ schema: JsonSchemaObject; holds: (merged: JsonSchemaObject) => boolean }> = [];

  for (const [key, ifProp] of Object.entries(ifObj.properties ?? {})) {
    const excluded = listedValues(ifProp);
    const current = schema.properties?.[key];
    if (!excluded || current === false) continue;

    const allowed = listedValues(current);
    const excludes = (merged: JsonSchemaObject) => {
      const values = listedValues(merged.properties?.[key]);
      return values === undefined || !values.some((v) => includesValue(excluded, v));
    };
    if (allowed) {
      const remaining = allowed.filter((v) => !includesValue(excluded, v));
      if (remaining.length === 0) continue;
      negations.push({
        schema: {
          ...schema,
          properties: { ...schema.properties, [key]: withValues(current, remaining) },
          required: [...required, key],
        },
        holds: excludes,
      });
    } else if (asObject(current)?.not === undefined) {
      negations.push({
        schema: {
          ...schema,
          properties: { ...schema.properties, [key]: { ...asObject(current), not: { enum: excluded } } },
          required: [...required, key],
        },
        holds: (merged) => listedValues(merged.properties?.[key]) === undefined
          ? asObject(merged.properties?.[key])?.not !== undefined
          : excludes(merged),
      });
    }
  }

  for (const key of ifObj.required ?? []) {
    if (required.has(key)) continue;
    negations.push({
      schema: { ...schema, properties: { ...schema.properties, [key]: false } },
      holds: (merged) => merged.properties?.[key] === false && !merged.required?.includes(key),
    });
  }

  for (const negation of random.shuffle(negations)) {
    const merged = mergeSchemas([negation.schema, cond.else ?? true]);
    if (negation.holds(merged)) return merged;
  }
  return undefined;
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
