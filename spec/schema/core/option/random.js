const seedrandom = require('seedrandom');

module.exports = {
    register: function(jsf) {
        return jsf.option({
            random: seedrandom('some seed', {state: true})
        });
    }
};
