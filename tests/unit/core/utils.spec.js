import { expect } from 'chai';
import utils from '../../../src/lib/core/utils';
import optionAPI from '../../../src/lib/api/option';

describe('Utils', () => {
  describe('hasProperties function', () => {
    const bigObject = {
      some: 'keys',
      existing: 'on',
      the: 'object',
    };

    const smallObject = {
      some: 'keys',
    };

    it('should return true when one key being checked', () => {
      expect(utils.hasProperties(bigObject, 'some')).to.eql(true);
      expect(utils.hasProperties(bigObject, 'existing')).to.eql(true);
      expect(utils.hasProperties(bigObject, 'the')).to.eql(true);
      expect(utils.hasProperties(smallObject, 'some')).to.eql(true);
    });

    it('should return true when all keys being checked', () => {
      expect(utils.hasProperties(bigObject, 'some', 'existing', 'the')).to.eql(true);
      expect(utils.hasProperties(smallObject, 'some', 'existing', 'the')).to.eql(true);
    });

    it('should return false when no keys exist on object', () => {
      expect(utils.hasProperties(bigObject, 'different')).to.eql(false);
      expect(utils.hasProperties(smallObject, 'different')).to.eql(false);
    });
  });

  describe('getSubAttribute function', () => {
    const object = {
      outer: {
        inner: {
          key: 'value',
        },
      },
    };

    it('should return a leaf if chain is long enough', () => {
      expect(utils.getSubAttribute(object, 'outer.inner.key')).to.eql('value');
      expect(utils.getSubAttribute(object, 'outer.inner.key.help.me')).to.eql('value');
    });

    it('should return a subobject if the chain doesn\'t reach a leaf (is shorter)', () => {
      expect(utils.getSubAttribute(object, 'outer.inner')).to.eql({ key: 'value' });
    });

    it('should return a subobject of the valid chain part (and ignore the invalid chain part)', () => {
      expect(utils.getSubAttribute(object, 'outer.help.me')).to.eql({ inner: { key: 'value' } });
      expect(utils.getSubAttribute(object, 'help.me')).to.eql(object);
    });
  });

  describe('typecast function', () => {
    it('should normalize constraints and format final values', () => {
      utils.typecast(null, {}, opts => {
        expect(opts).to.eql({});
      });

      const schema = {
        type: 'integer',
        enum: [1, 2, 3],
        minimum: 2,
      };

      utils.typecast(null, schema, opts => {
        expect(schema.enum).to.eql([2, 3]);
        expect(opts).to.eql({ minimum: 2 });
      });
    });

    it('should use global options when not defined in the schema', () => {
      optionAPI({
        minLength: 3,
        maxLength: 4,
      });

      utils.typecast(null, {
        type: 'string',
      }, opts => {
        expect(opts).to.eql({ minLength: 3, maxLength: 4 });
      });
    });

    it('should normalize constraints with global options', () => {
      optionAPI({
        minLength: 3,
        maxLength: 4,
      });

      utils.typecast(null, {
        type: 'string',
        minLength: 2,
        maxLength: 10,
      }, opts => {
        expect(opts).to.eql({ minLength: 3, maxLength: 4 });
      });
    });

    it('should accept custom types for typecasting', () => {
      optionAPI({
        minLength: 2,
        maxLength: 10,
      });

      utils.typecast('string', {
        minLength: 5,
        maxLength: 8,
      }, opts => {
        expect(opts).to.eql({ minLength: 5, maxLength: 8 });
      });
    });
  });

  describe('merge function', () => {
    context('when a and b have primitive properties of the same type', () => {
      it('should overwrite the key with b\'s value', () => {
        const a = { c: 1 };
        const b = { c: 2 };

        expect(utils.merge(a, b)).to.eql({ c: 2 });
      });
    });

    context('when a and b have primitive properties of a different type', () => {
      it('should overwrite the key with b\'s value', () => {
        const a = { c: 1 };
        const b = { c: '2' };

        expect(utils.merge(a, b)).to.eql({ c: '2' });
      });
    });

    context('when a and b have the same property but b\'s is null', () => {
      it('should overwrite the key with null', () => {
        const a = { c: [] };
        const b = { c: null };

        expect(utils.merge(a, b)).to.eql({ c: null });
      });
    });

    context('when b has an array property that a does not have', () => {
      it('should copy the array into a', () => {
        const a = {};
        const b = { c: [1, 2, 3] };

        const merged = utils.merge(a, b);
        expect(merged).to.eql({ c: [1, 2, 3] });
        expect(merged.c).to.not.equal(b.c);
      });
    });

    context('when b has an array property that is a different type in a', () => {
      it('should not modify a\'s property', () => {
        const a = { c: 'test' };
        const b = { c: [1, 2, 3] };

        expect(utils.merge(a, b)).to.eql({ c: 'test' });
      });
    });

    context('when b and a have the same array property', () => {
      it('should modify a\'s property to be the union of both arrays', () => {
        const a = { c: [1, 3, 5] };
        const b = { c: [1, 2, 4, 5] };

        expect(utils.merge(a, b)).to.eql({ c: [1, 3, 5, 2, 4] });
      });
    });

    context('when a and b have the same property but b\'s is an object and a\'s is a primitive', () => {
      it('should set a\'s property to a copy of b', () => {
        const a = { c: 2 };
        const b = { c: { d: 1 } };

        const merged = utils.merge(a, b);
        expect(merged).to.eql({ c: { d: 1 } });
        expect(merged.c).to.not.equal(b.c);
      });
    });

    context('when a and b have the same property but b\'s is an object and a\'s is null', () => {
      it('should set a\'s property to a copy of b', () => {
        const a = { c: null };
        const b = { c: { d: 1 } };

        const merged = utils.merge(a, b);
        expect(merged).to.eql({ c: { d: 1 } });
        expect(merged.c).to.not.equal(b.c);
      });
    });

    context('when a and b have the same property but b\'s is an object and a\'s is an array', () => {
      it('should set a\'s property to a copy of b', () => {
        const a = { c: [1, 2, 3] };
        const b = { c: { d: 4 } };

        const merged = utils.merge(a, b);
        expect(merged).to.eql({ c: { d: 4 } });
        expect(merged.c).to.not.equal(b.c);
      });
    });

    context('when a and be have the same object property', () => {
      it('should merge the objects', () => {
        const a = { c: { d: 1 } };
        const b = { c: { d: 2 } };

        const merged = utils.merge(a, b);
        expect(merged).to.eql({ c: { d: 2 } });
        expect(merged.c).to.not.equal(b.c);
      });
    });

    context('when a has properties that b does not have', () => {
      it('should not modify those properties', () => {
        const a = { c: 1, d: 2 };
        const b = { d: 3 };

        expect(utils.merge(a, b)).to.eql({ c: 1, d: 3 });
      });
    });
  });

  describe('clone function', () => {
    it('should handle falsy objects', () => {
      expect(utils.clone(undefined)).to.be.undefined;
    });

    it('should handle non object arguments', () => {
      expect(utils.clone(2)).to.equal(2);
    });

    it('should handle cached objects', () => {
      const object = {};
      const cache = new Map();
      cache.set(object, 'hello');

      const clone = utils.clone(object, cache);
      expect(clone).to.equal('hello');
    });

    it('should handle cached arrays', () => {
      const array = [];
      const cache = new Map();
      cache.set(array, 'hello');

      const clone = utils.clone(array, cache);
      expect(clone).to.equal('hello');
    });

    it('should handle objects', () => {
      const original = {
        prop1: 1,
        prop2: 2,
      };
      const clone = utils.clone(original);

      expect(clone).to.not.equal(original);
      expect(clone).to.eql(original);
    });

    it('should handle arrays', () => {
      const original = [1, 2, 3];
      const clone = utils.clone(original);

      expect(clone).to.not.equal(original);
      expect(clone).to.eql(original);
    });

    it('should handle circular refs in objects', () => {
      const a = {};
      const b = { a };
      a.b = b;

      const clone = utils.clone(a);
      expect(clone.b.a).to.equal(clone);
    });

    it('should handle circular refs in arrays', () => {
      const a = [];
      const b = [a];
      a.push(b);

      const clone = utils.clone(a);
      expect(clone[0][0]).to.equal(clone);
    });
  });

  describe('validateValueForSchema function ', () => {
    context('when a schema has a minimum and maximum', () => {
      const schema = {
        minimum: 2,
        maximum: 4,
      };

      // TODO: verify that this behavior is correct
      context('and the value is less than the minimum', () => {
        it('should return true?', () => {
          expect(utils.validateValueForSchema(1, schema)).to.be.true;
        });
      });

      context('and the value is equal to the minimum', () => {
        it('should return true', () => {
          expect(utils.validateValueForSchema(2, schema)).to.be.true;
        });
      });

      context('and the value is between the minimum and maximum', () => {
        it('should return true', () => {
          expect(utils.validateValueForSchema(3, schema)).to.be.true;
        });
      });

      context('and the value is equal to the maximum', () => {
        it('should return true', () => {
          expect(utils.validateValueForSchema(4, schema)).to.be.true;
        });
      });

      // TODO: verify that this behavior is correct
      context('and the value is greater than the maximum', () => {
        it('should return true?', () => {
          expect(utils.validateValueForSchema(5, schema)).to.be.true;
        });
      });
    });

    context('when a schema only has a minimum', () => {
      const schema = { minimum: 2 };

      context('and the value is less than the minimum', () => {
        it('should return false', () => {
          expect(utils.validateValueForSchema(1, schema)).to.be.false;
        });
      });

      context('and the value is equal to the minimum', () => {
        it('should return true', () => {
          expect(utils.validateValueForSchema(2, schema)).to.be.true;
        });
      });

      context('and the value is greater than the minimum', () => {
        it('should return true', () => {
          expect(utils.validateValueForSchema(3, schema)).to.be.true;
        });
      });
    });

    context('when a schema only has a maximum', () => {
      const schema = { maximum: 4 };

      context('and the value is less than the maximum', () => {
        it('should return true', () => {
          expect(utils.validateValueForSchema(3, schema)).to.be.true;
        });
      });

      context('and the value is equal to the maximum', () => {
        it('should return true', () => {
          expect(utils.validateValueForSchema(4, schema)).to.be.true;
        });
      });

      context('and the value is greater than the maximum', () => {
        it('should return false', () => {
          expect(utils.validateValueForSchema(5, schema)).to.be.false;
        });
      });
    });

    context('when a schema does not have a minimum or maximum', () => {
      const schema = {};

      it('should return false', () => {
        expect(utils.validateValueForSchema(0, schema)).to.be.false;
      });
    });
  });

  describe('validate function', () => {
    context('with 0 schemas', () => {
      it('should return false', () => {
        expect(utils.validate(0, [])).to.be.false;
      });
    });

    context('when the value is valid for every schema', () => {
      it('should return false', () => {
        expect(utils.validate(1, [{ maximum: 1 }, { maximum: 2 }])).to.be.false;
      });
    });

    context('when the value is invalid for at least one schema', () => {
      it('should return true', () => {
        expect(utils.validate(2, [{ maximum: 1 }, { maximum: 2 }])).to.be.true;
      });
    });

    context('when the value is invalid for at least one schema', () => {
      it('should return true', () => {
        expect(utils.validate(3, [{ maximum: 1 }, { maximum: 2 }])).to.be.true;
      });
    });
  });

  describe('clean function', () => {
    it('should remove undefined values', () => {
      const a = { b: undefined, c: { d: 'string value', e: [undefined] } };

      const cleaned = utils.clean(a);
      expect(cleaned).to.eql({ c: { d: 'string value', e: [] } });
    });

    it('should return same value if not passed an object', () => {
      expect(utils.clean(null)).to.eql(null);
      expect(utils.clean('string value')).to.eql('string value');
      expect(utils.clean(undefined)).to.eql(undefined);
      expect(utils.clean(123)).to.eql(123);
    });

    it('should respect required keys when removing empty objects', () => {
      const a = { b: {}, c: { d: 'string value' }, e: {} };

      const cleaned = utils.clean(a, { required: ['b'] });
      expect(cleaned).to.eql({ b: {}, c: { d: 'string value' } });
    });
  });
});
