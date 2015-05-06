var ColorWheelView = require('scripts/views/color-wheel');
var ConstellationView = require('../views/constellation');
var config = require('config');
var defaults = require('defaults');
var Bus = require('bus');

module.exports = Backbone.Marionette.Controller.extend({
    baseLayer: null,
    mouseoverLayer: null,
    constellationLayer: null,
    stage: null,
    wheel: null,
    constellation: null,
    _currentScale: defaults.scale,
    _currentTonic: defaults.tonic,

    initialize: function(options) {
        this.options = options || {};

        this.stage = new Konva.Stage({
            container: this.options.container,
            width: 500,
            height: 500
        });

        this.baseLayer = new Konva.Layer();
        this.mouseoverLayer = new Konva.Layer();
        this.constellationLayer = new Konva.Layer();
        this.stage.add(this.baseLayer, this.mouseoverLayer, this.constellationLayer);

        Bus.Event.on('change:tonic', this._changeTonic, this);
        Bus.Event.on('change:scale', this._changeScale, this);

        Bus.Reqres.setHandler('current:tonic', function() {
            return this._currentTonic;
        }, this);
        Bus.Reqres.setHandler('current:scale', function() {
            return this._currentScale;
        }, this);
    },

    _changeScale: function(newScale) {
        this._currentScale = newScale;
        this._clearPreviousConstellation();
        var scalePositions = config.scales[newScale];
        this.constellation = new ConstellationView({
            stage: this.stage,
            baseLayer: this.constellationLayer,
            collection: scalePositions
        });
    },

    _clearPreviousConstellation: function() {
        if (_.isNull(this.constellation)) return;
        this.constellation.off();
        this.constellation.destroy();
        this.constellationLayer.destroyChildren();
        this.stage.draw();
    },

    _changeTonic: function(newTonic) {
        this._currentTonic = newTonic;
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
            collection: config.chromaticScales[tonic]
        });
    }
});