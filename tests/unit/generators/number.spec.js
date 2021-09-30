import { expect } from 'chai';
import numberType from '../../../src/lib/types/number';

describe('Number Generator', () => {
  it('should return number with a fractional part', () => {
    const n = numberType({});
    const m = Math.floor(n);

    expect(n).not.to.eql(m);
  });

  describe('should ignore min and max if using Number.MAX_VALUE in then', () => {
    it('ignoring minimum', () => {
      const n = numberType({ minimum: -Number.MAX_VALUE });

      expect(n).to.be.a('number');
      expect(n).to.not.be.NaN;
      expect(n).to.not.be.eq(Infinity);
    });

    it('ignoring minimum', () => {
      const n = numberType({ maximum: Number.MAX_VALUE });

      expect(n).to.be.a('number');
      expect(n).to.not.be.NaN;
      expect(n).to.not.be.eq(Infinity);
    });

    it('ignoring both', () => {
      const n = numberType({ minimum: -Number.MAX_VALUE, maximum: Number.MAX_VALUE });

      expect(n).to.be.a('number');
      expect(n).to.not.be.NaN;
      expect(n).to.not.be.eq(Infinity);
    });
  });
});
