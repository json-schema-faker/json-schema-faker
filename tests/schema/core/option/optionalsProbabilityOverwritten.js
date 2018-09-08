module.exports = {
    register: function(jsf) {
        return jsf.option({
            'useDefaultValue': true,
            'alwaysFakeOptionals': true,
            'optionalsProbability': 0.0
        });
    }
};
