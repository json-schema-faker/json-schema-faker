var jsf = require('json-schema-faker');

var schemas = {
    faker: {
        faker: require('../schema/faker/faker.json')
    },
    chance: {
        chance: require('../schema/chance/chance.json')
    },
    array: {
        enum: require('../schema/array/enum.json'),
        fixed: require('../schema/array/fixed.json'),
        nTimes: require('../schema/array/n-times.json')
    },
    other: {
        reference: require('../schema/reference.json'),
        integer: require('../schema/integer.json'),
        boolean: require('../schema/boolean.json')
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
            faker: {
                faker: $('#example_faker')
            },
            chance: {
                chance: $('#example_chance')
            },
            array: {
                enum: $('#example_array_enum'),
                fixed: $('#example_array_fixed'),
                nTimes: $('#example_array_nTimes')
            },
            reference: $('#example_reference'),
            integer: $('#example_integer'),
            boolean: $('#example_boolean')
        }
    };

    function clearOutput(){
        ui.output.val('');
    }

    function fillInput(value){
        ui.input.val(value);
    }

    function generateOutput(){
        var schema = JSON.parse(ui.input.val());
        var sample = jsf(schema);
        ui.output.val(format(sample));
    }

    fillInput(format(schemas.other.boolean));
    generateOutput();

    ui.run.on('click', generateOutput);

    ui.examples.faker.faker.on('click', function () {
        clearOutput();
        fillInput(format(schemas.faker.faker));
        generateOutput();
    });

    ui.examples.chance.chance.on('click', function () {
        clearOutput();
        fillInput(format(schemas.chance.chance));
        generateOutput();
    });

    ui.examples.array.enum.on('click', function () {
        clearOutput();
        fillInput(format(schemas.array.enum));
        generateOutput();
    });

    ui.examples.array.fixed.on('click', function () {
        clearOutput();
        fillInput(format(schemas.array.fixed));
        generateOutput();
    });

    ui.examples.array.nTimes.on('click', function () {
        clearOutput();
        fillInput(format(schemas.array.nTimes));
        generateOutput();
    });

    ui.examples.reference.on('click', function () {
        clearOutput();
        fillInput(format(schemas.other.reference));
        generateOutput();
    });

    ui.examples.integer.on('click', function () {
        clearOutput();
        fillInput(format(schemas.other.integer));
        generateOutput();
    });

    ui.examples.boolean.on('click', function () {
        clearOutput();
        fillInput(format(schemas.other.boolean));
        generateOutput();
    });
});
