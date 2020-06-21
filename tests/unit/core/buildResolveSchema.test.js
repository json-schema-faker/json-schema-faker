import chai from 'chai';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import buildResolveSchema from '../../../src/lib/core/buildResolveSchema';
import Container from '../../../src/lib/class/Container';

chai.use(sinonChai);
const { expect } = chai;

describe('lib/core/buildResolveSchema->resolveSchema', () => {
  const { resolveSchema: basicResolveSchema } = buildResolveSchema({
    container: new Container(),
  });

  context('when the schema has a "generate" key', () => {
    // TODO: figure out when this would happen
    it('returns the schema');
  });

  context('when the schema has an id', () => {
    it('removes the id and $schema properties', () => {
      const schema = {
        id: 'abc',
        $schema: {},
      };

      const result = basicResolveSchema(schema);

      expect(result).to.equal(schema);
      expect(result).to.eql({});
    });
  });

  context('when the schema has an $id', () => {
    it('removes the $id and $schema properties', () => {
      const schema = {
        $id: 'abc',
        $schema: {},
      };

      const result = basicResolveSchema(schema);

      expect(result).to.equal(schema);
      expect(result).to.eql({});
    });
  });

  // TODO: test a $ref schema and all of its variations
  context('when the schema is a $ref schema', () => {
    it('... test cases pending');
  });

  context('when the schema has an allOf', () => {
    const recursiveUtil = buildResolveSchema({
      container: new Container(),
    });
    const schema = {
      allOf: [
        {
          type: 'string',
          minLength: 2,
        },
        {
          type: 'string',
          maxLength: 4,
        },
      ],
    };
    let result;

    before(() => {
      sinon.spy(recursiveUtil, 'resolveSchema');

      result = recursiveUtil.resolveSchema(schema, null, ['test', 'path']);
    });

    it('resolves the inner schemas', () => {
      expect(recursiveUtil.resolveSchema).to.be.calledThrice;
      expect(recursiveUtil.resolveSchema).to.be.calledWithExactly({ type: 'string', minLength: 2 }, null, ['test', 'path']);
      expect(recursiveUtil.resolveSchema).to.be.calledWithExactly({ type: 'string', maxLength: 4 }, null, ['test', 'path']);
    });

    // TODO: test when some inner schemas are thunk schemas
    it('resolves inner thunk schemas with the parent schema');

    it('merges the allOf schemas into the sub schema', () => {
      expect(result).to.equal(schema);
      expect(result).to.eql({
        type: 'string',
        minLength: 2,
        maxLength: 4,
      });
    });

    it('deletes the allOf from the schema', () => {
      expect(schema.allOf).to.be.undefined;
    });
  });

  context('when the schema has a oneOf', () => {
    let result;
    before(() => {
      const schema = {
        anyOf: [],
      };
      result = basicResolveSchema(schema, null, ['test', 'path']);
    });

    it('returns a schema with a thunk', () => {
      expect(result).to.be.an('object').with.property('thunk').that.is.a('function');
    });
  });

  context('when the schema has a oneOf and an enum', () => {
    const schema = {
      enum: [1, 2, 3, 4, 5],
      oneOf: [
        { minimum: 2 },
        { maximum: 4 },
      ],
    };
    let result;

    before(() => {
      result = basicResolveSchema(schema, null, ['test', 'path']);
    });

    it('returns a schema with a thunk', () => {
      expect(result).to.be.an('object').with.property('thunk').that.is.a('function');
    });

    it('modifies the enum', () => {
      expect(schema.enum).to.eql([1, 5]);
    });
  });

  context('when the schema has an anyOf', () => {
    let result;
    before(() => {
      const schema = {
        oneOf: [],
      };
      result = basicResolveSchema(schema, null, ['test', 'path']);
    });

    it('returns a schema with a thunk', () => {
      expect(result).to.be.an('object').with.property('thunk').that.is.a('function');
    });
  });

  context('when a schema has an array property that is not a json-schema key', () => {
    const recursiveUtil = buildResolveSchema({
      container: new Container(),
    });
    const schema = {
      exampleProp: ['example array value'],
    };

    before(() => {
      sinon.spy(recursiveUtil, 'resolveSchema');

      recursiveUtil.resolveSchema(schema, null, ['test', 'path']);
    });

    it('resolves the property value as if it was a schema', () => {
      expect(recursiveUtil.resolveSchema).to.be.calledTwice;
      expect(recursiveUtil.resolveSchema).to.be.calledWithExactly(['example array value'], 'exampleProp', ['test', 'path', 'exampleProp']);
    });
  });

  context('when a schema has an object property that is not a json-schema key', () => {
    const recursiveUtil = buildResolveSchema({
      container: new Container(),
    });
    const schema = {
      exampleProp: { exampleInnerKey: 'example inner value' },
    };

    before(() => {
      sinon.spy(recursiveUtil, 'resolveSchema');

      recursiveUtil.resolveSchema(schema, null, ['test', 'path']);
    });

    it('resolves the property value as if it was a schema', () => {
      expect(recursiveUtil.resolveSchema).to.be.calledTwice;
      expect(recursiveUtil.resolveSchema).to.be.calledWithExactly(
        { exampleInnerKey: 'example inner value' },
        'exampleProp',
        ['test', 'path', 'exampleProp'],
      );
    });
  });

  context('when the function does not return for any other reason', () => {
    const container = new Container();
    const mockWrapReturnValue = Symbol('mockWrapReturn');
    let result;

    before(() => {
      sinon.stub(container, 'wrap').returns(mockWrapReturnValue);
      const { resolveSchema } = buildResolveSchema({ container });
      result = resolveSchema({ someKey: 'some value' }, null, ['test', 'path']);
    });

    it('wraps the schema', () => {
      expect(container.wrap).to.be.called
        .and.to.be.calledWithExactly({ someKey: 'some value' });
    });

    it('returns the wrapped schema', () => {
      expect(result).to.equal(mockWrapReturnValue);
    });
  });
});
