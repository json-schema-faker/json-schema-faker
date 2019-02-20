import {
  jsf, pick, tryTest, getTests,
} from './helpers';

const { only, all } = getTests(__dirname);

/* global describe, it */

(only.length ? only : all).forEach(suite => {
  describe(`${suite.description} (${suite.file.replace(`${__dirname}/`, '')})`, () => {
    suite.tests.forEach(test => {
      it(test.description, () => {
        jsf.option(jsf.option.getDefaults());

        if (test.set) {
          jsf.option(test.set);
        }

        if (test.seed) {
          jsf.option({
            random: () => test.seed,
          });
        }

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

        return Promise.all(tasks);
      }).timeout(process.CI ? 30000 : 10000);
    });
  });
});
