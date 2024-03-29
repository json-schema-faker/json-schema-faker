import { expect } from 'chai';
import booleanGenerator from '../../../src/lib/generators/boolean.mjs';

describe('Boolean Generator', () => {
  it('should always return a boolean type', () => {
    expect(typeof booleanGenerator()).to.eql('boolean');
  });
});
