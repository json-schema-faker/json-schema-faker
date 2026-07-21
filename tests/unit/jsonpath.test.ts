import { describe, expect, test } from "bun:test";
import { evaluateJsonPath, parseJsonPath } from "../../src/utils/jsonpath.js";

describe("JSONPath utilities", () => {
  test("evaluates bracket-quoted keys", () => {
    expect(evaluateJsonPath('$["key"]', { key: 42 })).toEqual([42]);
    expect(evaluateJsonPath("$['key']", { key: 42 })).toEqual([42]);
  });

  test("evaluates mixed dot and bracket-quoted paths", () => {
    expect(evaluateJsonPath('$.foo["bar-baz"]', {
      foo: {
        "bar-baz": "value",
      },
    })).toEqual(["value"]);
  });

  test("preserves recursive-descent segments while parsing", () => {
    expect(parseJsonPath("$..name")).toEqual(["", "name"]);
    expect(evaluateJsonPath("$..name", {
      user: { name: "Ada" },
      team: [{ name: "Grace" }],
    })).toEqual(["Ada", "Grace"]);
  });
});
