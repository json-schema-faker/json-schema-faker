module.exports = {
    register: function (jsf) {
        return jsf.format({
            semver: function () {
                return jsf.random.randexp('\\d\\.\\d\\.[1-9]\\d?');
            }
        });
    }
};
