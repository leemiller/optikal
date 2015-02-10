var FrettedStringModel = require('../models/fretted-string');
var defaults = require('defaults');
var config = require('config');

var FrettedStringCollection = Backbone.Collection.extend({
    model: FrettedStringModel,
    url: '/fretted-strings',
    noteCache: null,
    
    initialize: function(models, options) {
        this.options = options || {};
        this.noteCache = [];
        var strings = this.options.configuration;
        var frets = this.options.frets;

        _.each(strings, function(tonic) {
            this.create({
                tonic: tonic,
                frets: frets
            });
        }, this);
    },

    getFrets: function() {
        return this.options.frets;
    },

    sync: function() {

    }
});

module.exports = function(stringConfigs, frets) {
    stringConfigs = stringConfigs || defaults.instruments['fretted-string'].strings;
    frets = frets || defaults.instruments['fretted-string'].frets;
    return new FrettedStringCollection(null, {
        configuration: stringConfigs,
        frets: frets
    });
};