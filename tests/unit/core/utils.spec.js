import { expect } from 'chai';
import utils from '../../../src/core/utils';
import optionAPI from '../../../src/api/option';

/* global describe, it */

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

    it('should normalize constraints with global options', () => {
      optionAPI({
        maxLength: 4,
      });

      utils.typecast(null, {
        type: 'string',
        maxLength: 10,
      }, opts => {
        expect(opts).to.eql({ maxLength: 4 });
      });
    });

    it('should accept custom types for typecasting', () => {
      optionAPI({
        maxLength: 5,
      });

      utils.typecast('string', {
        maxLength: 10,
      }, opts => {
        expect(opts).to.eql({ maxLength: 5 });
      });
    });
  });
});
