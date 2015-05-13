module.exports = {
    register: function (jsf) {
        return jsf.formats({
            semver: function (gen, schema) {
                return gen.randexp('\\d\\.\\d\\.[1-9]\\d?');
            }
        });
    }
};
