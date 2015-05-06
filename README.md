# json-schema-faker online demo

## Development

This project is automated using [grunt](gruntjs.com). Run:

    grunt

to build the application. While working on the app, modify following **source** files:

* [index.html](index.html)
* [main.css](main.css)
* [main.js](main.js)

They will be used to build dist files (each `grunt` run overrides them):

* [vendor.css](vendor.css)
* [bundle.css](bundle.css)
* [bundle.js](bundle.js)

Adding new example JSON schema includes adding them to:

* [schema](schema) directory - to store the definition
* [main.js](main.js) - to handle it in the app & browserify
* [index.html](index.html) - display it

## Contribution

Feel free to add issues and PRs. Make sure you prefix its title with `[online-demo]`.
