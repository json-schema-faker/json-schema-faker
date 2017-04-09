module.exports = {
    extend: function () {
        var faker = require('faker/locale/de');

        faker.mixin = function (namespace, fnObject) {
            faker[namespace] = fnObject;
        };

        faker.mixin('custom', {
            statement: function (length) {
                return faker.name.firstName() + " has " + faker.finance.amount() + " on " + faker.finance.account(length) + ".";
            }
        });

        return faker;
    },
    register: function(jsf) {
        return jsf.extend('faker', this.extend);
    }
};
