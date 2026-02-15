import type { Random } from "./types.js";

function mulberry32(seed: number): () => number {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function createRandom(seed: number): Random {
  const raw = mulberry32(seed);
  let callCount = 0;

  const random: Random = {
    next(): number {
      callCount++;
      return raw();
    },

    int(min: number, max: number): number {
      return min + Math.floor(random.next() * (max - min + 1));
    },

    bool(probability = 0.5): boolean {
      return random.next() < probability;
    },

    pick<T>(arr: readonly T[]): T {
      return arr[random.int(0, arr.length - 1)];
    },

    shuffle<T>(arr: T[]): T[] {
      const result = [...arr];
      for (let i = result.length - 1; i > 0; i--) {
        const j = random.int(0, i);
        [result[i], result[j]] = [result[j], result[i]];
      }
      return result;
    },

    fork(): Random {
      const newSeed = Math.floor(random.next() * 4294967296);
      return createRandom(newSeed);
    },
  };

  return random;
}
