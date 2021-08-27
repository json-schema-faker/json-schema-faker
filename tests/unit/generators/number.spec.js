import { expect } from 'chai';
import is from 'is-my-json-valid';
import numberType from '../../../src/lib/types/number';

function isMultipleOf(name, multipleOf) {
  return is(numberType({ multipleOf }))(name);
}

describe.only('Number Generator', () => {
  it('should return number with a fractional part', () => {
    const n = numberType({});
    const m = Math.floor(n);

    expect(n).not.to.eql(m);
  });

  it('should handle multipleOf on integers', () => {
    expect(isMultipleOf({ multipleOf: 1 }, 1)).to.be.true;
  });

  it('should handle multipleOf on decimals', () => {
    expect(isMultipleOf({ multipleOf: 1e-7 }, 1e-7)).to.be.true;
    expect(isMultipleOf({ multipleOf: 8, minimum: 80, maximum: 90 }, 8)).to.be.true;
    expect(isMultipleOf({ multipleOf: 0.01, minimum: 0, maximum: 1 }, 8)).to.be.true;
    expect(isMultipleOf({ multipleOf: 0.01, minimum: 7, maximum: 10 }, 8)).to.be.true;
  });
});
