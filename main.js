var $ = require('./bower_components/jquery/dist/jquery.js');

var jsf = require('json-schema-faker');

$(document).ready(function () {
    var input = $('#input_schema'),
        output = $('#output_sample'),
        generate = $('#generate_sample');

    generate.on('click', function () {
        var schema = JSON.parse(input.val());
        output.val(JSON.stringify(jsf(schema), null, 2));
    });
});
