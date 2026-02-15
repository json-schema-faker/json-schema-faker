import { describe, test, expect } from "bun:test";
import { createRandom } from "../../src/random.js";

describe("random", () => {
  test("deterministic with same seed", () => {
    const a = createRandom(42);
    const b = createRandom(42);
    for (let i = 0; i < 100; i++) {
      expect(a.next()).toBe(b.next());
    }
  });

  test("different seeds produce different sequences", () => {
    const a = createRandom(1);
    const b = createRandom(2);
    const valuesA = Array.from({ length: 10 }, () => a.next());
    const valuesB = Array.from({ length: 10 }, () => b.next());
    expect(valuesA).not.toEqual(valuesB);
  });

  test("int produces values in range", () => {
    const r = createRandom(1);
    for (let i = 0; i < 100; i++) {
      const val = r.int(5, 10);
      expect(val).toBeGreaterThanOrEqual(5);
      expect(val).toBeLessThanOrEqual(10);
    }
  });

  test("bool returns boolean", () => {
    const r = createRandom(1);
    for (let i = 0; i < 50; i++) {
      expect(typeof r.bool()).toBe("boolean");
    }
  });

  test("pick returns element from array", () => {
    const r = createRandom(1);
    const arr = [1, 2, 3, 4, 5];
    for (let i = 0; i < 50; i++) {
      expect(arr).toContain(r.pick(arr));
    }
  });

  test("shuffle produces permutation", () => {
    const r = createRandom(1);
    const arr = [1, 2, 3, 4, 5];
    const shuffled = r.shuffle(arr);
    expect(shuffled.sort()).toEqual([1, 2, 3, 4, 5]);
  });

  test("fork produces independent stream", () => {
    const r = createRandom(1);
    r.next(); // advance
    const forked = r.fork();
    const a = forked.next();
    const b = r.next();
    // They should be different (independent streams)
    expect(a).not.toBe(b);
  });
});
