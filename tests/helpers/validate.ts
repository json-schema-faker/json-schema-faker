import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import type { JsonSchema } from "../../src/types.js";

const ajv = new Ajv2020({ strict: false, allErrors: true });
addFormats(ajv);

export function assertValid(schema: JsonSchema, value: unknown): void {
  const validate = ajv.compile(schema as object);
  const valid = validate(value);
  if (!valid) {
    const errors = validate.errors
      ?.map((e) => `${e.instancePath} ${e.message}`)
      .join("; ");
    throw new Error(
      `Validation failed: ${errors}\nValue: ${JSON.stringify(value, null, 2)}\nSchema: ${JSON.stringify(schema, null, 2)}`
    );
  }
}

export async function assertValidMultipleSeeds(
  schema: JsonSchema,
  seeds: number[] | number,
  generateFn: (schema: JsonSchema, options?: { seed?: number }) => Promise<unknown>
): Promise<void> {
  const seedList =
    typeof seeds === "number"
      ? Array.from({ length: seeds }, (_, i) => i + 1)
      : seeds;

  for (const seed of seedList) {
    const value = await generateFn(schema, { seed });
    try {
      assertValid(schema, value);
    } catch (e) {
      throw new Error(`Failed with seed=${seed}: ${(e as Error).message}`);
    }
  }
}
