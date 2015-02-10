var template = require('./templates/item-selector');
var config = require('config');
var defaults = require('defaults');
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
        this.ui.tonicSelect.val(defaults.tonic);
    },

    serializeData: function() {
        return {
            notes: config.notes,
            modes: _.keys(config.modes)
        };
    },

    _updateTonic: function(newTonic) {
        this.ui.tonicSelect.val(newTonic);
    },

    _updateMode: function(newMode) {
        this.ui.modeSelect.val(newMode);
    },

    onDestroy: function() {
        Bus.Event.off('change:tonic', this._updateTonic, this);
        Bus.Event.off('change:mode', this._updateMode, this);
    }
});