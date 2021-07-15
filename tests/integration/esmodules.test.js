import { expect } from 'chai';

import jsf from '../../dist/main.esm.js';

global.$RefParser = require('json-schema-ref-parser');

describe('ES Module', () => {
  it('should works as expected', async () => {
    expect(jsf).not.to.be.undefined;
    expect(jsf.VERSION).not.to.be.undefined;
    expect(jsf.generate).not.to.be.undefined;
    expect(jsf.generate({ const: 42 })).to.eql(42);
  });
});
