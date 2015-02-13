var LayoutView = require('../views/layout');
var SelectorView = require('../views/selector');
var ColorWheelController = require('./color-wheel');
var FrettedStringController = require('./fretted-string');
var config = require('config');
var Bus = require('bus');

module.exports = Backbone.Marionette.Controller.extend({
    initialize: function(options) {
        this.options = options || {};
    },

    show: function() {
        var layoutView = new LayoutView();
        this.options.region.show(layoutView);

        var selectorView = new SelectorView();
        
        var wheelContainer = $(layoutView.getRegion('colorWheel').el)[0];
        var colorWheel = new ColorWheelController({
            container: wheelContainer
        });

        var instrumentContainer = $(layoutView.getRegion('instrument').el)[0];
        var instrument = new FrettedStringController({
            container: instrumentContainer
        });

        layoutView.getRegion('selector').show(selectorView);
    }
})