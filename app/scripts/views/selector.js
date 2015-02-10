var template = require('./templates/item-selector');
var config = require('config');
var Bus = require('bus');
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

    initialize: function() {
        Bus.Event.on('change:tonic', this._updateTonic, this);
    },

    changeMode: function(event) {
        var newMode = $(event.currentTarget).val();
        Bus.Event.trigger('change:mode', newMode);
    },

    changeTonic: function(event) {
        var newTonic = $(event.currentTarget).val();
        Bus.Event.trigger('change:tonic', newTonic);
    },

    onRender: function() {
        this.ui.tonicSelect.val(config.defaultTonic);
    },

    serializeData: function() {
        return {
            notes: config.allPitches,
            modes: _.keys(config.allModes)
        };
    },

    _updateTonic: function(newTonic) {
        this.ui.tonicSelect.val(newTonic);
    },

    _updateMode: function(newMode) {
        this.ui.modeSelect.val(newMode);
    }
});