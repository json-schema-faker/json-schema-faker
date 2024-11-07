import { expect } from 'chai';
import traverse from '../../../src/lib/core/traverse.mjs';

function mockResolve(schema) {
  return schema;
}

describe('Traverse', () => {
  it('basic value and context', () => {
    const schema = {
      description: 'root object',
      type: 'object',
      properties: {
        foo: {
          title: 'Foo',
          description: 'a foo number',
          type: 'number',
          generate: () => 0,
        },
      },
      additionalProperties: false,
    };

    expect(traverse(schema, [], mockResolve, schema)).to.eql({
      value: {
        foo: 0,
      },
      context: {
        schemaPath: [],
        description: schema.description,
        items: {
          schemaPath: ['properties'],
          foo: {
            schemaPath: ['properties', 'foo'],
            title: schema.properties.foo.title,
            description: schema.properties.foo.description,
          },
        },
      },
    });
  });

  it('array list value and context', () => {
    const schema = {
      title: 'Foo array',
      type: 'array',
      items: {
        description: 'a string in the array',
        type: 'string',
        generate: () => 'foo',
      },
      maxItems: 1,
    };

    expect(traverse(schema, [], mockResolve, schema)).to.eql({
      value: [],
      context: {
        schemaPath: [],
        title: schema.title,
        items: []
      },
    });
  });

  it('array tuple value and context', () => {
    const schema = {
      type: 'array',
      items: [
        {
          title: 'Always zero',
          const: 0,
        },
        {
          description: 'Some string',
          type: 'string',
          generate: () => 'foo',
        },
      ],
    };

    expect(traverse(schema, [], mockResolve, schema)).to.eql({
      value: [0, 'foo'],
      context: {
        schemaPath: [],
        items: [
          {
            schemaPath: ['items', 0],
            title: schema.items[0].title,
          },
          {
            schemaPath: ['items', 1],
            description: schema.items[1].description,
          },
        ],
      },
    });
  });
});
