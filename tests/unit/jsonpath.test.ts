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

  test("preserves quoted numeric keys as property names, not array indices", () => {
    const data = { "0": "zero", "1": "one", 2: "two" };
    // $["0"] should access the property named "0"
    expect(evaluateJsonPath('$["0"]', data)).toEqual(["zero"]);
    expect(evaluateJsonPath("$['0']", data)).toEqual(["zero"]);
    // $[0] (unquoted) should access array index 0
    expect(evaluateJsonPath("$[0]", ["a", "b", "c"])).toEqual(["a"]);
  });

  test("recursive descent includes direct properties of the current object", () => {
    const data = {
      name: "root",
      child: { name: "nested" },
    };
    // $..name should match both root.name and child.name
    expect(evaluateJsonPath("$..name", data)).toEqual(["nested", "root"]);
  });

  test("recursive descent works with nested arrays", () => {
    const data = {
      items: [
        { name: "first" },
        { name: "second" },
      ],
    };
    expect(evaluateJsonPath("$..name", data)).toEqual(["first", "second"]);
  });
});
