module.exports = {
    register: function (jsf) {
        return jsf.format({
            semver: function (gen, schema) {
                return gen.randexp('\\d\\.\\d\\.[1-9]\\d?');
            }
        });
    }
};
