# json-schema-faker online demo

See [online demo](http://json-schema-faker.js.org/). The `gh-pages` (current) branch hosts this app.

## Development

Use [github pages](https://pages.github.com/) of your private github account (e.g. [this one](http://tkoomzaaskz.github.io/json-schema-faker/)) to see how the app is going to look like on production.

This project is automated using [grunt](gruntjs.com). Run:

    grunt

to build the application. While working on the app, modify following **source** files:

* [src/index.tpl](src/index.tpl)
* [src/main.css](src/main.css)
* [src/main.js](src/main.js)

They will be used to build dist files (each `grunt` run overrides them):

* [vendor.css](vendor.css)
* [bundle.css](bundle.css)
* [vendor.js](vendor.js)
* [bundle.js](bundle.js)

Adding new example JSON schema includes adding them to:

* [schema](schema) directory - to store the definition
* [src/main.js](src/main.js) - to handle it in the app & browserify
* [src/index.tpl](src/index.tpl) - display it

## Contribution

Feel free to add issues and PRs. Make sure you prefix its title with `[online-demo]`.
