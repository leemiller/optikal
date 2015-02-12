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
        modeSelect: 'select.mode',
        instrumentSelect: 'select.instrument'
    },

    events: {
        'change @ui.tonicSelect': 'changeTonic',
        'change @ui.modeSelect': 'changeMode',
        'change @ui.instrumentSelect': 'changeInstrument'
    },

    initialize: function() {
        Bus.Event.on('change:tonic', this._updateTonic, this);
    },

    changeInstrument: function(event) {
        var newInstrument = $(event.currentTarget).val();
        Bus.Event.trigger('change:instrument', newInstrument);
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
        Bus.Event.trigger('change:instrument', defaults.instrument);
        Bus.Event.trigger('change:mode', defaults.mode);
        Bus.Event.trigger('change:tonic', defaults.tonic);
    },

    serializeData: function() {
        return {
            notes: config.notes,
            modes: _.keys(config.modes),
            instruments: _.keys(config.instruments)
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