import { expect } from 'chai';

import jsf, { JSONSchemaFaker } from '../../dist/main.esm.js';

global.$RefParser = require('json-schema-ref-parser');

describe('ES Module', () => {
  it('should work as expected with legacy default export', async () => {
    expect(jsf).not.to.be.undefined;
    expect(jsf.VERSION).not.to.be.undefined;
    expect(jsf.generate).not.to.be.undefined;
    expect(jsf.generate({ const: 42 })).to.eql(42);
  });

  it('should work as expected with named export', async () => {
    expect(JSONSchemaFaker).not.to.be.undefined;
    expect(JSONSchemaFaker.VERSION).not.to.be.undefined;
    expect(JSONSchemaFaker.generate).not.to.be.undefined;
    expect(JSONSchemaFaker.generate({ const: 42 })).to.eql(42);
  });
});
