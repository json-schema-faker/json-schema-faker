import { expect } from 'chai';
import infer from '../../../src/core/infer';

/* global describe, it */

describe('Infer', () => {
  it('should infer `array` type when `additionalItems` property exists on top-level schema', () => {
    const schema = {
      additionalItems: true,
    };

    expect(infer(schema, '')).to.eql('array');
  });
});
