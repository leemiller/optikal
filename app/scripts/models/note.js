module.exports = Backbone.Model.extend({
    defaults: {
        name: undefined,
        color: undefined
    },

    sync: function() {
        // no need to save, no need for sync!
    }
});