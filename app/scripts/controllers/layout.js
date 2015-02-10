var LayoutView = require('../views/layout');
var SelectorView = require('../views/selector');
var ColorWheelController = require('./color-wheel');
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
        layoutView.getRegion('selector').show(selectorView);
        var wheelContainer = $(layoutView.getRegion('colorWheel').el)[0];
        var colorWheel = new ColorWheelController({
            container: wheelContainer
        });
    }
})