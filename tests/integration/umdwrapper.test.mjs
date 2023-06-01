import { expect } from 'chai';
import * as td from 'testdouble';

import '../../dist/bundle.js';
import { depsCheck } from './_deps_check.mjs';

/* global globalThis */

const jsf = globalThis.JSONSchemaFaker;

describe('UMD Wrapper', () => {
  afterEach(() => {
    td.reset();
  });

  it('should work as expected with legacy default export', () => {
    expect(jsf).not.to.be.undefined;
    expect(jsf.VERSION).not.to.be.undefined;
    expect(jsf.generate).not.to.be.undefined;
    expect(jsf.generate({ const: 42 })).to.eql(42);
  });

  it('should warn about deprecated access from default export', () => {
    td.replace(console, 'debug', td.func('console.debug'));

    expect(typeof jsf).to.eql('function');
    expect(() => jsf({ const: 42 })).not.to.throw();

    const fn = td.explain(console.debug);

    expect(fn.callCount).to.eql(1);
    expect(fn.calls[0].args[0]).to.contains('deprecated');
  });

  it('should work as expected with named export', () => {
    const { JSONSchemaFaker } = jsf;

    expect(JSONSchemaFaker).not.to.be.undefined;
    expect(JSONSchemaFaker.VERSION).not.to.be.undefined;
    expect(JSONSchemaFaker.generate).not.to.be.undefined;
    expect(JSONSchemaFaker.generate({ const: 42 })).to.eql(42);
  });

  it('should load third-party dependencies', async () => {
    const { result, data } = await depsCheck(jsf);

    expect(result).to.eql(42);
    expect(data).to.eql({ value: 42, other: 42 });
  });
});

