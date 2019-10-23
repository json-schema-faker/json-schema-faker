(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function template(header, text, css){
  return '<div class="alert alert-' + css + ' center-block fade in">' +
    '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' +
    '<strong>' + header + '</strong>: ' + text +
    '</div>';
}

function error(text){
  return $('#message-box').append(template("Error", text, 'danger'));
}

function success(text){
  return $('#message-box').append(template("Success", text, 'success'));
}

function successSchema(){
  return success("Schema saved. Use <a href='" + location.href + "'>this link</a> for future reference");
}

module.exports = {
  success: success,
  successSchema: successSchema,
  error: error
};

},{}],2:[function(require,module,exports){
var baseURL = "https://api.github.com";

/**
 * Accepts gist hash (ID of the gist) and return a promise that resolves to gist `schema.json` file content.
 * @see https://developer.github.com/v3/gists/#get-a-single-gist
 */
function fetch(hash){
  return $.ajax({
    method: "GET",
    url: baseURL + "/gists/" + hash
  }).then(function(response) {
    try {
      return JSON.parse(response.files['schema.json'].content);
    } catch (e) {
      return $.Deferred().reject(e);
    }
  });
}

/**
 * Accepts JSON content (already formatted text, NOT an object) and saves it as anonymous gist. Returns a promise that
 * resolves with newly created gist ID.
 * @see http://jsfiddle.net/vXpCV/
 * @see https://developer.github.com/v3/gists/#create-a-gist
 */
function save(content){
  return $.ajax({
    method: "POST",
    url: baseURL + "/gists",
    dataType: 'json',
    data: JSON.stringify({
      "description": "JSON Schema created by http://json-schema-faker.js.org",
      "files": {
        "schema.json": {
          "content": content
        }
      }
    })
  }).then(function(response) {
    return 'gist/' + response.id;
  });
}

var GithubStorage = {
  fetch: fetch,
  save: save
};

module.exports = GithubStorage;

},{}],3:[function(require,module,exports){
function fetch(hash){
  var dfd = $.Deferred();
  try {
    var content = JSON.parse(decodeURIComponent(hash));
    dfd.resolve(content);
  } catch (e) {
    dfd.reject(e);
  }
  return dfd.promise();
}

function save() {

}

//function syncOut() {
//  location.hash = encodeURIComponent(JSON.stringify(JSON.parse(ui.input.getValue())));
//}

module.exports = {
  fetch: fetch,
  save: save
};

},{}],4:[function(require,module,exports){
var storageGithub = require('./storage-github');
var storageURI = require('./storage-uri');

function fetch(uri){ // assuming uri is a non-empty string
  var tmp = uri.replace("#", "").split('/');
  if (tmp.length === 1) { // old style URI-based schema - supported for backward compatibility
    // example: http://json-schema-faker.js.org/#%7B%22type%22%3A%22string%22%2C%22chance%22%3A%7B%22first%22%3A%7B%22nationality%22%3A%22en%22%7D%7D%7D
    return storageURI.fetch(tmp[0]);
  } else {
    var type = tmp[0], hash = tmp[1];
    switch (type) {
      // example: http://json-schema-faker.js.org/#gist/c347f2f6083fe81a1fe43d17b83125d7
      case 'gist':
        return storageGithub.fetch(hash);
      // example: http://json-schema-faker.js.org/#uri/%7B%22type%22%3A%22string%22%2C%22chance%22%3A%7B%22first%22%3A%7B%22nationality%22%3A%22en%22%7D%7D%7D
      case 'uri':
        return storageURI.fetch(hash);
      default:
        throw Error("Unknown storage type");
    }
  }
}

function save(content, type){
  if (!content) {
    throw Error("Empty schema can't be saved");
  }
  type = type || 'gist';
  switch(type) {
    case 'gist':
      return storageGithub.save(content);
    case 'uri':
      return storageURI.save(content);
    default:
      throw Error("Unknown storage type");
  }
}

module.exports = {
  fetch: fetch,
  save: save
};

},{"./storage-github":2,"./storage-uri":3}],5:[function(require,module,exports){
require('../schema/array/enum.json');require('../schema/array/fixed.json');require('../schema/array/n-times.json');require('../schema/basic/boolean.json');require('../schema/basic/integer.json');require('../schema/basic/reference.json');require('../schema/chance/guid.json');require('../schema/chance/name.json');require('../schema/chance/properties.json');require('../schema/faker/fake.json');require('../schema/faker/properties.json');

var storage = require('./storage');
var message = require('./message');

function requireSchema(name) {
    return require('../schema/' + name + '.json');
}

var indent = 2;
function format(value) {
    return JSON.stringify(value, null, indent);
}

// UI to schema
var definitionMap = {
    '#example_faker_properties': 'faker/properties',
    '#example_faker_fake': 'faker/fake',
    '#example_chance_guid': 'chance/guid',
    '#example_chance_name': 'chance/name',
    '#example_chance_properties': 'chance/properties',
    '#example_array_enum': 'array/enum',
    '#example_array_fixed': 'array/fixed',
    '#example_array_nTimes': 'array/n-times',
    '#example_basic_reference': 'basic/reference',
    '#example_basic_integer': 'basic/integer',
    '#example_basic_boolean': 'basic/boolean'
};

$(document).ready(function () {
    // http://jsfiddle.net/revathskumar/rY37e/
    // https://ace.c9.io/build/kitchen-sink.html
    var input = ace.edit("input");
    input.setTheme("ace/theme/github");
    input.getSession().setMode("ace/mode/json");
    input.getSession().setTabSize(indent);
    input.setShowPrintMargin(false);
    input.$blockScrolling = Infinity;

    var output = ace.edit("output");
    output.setTheme("ace/theme/github");
    output.getSession().setMode("ace/mode/json");
    output.getSession().setTabSize(indent);
    output.setShowPrintMargin(false);
    output.$blockScrolling = Infinity;
    output.setReadOnly(true);

    var ui = {
        input: input,
        output: output,
        run: $('#run-btn'),
        save: $('#save-btn'),
    };

    function clearOutput() {
        ui.output.setValue('');
    }

    function fillInput(value) {
        ui.input.setValue(format(value), -1);
    }

    function fillOutput(value) {
        ui.output.setValue(format(value), -1);
    }

    function generateOutput() {
        var schema = JSON.parse(ui.input.getValue());
        var sample = jsf(schema);
        fillOutput(sample);
    }

    ui.run.on('click', function () {
        generateOutput();
    });

    ui.save.on('click', function () {
        try {
            generateOutput();
            var button = this;
            $(button).addClass('active');
            storage.save(ui.input.getValue()).then(function(response){
                location.hash = response;
                message.successSchema();
            }, function(reason){
                message.error("Failed to save schema");
            }).always(function(){
                $(button).removeClass('active');
            });
        } catch (e) {
            message.error("Schema is invalid, not gonna save it.");
        }
    });

    function register(uiElementSelector, schemaPath){
        $(uiElementSelector).on('click', function () {
            clearOutput();
            fillInput(requireSchema(schemaPath));
            generateOutput();
        });
    }

    for (var key in definitionMap) {
        if (definitionMap.hasOwnProperty(key)) {
            register(key, definitionMap[key]);
        }
    }

    function displayDefault(){
        fillInput(requireSchema('basic/boolean'));
        generateOutput();
    }

    if (location.hash) {
        storage.fetch(location.hash).then(function(schema){
            fillInput(schema);
            fillOutput(jsf(schema));
        }, function(reason){
            message.error("Couldn't load external schema");
            displayDefault();
        });
    } else {
        displayDefault();
    }
});


},{"../schema/array/enum.json":6,"../schema/array/fixed.json":7,"../schema/array/n-times.json":8,"../schema/basic/boolean.json":9,"../schema/basic/integer.json":10,"../schema/basic/reference.json":11,"../schema/chance/guid.json":12,"../schema/chance/name.json":13,"../schema/chance/properties.json":14,"../schema/faker/fake.json":15,"../schema/faker/properties.json":16,"./message":1,"./storage":4}],6:[function(require,module,exports){
module.exports={
  "type": "array",
  "minItems": 15,
  "items": {
    "enum": ["red", "green", "blue", "yellow"]
  }
}
},{}],7:[function(require,module,exports){
module.exports={
    "type": "array",
    "items": [
        {
            "type": "integer"
        },
        {
            "type": "boolean"
        },
        {
            "type": "string"
        }
    ]
}
},{}],8:[function(require,module,exports){
module.exports={
  "type": "array",
  "minItems": 100,
  "maxItems": 200,
  "items": {
    "type": "integer"
  }
}
},{}],9:[function(require,module,exports){
module.exports={
    "type": "boolean"
}
},{}],10:[function(require,module,exports){
module.exports={
    "type": "integer",
    "minimum": 600,
    "maximum": 700,
    "multipleOf": 7,
    "exclusiveMinimum": true
}
},{}],11:[function(require,module,exports){
module.exports={
    "type": "object",
    "properties": {
        "user": {
            "type": "object",
            "properties": {
                "id": {
                    "$ref": "#/definitions/positiveInt"
                },
                "name": {
                    "type": "string",
                    "faker": "name.findName"
                },
                "birthday": {
                    "type": "string",
                    "chance": {
                        "birthday" : {
                            "string": true
                        }
                    }
                },
                "email": {
                    "type": "string",
                    "format": "email",
                    "faker": "internet.email"
                }
            },
            "required": [
                "id",
                "name",
                "birthday",
                "email"
            ]
        }
    },
    "required": [
        "user"
    ],
    "definitions": {
        "positiveInt": {
            "type": "integer",
            "minimum": 0,
            "minimumExclusive": true
        }
    }
}
},{}],12:[function(require,module,exports){
module.exports={
  "type": "string",
  "chance": "guid"
}
},{}],13:[function(require,module,exports){
module.exports={
  "type": "string",
  "chance": {
    "first": {
      "nationality": "it"
    }
  }
}
},{}],14:[function(require,module,exports){
module.exports={
    "type": "object",
    "properties": {
        "userId": {
            "type": "string",
            "chance": "guid"
        },
        "emailAddr": {
            "type": "string",
            "chance": {
                "email": {
                    "domain": "fake.com"
                }
            },
            "pattern": ".+@fake.com"
        }
    },
    "required": [
        "userId",
        "emailAddr"
    ]
}
},{}],15:[function(require,module,exports){
module.exports={
  "type": "string",
  "faker": {
    "fake": "{{name.lastName}}, {{name.firstName}} {{name.suffix}}"
  }
}
},{}],16:[function(require,module,exports){
module.exports={
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "faker": "name.findName"
    },
    "email": {
      "type": "string",
      "faker": "internet.email"
    }
  },
  "required": [
    "name",
    "email"
  ]
}
},{}]},{},[5]);
