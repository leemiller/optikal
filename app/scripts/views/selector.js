var template = require('./templates/item-selector');
var config = require('config');
module.exports = Backbone.Marionette.ItemView.extend({
    tagName: 'div',
    className: 'selector-container',
    template: template,

    ui: {
        tonicSelect: 'select.tonic',
        modeSelect: 'select.mode'
    },

    events: {
        'change @ui.tonicSelect': 'changeTonic',
        'change @ui.modeSelect': 'changeMode'
    },

    changeMode: function(event) {
        this.trigger('change:mode', $(event.currentTarget).val());
    },

    changeTonic: function(event) {
        this.trigger('change:tonic', $(event.currentTarget).val());
    },

    onRender: function() {
        this.ui.tonicSelect.val(config.defaultTonic);
    },

    serializeData: function() {
        return {
            notes: config.allPitches,
            modes: _.keys(config.allModes)
        };
    }
});