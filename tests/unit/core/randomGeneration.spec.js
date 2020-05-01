import { expect } from 'chai';
import jsf from '../../../src/lib';

describe('Random Generation', () => {
  it('should generate all the fields with alwaysFakeOptionals option and additionalProperties: true', () => {
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

    return jsf.resolve(schema).then(resolved => {
      expect(Object.keys(resolved).length).to.be.at.least(2);
    });
  });
  it('should generate all the fields with alwaysFakeOptionals option and additionalProperties: false', () => {
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

    return jsf.resolve(schema).then(resolved => {
      expect(Object.keys(resolved).length).is.eql(2);
    });
  });
});
