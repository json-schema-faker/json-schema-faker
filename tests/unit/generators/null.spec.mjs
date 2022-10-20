import { expect } from 'chai';
import nullGenerator from '../../../src/lib/generators/null.mjs';

describe('Null Generator', () => {
  it('should always return `null` value', () => {
    expect(nullGenerator()).to.eql(null);
  });
});
