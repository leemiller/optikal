var FrettedStringView = require('../views/instruments/fretted');
var FrettedStrings = require('scripts/collections/fretted-strings');
var config = require('config');
var Bus = require('bus');

module.exports = Backbone.Marionette.Controller.extend({
    baseLayer: null,
    mouseoverLayer: null,
    stage: null,
    frettedString: null,

    initialize: function(options) {
        this.options = options || {};

        Bus.Event.on('change:instrument', this._changeInstrument, this);
        Bus.Event.on('change:scale', this._changeScale, this);
        Bus.Event.on('change:tonic', function() {
            this.frettedString._changeScale(Bus.Reqres.request('current:scale'));
        }, this);
    },

    _changeScale: function(newScale) {
        this.frettedString._changeScale(newScale);
    },

    _showInstrument: function(newInstrument) {
        var stringSettings = config.instruments[newInstrument];
        var strings = new FrettedStrings(stringSettings);
        var settings = {
            height: strings.settings.displayHeight,
            width: strings.settings.displayWidth
        };

        this._initializeStageAndLayers(settings);

        this.frettedString = new FrettedStringView({
            collection: strings,
            stage: this.stage,
            baseLayer: this.baseLayer,
            mouseoverLayer: this.mouseoverLayer,
        });
    },

    _initializeStageAndLayers: function(settings) {
        this.stage = new Konva.Stage({
            container: this.options.container,
            width: settings.width,
            height: settings.height
        });
        this.baseLayer = new Konva.Layer();
        this.mouseoverLayer = new Konva.Layer();
        this.stage.add(this.baseLayer, this.mouseoverLayer);
    },

    _changeInstrument: function(newInstrument) {
        this._clearPreviousInstrument();
        this._showInstrument(newInstrument);

        this.frettedString._changeScale(Bus.Reqres.request('current:scale'));
    },

    _clearPreviousInstrument: function() {
        if (_.isNull(this.frettedString)) return;
        this.frettedString.off();
        this.frettedString.destroy();
        this.baseLayer.destroyChildren();
        this.mouseoverLayer.destroyChildren();
        this.baseLayer.destroy();
        this.mouseoverLayer.destroy();
        this.stage.destroy();
        this.stage = null;
    }
})