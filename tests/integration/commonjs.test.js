import { expect } from 'chai';

describe('CommonJS', () => {
  it('should work as expected with legacy default export', () => {
    const jsf = require('../../dist/main.cjs.js').default;

    expect(jsf).not.to.be.undefined;
    expect(jsf.VERSION).not.to.be.undefined;
    expect(jsf.generate).not.to.be.undefined;
    expect(jsf.generate({ const: 42 })).to.eql(42);
  });

  it('should work as expected with named export', () => {
    const { JSONSchemaFaker } = require('../../dist/main.cjs.js').default;

    expect(JSONSchemaFaker).not.to.be.undefined;
    expect(JSONSchemaFaker.VERSION).not.to.be.undefined;
    expect(JSONSchemaFaker.generate).not.to.be.undefined;
    expect(JSONSchemaFaker.generate({ const: 42 })).to.eql(42);
  });
});
