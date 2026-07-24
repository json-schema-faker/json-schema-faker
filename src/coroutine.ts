import type { JsonSchema, GenerateContext } from "./types.js";

export type Gen<T> = Generator<unknown, T, unknown>;

export function isPromiseLike(value: unknown): value is PromiseLike<unknown> {
  return typeof value === "object" && value !== null && "then" in value && typeof (value as { then: unknown }).then === "function";
}

const WALK_CALL = Symbol("walkCall");

/**
 * Marker yielded (not yield*-delegated) to request a nested schema walk.
 * The trampoline in runAsync/runSync spawns it as an independent generator
 * on an explicit stack instead of native `yield*` delegation, so recursion
 * depth (deep $ref chains, deeply nested required trees) doesn't grow the
 * JS call stack — see #879 review feedback re: stack overflow on deep refs.
 */
export interface WalkCall {
  readonly [WALK_CALL]: true;
  readonly schema: JsonSchema;
  readonly ctx: GenerateContext;
}

export function walkCall(schema: JsonSchema, ctx: GenerateContext): WalkCall {
  return { [WALK_CALL]: true, schema, ctx };
}

function isWalkCall(value: unknown): value is WalkCall {
  return typeof value === "object" && value !== null && WALK_CALL in value;
}

type Spawn = (schema: JsonSchema, ctx: GenerateContext) => Gen<unknown>;

interface Frame {
  gen: Gen<unknown>;
  sent: unknown;
  hasThrown: boolean;
  threw: unknown;
}

function pushFrame(stack: Frame[], gen: Gen<unknown>): void {
  stack.push({ gen, sent: undefined, hasThrown: false, threw: undefined });
}

/**
 * Steps the top-of-stack frame. If it throws (either because the frame's own
 * body threw, or because a spawned child frame we're forwarding an error into
 * rethrew), the error is routed into the new top-of-stack frame via `.throw()`
 * on the next iteration — mirroring how `yield*` propagates a delegate's
 * exception back to the try/catch around the original `yield*` expression.
 * Returns `undefined` (via mutating `stack`) when the whole trampoline should
 * keep looping; the caller distinguishes completion via `stack.length`.
 */
function step(stack: Frame[]): IteratorResult<unknown, unknown> | undefined {
  const frame = stack[stack.length - 1];
  let result: IteratorResult<unknown, unknown>;

  try {
    result = frame.hasThrown ? frame.gen.throw(frame.threw) : frame.gen.next(frame.sent);
  } catch (err) {
    stack.pop();
    if (stack.length === 0) {
      throw err;
    }
    const parent = stack[stack.length - 1];
    parent.hasThrown = true;
    parent.threw = err;
    return undefined;
  }

  frame.hasThrown = false;
  return result;
}

export async function runAsync<T>(rootGen: Gen<T>, spawn: Spawn): Promise<T> {
  const stack: Frame[] = [];
  pushFrame(stack, rootGen as Gen<unknown>);

  for (;;) {
    const result = step(stack);
    if (result === undefined) {
      continue;
    }

    if (result.done) {
      stack.pop();
      if (stack.length === 0) {
        return result.value as T;
      }
      stack[stack.length - 1].sent = result.value;
      continue;
    }

    if (isWalkCall(result.value)) {
      pushFrame(stack, spawn(result.value.schema, result.value.ctx));
      continue;
    }

    const frame = stack[stack.length - 1];
    try {
      frame.sent = await result.value;
    } catch (err) {
      frame.hasThrown = true;
      frame.threw = err;
    }
  }
}

export function runSync<T>(rootGen: Gen<T>, spawn: Spawn): T {
  const stack: Frame[] = [];
  pushFrame(stack, rootGen as Gen<unknown>);

  for (;;) {
    const result = step(stack);
    if (result === undefined) {
      continue;
    }

    if (result.done) {
      stack.pop();
      if (stack.length === 0) {
        return result.value as T;
      }
      stack[stack.length - 1].sent = result.value;
      continue;
    }

    if (isWalkCall(result.value)) {
      pushFrame(stack, spawn(result.value.schema, result.value.ctx));
      continue;
    }

    if (isPromiseLike(result.value)) {
      throw new Error("generateSync() encountered an unexpected asynchronous operation.");
    }

    stack[stack.length - 1].sent = result.value;
  }
}
