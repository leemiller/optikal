module.exports = Backbone.Model.extend({
    defaults: {
        note: undefined,
        color: undefined
    },

    sync: function() {
        // no need to save, no need for sync!
    }
});