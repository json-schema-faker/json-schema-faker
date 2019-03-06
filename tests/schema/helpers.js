import fs from 'fs';
import glob from 'glob';
import { expect } from 'chai';
import _jsf from '../../src';
import { checkType, checkSchema } from './validator';

export const jsf = _jsf;

export function pick(obj, key) {
  const parts = key.split('.');

  let out = obj;

  while (parts.length) {
    out = out[parts.shift()];
  }

  return out;
}

export function getTests(srcDir) {
  const only = [];
  const all = [];

  glob.sync(`${srcDir}/**/*.json`).forEach(file => {
    let suite;

    try {
      suite = JSON.parse(fs.readFileSync(file));
    } catch (e) {
      console.log(`Invalid JSON: ${file}`);
      console.log(e.message);
      process.exit(1);
    }

    (Array.isArray(suite) ? suite : [suite]).forEach(x => {
      if (x.xdescription) return;

      let _only = false;

      suite = Object.assign({ file }, x);

      suite.tests = suite.tests.sort((a, b) => {
        if (a.only) return -1;
        if (b.only) return 1;
        return 0;
      }).filter(y => {
        if ((_only && !y.only) || y.xdescription) return false;
        if (y.only) _only = true;
        return true;
      });

      if (x.only || _only) only.push(suite);

      all.push(suite);
    });
  });

  return { only, all };
}

export function tryTest(test, refs, schema) {
  return _jsf.resolve(schema, refs).then(sample => {
    if (test.dump) {
      console.log(JSON.stringify(sample, null, 2));
      return;
    }

    if (test.type) {
      checkType(sample, test.type);
    }

    if (test.valid) {
      checkSchema(sample, schema, refs);
    }

    if (test.length) {
      expect(sample.length).to.eql(test.length);
    }

    if (test.notEmpty) {
      test.notEmpty.forEach(x => {
        const value = pick(sample, x);

        if (value.length === 0) {
          throw new Error(`${x} should not be empty`);
        }
      });
    }

    if (test.hasProps) {
      test.hasProps.forEach(prop => {
        if (Array.isArray(sample)) {
          sample.forEach(s => {
            expect(s[prop]).not.to.eql(undefined);
          });
        } else {
          expect(sample[prop]).not.to.eql(undefined);
        }
      });
    }

    if (test.onlyProps) {
      expect(Object.keys(sample)).to.eql(test.onlyProps);
    }

    if (test.count) {
      expect((Array.isArray(sample) ? sample : Object.keys(sample)).length).to.eql(test.count);
    }

    if (test.hasNot) {
      expect(JSON.stringify(sample)).not.to.contain(test.hasNot);
    }

    if ('equal' in test) {
      expect(sample).to.eql(test.equal);
    }
  }).catch(error => {
    if (typeof test.throws === 'string') {
      expect(error).to.match(new RegExp(test.throws, 'im'));
      return;
    }

    if (typeof test.throws === 'boolean') {
      if (test.throws !== true) {
        throw error;
      }
      return;
    }

    throw error;
  });
}
