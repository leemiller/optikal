var ColorWheelView = require('scripts/views/color-wheel');
var Pitches = require('scripts/collections/pitches');
var ConstellationView = require('../views/constellation');
var config = require('config');
var Bus = require('bus');

var allChromaticScales = {};
_.each(config.allPitches, function(tonic) {
    allChromaticScales[tonic] = new Pitches(tonic);
});

module.exports = Backbone.Marionette.Controller.extend({
    baseLayer: null,
    mouseoverLayer: null,
    constellationLayer: null,
    stage: null,
    wheel: null,
    constellation: null,

    initialize: function(options) {
        this.options = options || {};

        this.stage = new Konva.Stage({
            container: this.options.container,
            width: 500,
            height: 500
        });

        this.baseLayer = new Konva.Layer();
        this.mouseoverLayer = new Konva.Layer();
        this.stage.add(this.baseLayer, this.mouseoverLayer);

        Bus.Event.on('change:tonic', this._changeTonic, this);
        Bus.Event.on('change:mode', this._changeMode, this);

        this._showColorWheel(config.defaultTonic);
        this._showConstellation();
    },

    _changeMode: function(newMode) {
        if (_.isNull(this.constellation)) return;
        this.constellation.off();
        this.constellation.destroy();
        this.constellationLayer.destroyChildren();
        this.stage.draw();
        var modePositions = config.allModes[newMode];
        this.constellation = new ConstellationView({
            stage: this.stage,
            baseLayer: this.constellationLayer,
            collection: modePositions
        });
        this.stage.draw();
    },

    _changeTonic: function(newTonic) {
        this._clearPreviousWheel();
        this._showColorWheel(newTonic);
    },

    _clearPreviousWheel: function() {
        if (_.isNull(this.wheel)) return;
        this.wheel.off();
        this.wheel.destroy();
        this.baseLayer.destroyChildren();
        this.mouseoverLayer.destroyChildren();
        this.stage.draw();
    },

    _showColorWheel: function(tonic) {
        this.wheel = new ColorWheelView({
            stage: this.stage,
            baseLayer: this.baseLayer,
            mouseoverLayer: this.mouseoverLayer, 
            collection: allChromaticScales[tonic]
        });
    },

    _showConstellation: function() {
        this.constellationLayer = new Konva.Layer();
        this.stage.add(this.constellationLayer);
        var defaultMode = config.allModes[config.defaultMode];
        this.constellation = new ConstellationView({
            stage: this.stage,
            baseLayer: this.constellationLayer,
            collection: defaultMode
        });
    }
})