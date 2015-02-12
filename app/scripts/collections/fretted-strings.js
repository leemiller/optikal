var FrettedStringModel = require('../models/fretted-string');
var defaults = require('defaults');
var config = require('config');

var FrettedStringCollection = Backbone.Collection.extend({
    model: FrettedStringModel,
    url: '/fretted-strings',
    settings: null,
    fretDistanceMap: null,
    displayWidth: 0,
    displayHeight: 0,
    
    initialize: function(models, options) {
        this.options = options || {};
        this.settings = options.settings;

        this._setSettings();

        _.each(this.settings.strings, function(tonic) {
            this.create({
                tonic: tonic,
                frets: this.settings.frets
            });
        }, this);
    },

    getFrets: function() {
        return this.options.frets;
    },

    getDisplayHeight: function() {
        return this.settings.displayHeight;
    },

    getDisplayWidth: function() {
        return this.settings.displayWidth;
    },

    _setSettings: function() {
        var strings = this.settings.strings;
        var frets = this.settings.frets;
        var scaleLength = this.settings.lengthPerFret * frets;
        var distance = 0;
        var fretDistanceMap = {};
        for (var fret = 1; fret <= frets; fret++) {
            var location = scaleLength - distance;
            var scaleFactor = location / 17.817;
            distance += scaleFactor;
            fretDistanceMap[fret] = {
                distance: distance,
                width: scaleFactor
            };
        }
        var endPadding = (2 * this.settings.padding);
        var totalLength = distance + endPadding;

        this.settings.displayWidth = totalLength;
        this.settings.fretDistanceMap = fretDistanceMap;
        this.settings.displayHeight = (strings.length * this.settings.stringHeight) + endPadding;
    },  

    sync: function() {

    }
});

var defaultInstrument = config.instruments[defaults.instrument];

module.exports = function(settings) {
    settings = settings || defaultInstrument;
    return new FrettedStringCollection(null, {
        settings: settings
    });
};