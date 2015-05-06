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
        scaleSelect: 'select.scale',
        instrumentSelect: 'select.instrument'
    },

    events: {
        'change @ui.tonicSelect': 'changeTonic',
        'change @ui.scaleSelect': 'changeScale',
        'change @ui.instrumentSelect': 'changeInstrument'
    },

    initialize: function() {
        Bus.Event.on('change:tonic', this._updateTonic, this);
        Bus.Event.on('change:scale', this._updateScale, this);
    },

    changeInstrument: function(event) {
        var newInstrument = $(event.currentTarget).val();
        Bus.Event.trigger('change:instrument', newInstrument);
    },

    changeScale: function(event) {
        var newScale = $(event.currentTarget).val();
        Bus.Event.trigger('change:scale', newScale);
    },

    changeTonic: function(event) {
        var newTonic = $(event.currentTarget).val();
        Bus.Event.trigger('change:tonic', newTonic);
    },

    onRender: function() {
        Bus.Event.trigger('change:instrument', defaults.instrument);
        Bus.Event.trigger('change:scale', defaults.scale);
        Bus.Event.trigger('change:tonic', defaults.tonic);
    },

    serializeData: function() {
        return {
            notes: config.notes,
            scales: _.keys(config.scales),
            instruments: _.keys(config.instruments)
        };
    },

    _updateTonic: function(newTonic) {
        this.ui.tonicSelect.val(newTonic);
    },

    _updateScale: function(newScale) {
        this.ui.scaleSelect.val(newScale);
    },

    onDestroy: function() {
        Bus.Event.off('change:tonic', this._updateTonic, this);
        Bus.Event.off('change:scale', this._updateScale, this);
    }
});