var jsf = require('json-schema-faker');

var schemas = {
    faker: require('./schema/faker.json'),
    chance: require('./schema/chance.json'),
    other: {
        integer: require('./schema/integer.json'),
        array: require('./schema/array.json'),
        boolean: require('./schema/boolean.json')
    }
};

var indent = 2,
    format = function (value) {
        return JSON.stringify(value, null, indent);
    };

$(document).ready(function () {
    var ui = {
        input: $('#input'),
        output: $('#output'),
        run: $('#run'),
        examples: {
            faker: $('#example_faker'),
            chance: $('#example_chance'),
            integer: $('#example_integer'),
            array: $('#example_array'),
            boolean: $('#example_boolean')
        }
    };

    function clearInput(){
        ui.output.val('');
    }

    function generateOutput(){
        var schema = JSON.parse(ui.input.val());
        var sample = jsf(schema);
        ui.output.val(format(sample));
    }

    ui.input.val(format(schemas.other.boolean));
    generateOutput();

    ui.run.on('click', generateOutput);

    ui.examples.faker.on('click', function () {
        clearInput();
        ui.input.val(format(schemas.faker));
        generateOutput();
    });

    ui.examples.chance.on('click', function () {
        clearInput();
        ui.input.val(format(schemas.chance));
        generateOutput();
    });

    ui.examples.integer.on('click', function () {
        clearInput();
        ui.input.val(format(schemas.other.integer));
        generateOutput();
    });

    ui.examples.array.on('click', function () {
        clearInput();
        ui.input.val(format(schemas.other.array));
        generateOutput();
    });

    ui.examples.boolean.on('click', function () {
        clearInput();
        ui.input.val(format(schemas.other.boolean));
        generateOutput();
    });
});
