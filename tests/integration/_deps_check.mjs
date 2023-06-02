export async function depsCheck(jsf) {
  const result = await jsf.resolve({ const: 42 });

  jsf.option('resolveJsonPath', true);

  const data = await jsf.resolve({
    type: 'object',
    properties: {
      value: {
        const: 42,
      },
      other: {
        jsonPath: '$.value',
      },
    },
    required: [
      'value',
      'other',
    ],
  });

  return { result, data };
}
