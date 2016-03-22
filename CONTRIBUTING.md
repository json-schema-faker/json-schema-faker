Contribution to the project is more than welcome!

## Issues & Pull-requests

* When submitting *bugs* (or inappropriate behavior), do *paste your schema example* if only it's possible. This will prevent us from explicitly asking you to do this.
* When submitting *PRs*, ship them under the `develop` branch.
* The testing approach architecture is described in [spec/README.md](spec/README.md).
* PR without specs will not be merged soon.

## Releasing new versions

* Include a new entry in [CHANGELOG.md](CHANGELOG.md) file,
* Be followed by rebuilding and re-releasing new online demo, see [gh-pages branch](https://github.com/json-schema-faker/json-schema-faker/tree/gh-pages).

## Development tasks

* `npm run dev` &mdash; Run the tests and watch (preferred during development)
* `npm run dev:lint` &mdash; Run eslint on all sources
* `npm run dev:spec` &mdash; Run jasmine-node
* `npm run cover` &mdash; Run istanbul + jasmine-node
* `npm run cover:up` &mdash; Upload to coveralls (CI only)
* `npm run build` &mdash; Prepare all assets with locales for CDN support
* `npm test` &mdash; Run all the tests

