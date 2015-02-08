var LayoutView = require('../views/layout');
var ColorWheelView = require('scripts/views/color-wheel');
var TonicSelectorView = require('../views/tonic-selector');
var Semitones = require('scripts/collections/semitones');
var ConstellationView = require('../views/constellation');
var config = require('config');

var allChromaticScales = {};
_.each(config.allPitches.split(' '), function(tonic) {
    allChromaticScales[tonic] = new Semitones(tonic);
});

module.exports = Backbone.Marionette.Controller.extend({
    baseLayer: null,
    mouseoverLayer: null,
    stage: null,
    wheel: null,

    initialize: function(options) {
        this.options = options || {};
    },

    show: function() {
        var layoutView = new LayoutView();
        this.options.region.show(layoutView);
        this._initializeStageAndLayers();

        var tonicSelectorView = new TonicSelectorView();
        tonicSelectorView.on('before:destroy', function() {
            tonicSelectorView.off();
        }, this);
        tonicSelectorView.on('change:tonic', this._changeTonic, this);
        layoutView.getRegion('tonicSelector').show(tonicSelectorView);
        this._showColorWheel(config.defaultTonic);
        this._showConstellation();
    },

    _changeTonic: function(newTonic) {
        this._clearPreviousWheel();
        this._initializeStageAndLayers();
        this._showColorWheel(newTonic);
        this._showConstellation();
    },

    _initializeStageAndLayers: function() {
        this.stage = new Konva.Stage({
            container: $('#color-wheel-container')[0],
            width: 500,
            height: 500
        });

        this.baseLayer = new Konva.Layer();
        this.mouseoverLayer = new Konva.Layer();
        this.stage.add(this.baseLayer, this.mouseoverLayer);
    },

    _clearPreviousWheel: function() {
        if (_.isNull(this.wheel)) return;
        this.wheel.off();
        this.wheel.destroy();
        this.baseLayer.destroy();
        this.mouseoverLayer.destroy();
        this.stage.clear();
        this.stage.destroy();
        this.stage = null;
    },

    _showColorWheel: function(tonic) {
        console.log(tonic);
        this.wheel = new ColorWheelView({
            stage: this.stage,
            baseLayer: this.baseLayer,
            mouseoverLayer: this.mouseoverLayer, 
            semitones: allChromaticScales[tonic]
        });
        this.wheel.on('change:tonic', this._changeTonic, this);
    },

    _showConstellation: function() {
        var constellationLayer = new Konva.Layer();
        this.stage.add(constellationLayer);
        var constellationView = new ConstellationView({
            stage: this.stage,
            layer: constellationLayer,
            pitches: [0, 2, 4, 5, 7, 9, 11]
        });
    }
})