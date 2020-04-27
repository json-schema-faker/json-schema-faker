We welcome contributions to the project! :beer:

## Bug submission

If you are submitting a bug report, please include the following:

1. the JSON Schema content that fails: go to [the demo page](http://json-schema-faker.js.org/), paste the schema into the textarea on the left, click `Generate example`, and then copy the resulting URL from the browser address bar and paste it here. This will make it easier for us to reproduce and fix the bug. Thank you in advance! :beer: Otherwise please paste the schema inline in your bug report.
2. the result you got
3. the result you expected

## Issues & Pull-requests

* When submitting *bug reports*, *paste your schema example* whenever possible. This will save us from having to ask you for it later.
* When submitting *Pull Requests (PRs)*, you should request to merge your changes into our `develop` branch.
* Our approach to testing is described in [docs/TESTING.md](/docs/TESTING.md).
* PRs without specs will not be merged anytime soon!

## Releasing new versions

* Create a new entry in the [CHANGELOG](/CHANGELOG) file,
* Re-build and re-release the online demo, see [`json-schema-faker` gh-pages branch](https://github.com/json-schema-faker/json-schema-faker/tree/gh-pages).

## Development tasks

* `npm run dev` &mdash; Run the tests and watch (preferred during development)
* `npm run lint` &mdash; Run eslint on all sources
* `npm run test:unit` &mdash; Run unit tests
* `npm run test:schema` &mdash; Run schema tests
* `npm run cover` &mdash; Run istanbul + jasmine-node
* `npm run cover:up` &mdash; Upload to coveralls (CI only)
* `npm run dist` &mdash; Prepare all assets with locales for CDN support
* `npm test` &mdash; Run all the tests

### Upcoming

* `npm run tsc` &mdash; Compile TypeScript to JavaScript (via commonJS)
