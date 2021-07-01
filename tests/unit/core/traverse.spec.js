import { expect } from 'chai';
import traverse from '../../../src/lib/core/traverse';

function mockResolve(schema) {
  return schema;
}

/* global describe, it */

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

    expect(traverse(schema, '', mockResolve, schema)).to.eql({
      value: {
        foo: 0,
      },
      context: {
        description: schema.description,
        items: {
          foo: {
            title: schema.properties.foo.title,
            description: schema.properties.foo.description,
          },
        },
      },
    });
  });

  it('array value and context', () => {
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

    expect(traverse(schema, '', mockResolve, schema)).to.eql({
      value: ['foo'],
      context: {
        title: schema.title,
        items: [
          {
          description: schema.items.description,
        },
          ],
      },
    });
  });
});
