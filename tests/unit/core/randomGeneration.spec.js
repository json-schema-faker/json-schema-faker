import { expect } from 'chai';
import jsf from '../../../src';

/* global describe, it */

describe('Random Generation', () => {
  it('should generate all the fields with alwaysFakeOptionals option and additionalProperties: true', async () => {
    jsf.option({
      alwaysFakeOptionals: true,
    });

    const schema = {
      type: 'object',
      properties: {
        foo: { type: 'string' },
        bar: { type: 'string' },
      },
      required: [],
      additionalProperties: true,
    };

    const resolved = await jsf.resolve(schema);

    expect(Object.keys(resolved).length).to.be.at.least(2);
  });
  it('should generate all the fields with alwaysFakeOptionals option and additionalProperties: false', async () => {
    jsf.option({
      alwaysFakeOptionals: true,
    });

    const schema = {
      type: 'object',
      properties: {
        foo: { type: 'string' },
        bar: { type: 'string' },
      },
      required: [],
      additionalProperties: false,
    };

    const resolved = await jsf.resolve(schema);

    expect(Object.keys(resolved).length).is.eql(2);
  });
});
