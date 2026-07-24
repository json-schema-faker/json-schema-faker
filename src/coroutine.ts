export type Gen<T> = Generator<unknown, T, unknown>;

export function isPromiseLike(value: unknown): value is PromiseLike<unknown> {
  return typeof value === "object" && value !== null && "then" in value && typeof (value as { then: unknown }).then === "function";
}

export async function runAsync<T>(gen: Gen<T>): Promise<T> {
  let sent: unknown;
  let threw: unknown;
  let hasThrown = false;

  for (;;) {
    const step = hasThrown ? gen.throw(threw) : gen.next(sent);
    hasThrown = false;

    if (step.done) {
      return step.value;
    }

    try {
      sent = await step.value;
    } catch (err) {
      hasThrown = true;
      threw = err;
    }
  }
}

export function runSync<T>(gen: Gen<T>): T {
  let sent: unknown;

  for (;;) {
    const step = gen.next(sent);

    if (step.done) {
      return step.value;
    }

    if (isPromiseLike(step.value)) {
      throw new Error("generateSync() encountered an unexpected asynchronous operation.");
    }

    sent = step.value;
  }
}
