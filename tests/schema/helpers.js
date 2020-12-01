import fs from 'fs';
import glob from 'glob';
import { expect } from 'chai';
import _jsf from '../../src/lib';
import { checkType, checkSchema } from './validator';

export const jsf = _jsf;

export function pick(obj, key) {
  const parts = key.split('.');

  let out = obj;

  while (parts.length > 1) {
    out = out[parts.shift()];
  }

  return out && out[parts.shift()];
}

export function getTests(srcDir) {
  const only = [];
  const all = [];

  glob.sync(`${srcDir}/**/*.json`, { ignore: ['**/external-ref-files/*'] }).forEach(file => {
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

export function tryTest(nth, max, test, refs, schema) {
  return Promise.resolve()
    .then(() => _jsf[test.sync ? 'generate' : 'resolve'](schema, refs))
    .then(sample => {
      if (test.dump) {
        console.log(JSON.stringify(sample, null, 2));

        if (test.dump === 'bail') {
          return;
        }
      }

      try {
        if (test.type) {
          checkType(sample, test.type);
        }

        if (test.valid) {
          checkSchema(sample, schema, refs);
        }
      } catch (e) {
        const _e = new Error(`${e.message.split('\n')[0]} (${nth} of ${max})`);

        _e.stack = e.stack.split('\n').slice(1).join('\n');

        throw _e;
      }

      if (test.check) {
        checkSchema(sample, test.check, refs);
      }

      if (test.length) {
        expect(sample.length).to.eql(test.length);
      }

      if (test.notEmpty) {
        test.notEmpty.forEach(objectPath => {
          const value = pick(sample, objectPath);

          if (value === undefined || (Array.isArray(value) && !value.length)) {
            throw new Error(`${objectPath} should not be empty`);
          }
        });
      }

      if (test.hasProps) {
        test.hasProps.forEach(prop => {
          if (Array.isArray(sample)) {
            sample.forEach(s => {
              if (typeof pick(s, prop) === 'undefined') {
                throw new Error(`Property '${prop}' is not present`);
              }
            });
          } else if (typeof pick(sample, prop) === 'undefined') {
            throw new Error(`Property '${prop}' is not present`);
          }
        });
      }

      if (test.onlyProps) {
        expect(Object.keys(sample).sort()).to.eql(test.onlyProps.sort());
      }

      if (test.count) {
        expect((Array.isArray(sample) ? sample : Object.keys(sample)).length).to.eql(test.count);
      }

      if (test.lessThan) {
        expect(sample.length).to.be.below(test.lessThan);
      }

      if (test.atLeast) {
        expect(sample.length).to.be.above(test.atLeast - 1);
      }

      if (test.hasNot) {
        expect(JSON.stringify(sample)).not.to.contain(test.hasNot);
      }

      if ('equal' in test) {
        expect(sample).to.eql(test.equal);
      }

      if (test.throws) {
        delete test.throws;

        const message = typeof test.throws === 'string' ? `: "${test.throws}"` : '';

        throw new Error(`Expected test to throw${message}`);
      }
    }).catch(error => {
      const throwsValue = test.throws || test.throwsSometimes;

      if (typeof throwsValue === 'string') {
        expect(error).to.match(new RegExp(throwsValue, 'im'));
        test.throwCount++;
        return;
      }

      if (throwsValue === true) {
        test.throwCount++;
        return;
      }

      throw error;
    });
}
