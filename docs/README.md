## Table of Contents

* [Architecture](#architecture)
* [Sources](#sources)
* [Building](#building)
* [Testing](#testing)

# Architecture

![JSON Schema Faker module graph](structure.png)

JSON Schema Faker is a JavaScript tool that can be executed both in the browser and the server.

Currently JSF consists of:

* `types` - each module represents one basic JSON Schema structure
  * there is also the `external` module which executes `chance` and `faker` generators
* `generators` - very small modules which generate some low-level stuff
* `core` - the engine, various files
* `api` - here are additional methods you can call on jsf object:
  * `format()` - to register/get/call your own formats
  * `extend()` - extending jsf dependencies with user custom logic
* `class` - encapsulated containers; you might consider them as part of core
  * `format` - for custom regular expressions
  * `container` - for dependencies (`faker`, `chance`, `randexp`); this is needed for two reasons:
    * end user might want to extend `faker` or `chance` with his/her custom generator functions and we need to remember that
    * we don't want to include both faker and chance by default - we wanna make them optional

# Sources

Currently we've got:

* JavaScript sources (`src` directory).

The codebase is quite complex and so the whole process had to be split into parts. THe migration/refactoring is still a work-in-progress.

# Building

Generate the libraries:

    npm run build

# Testing

Detailed description of test [can be found here](../tests).
