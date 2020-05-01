import { expect } from 'chai';
import infer from '../../../src/lib/core/infer';

describe('Infer', () => {
  it('should infer `array` type when `additionalItems` property exists on top-level schema', () => {
    const schema = {
      additionalItems: true,
    };

    expect(infer(schema, '')).to.eql('array');
  });
});
