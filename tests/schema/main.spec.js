import path from 'path';
import {
  jsf, pick, tryTest, getTests,
} from './helpers';

const { only, all } = getTests(__dirname);

const seeds = [];

function seed() {
  const value = Math.random();
  seeds.push(value);
  return value;
}

(only.length ? only : all).forEach(suite => {
  const normalizedFilename = path.normalize(suite.file);
  const relativeFilename = normalizedFilename.replace(`${process.cwd()}${path.sep}`, '');

  describe(`${suite.description} (${relativeFilename})`, () => {
    suite.tests.forEach(test => {
      if (!process.env.CI && test.online) return;
      if (process.argv.includes('--skip')) {
        if (!test.skip) return;
        delete test.skip;
      }

      if (test.skip) {
        it.skip(test.description);
        return;
      }

      it(test.description, () => {
        jsf.option(jsf.option.getDefaults());

        if (test.set) {
          jsf.option(test.set);
        }

        jsf.option({
          random: () => ((test.seed && (Array.isArray(test.seed) ? test.seed.shift() : test.seed)) || seed()),
        });

        if (test.require) {
          test.require = Array.isArray(test.require) ? test.require : [test.require];

          test.require.map(toRequire => {
            return require(`./${toRequire}`).register(jsf);
          });
        }

        const schema = typeof test.schema === 'string'
          ? pick(suite, test.schema)
          : test.schema;

        const refs = (test.refs || []).map(ref => {
          return typeof ref === 'string'
            ? pick(suite, ref)
            : ref;
        });

        // support for "exhaustive" testing, increase or set in .json spec
        // for detecting more bugs quickly by executing the same test N-times
        const max = process.CI ? 250 : (test.repeat || 1);

        let nth = max;

        const tasks = [];

        if (test.throwsSometimes) {
          test.throwCount = 0;
        }

        while (nth) {
          if (!test.skip) {
            tasks.push(tryTest(max - nth + 1, max, test, refs, schema));
          }

          nth -= 1;
        }

        return Promise.all(tasks).catch(e => {
          if (test.online) {
            console.log('---> failed due connectivity issues?');
            console.log(e.message);
            return;
          }

          // FIXME: find a way to debug this
          console.log('---> Used seeds:', seeds.slice(-10).join(', ') || test.seed);
          throw e;
        }).then(() => {
          if (test.throwsSometimes && !(test.throwCount > 0)) {
            throw new Error('Expected some tests to throw');
          }
        });
      }).timeout(suite.timeout || test.timeout || (process.CI ? 30000 : 10000));
    });
  });
});
