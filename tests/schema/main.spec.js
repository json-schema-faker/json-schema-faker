import {
  jsf, pick, tryTest, getTests,
} from './helpers';

const { only, all } = getTests(__dirname);

/* global describe, it */

const seeds = [];

function seed() {
  const value = Math.random();
  seeds.push(value);
  return value;
}

(only.length ? only : all).forEach(suite => {
  describe(`${suite.description} (${suite.file.replace(`${process.cwd()}/`, '')})`, () => {
    suite.tests.forEach(test => {
      it(test.description, () => {
        jsf.option(jsf.option.getDefaults());

        if (test.set) {
          jsf.option(test.set);
        }

        jsf.option({
          random: () => ((test.seed && (Array.isArray(test.seed) ? test.seed.shift() : test.seed)) || seed()),
        });

        if (test.require) {
          require(`./${test.require}`).register(jsf);
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
        let nth = test.repeat || (process.CI ? 100 : 10);

        const tasks = [];

        while (nth) {
          if (!test.skip) {
            tasks.push(tryTest(test, refs, schema));
          }

          nth -= 1;
        }

        return Promise.all(tasks).catch(e => {
          // FIXME: find a way to debug this
          console.log('---> Used seeds:', seeds.slice(-10).join(', ') || test.seed);
          throw e;
        });
      }).timeout(process.CI ? 30000 : 10000);
    });
  });
});
