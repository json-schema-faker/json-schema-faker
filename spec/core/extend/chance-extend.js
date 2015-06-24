module.exports = {
    extend: function (chance) {
        chance.mixin({
            'user': function() {
                return {
                    first: chance.first(),
                    last: chance.last(),
                    email: chance.email()
                };
            }
        });

        return chance;
    },
    register: function(jsf) {
        return jsf.extend('chance', this.extend);
    }
};
