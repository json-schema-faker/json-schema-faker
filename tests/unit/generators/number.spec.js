import { expect } from 'chai';
import numberType from '../../../src/lib/types/number';

describe('Number Generator', () => {
  it('should return number with a fractional part', () => {
    const n = numberType({});
    const m = Math.floor(n);

    expect(n).not.to.eql(m);
  });
});
