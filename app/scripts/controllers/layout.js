var LayoutView = require('../views/layout');
var ColorWheelView = require('scripts/views/color-wheel');
var TonicSelectorView = require('../views/tonic-selector');
var Semitones = require('scripts/collections/semitones');
var config = require('config');

var allChromaticScales = {};
_.each(config.allPitches.split(' '), function(tonic) {
    allChromaticScales[tonic] = new Semitones(tonic);
});

var stage;
var wheel;

module.exports = Backbone.Marionette.Controller.extend({
    initialize: function(options) {
        console.log(options);
        this.options = options || {};
    },

    show: function() {
        var layoutView = new LayoutView();
        this.options.region.show(layoutView);
        var tonicSelectorView = new TonicSelectorView();
        tonicSelectorView.on('before:destroy', function() {
            tonicSelectorView.off();
        }, this);
        tonicSelectorView.on('change:tonic', function(newTonic) {
            this._clearPreviousWheel();
            this._showColorWheel(newTonic);
        }, this);
        layoutView.getRegion('tonicSelector').show(tonicSelectorView);
        this._showColorWheel(config.defaultTonic);
    },

    _clearPreviousWheel: function() {
        if (_.isUndefined(stage)) return;
        wheel.destroy();
        stage.clear();
        stage.destroy();
        stage = undefined;

    },

    _showColorWheel: function(tonic) {
        _.defer(function() {
            if (_.isUndefined(stage)) {
                stage = new Konva.Stage({
                    container: $('#color-wheel-container')[0],
                    width: 500,
                    height: 500
                });
            }
            
            var baseLayer = new Konva.Layer();
            var mouseoverLayer = new Konva.Layer();
            stage.add(baseLayer, mouseoverLayer);

            wheel = new ColorWheelView({
                stage: stage,
                baseLayer:baseLayer,
                mouseoverLayer: mouseoverLayer, 
                semitones: allChromaticScales[tonic]
            });
        });
    }
})