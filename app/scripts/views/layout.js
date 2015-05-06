var template = require('./templates/layout');
module.exports = Backbone.Marionette.LayoutView.extend({
    tagName: 'div',
    className: 'layout',
    template: template,
    regions: {
        colorWheel: '#color-wheel-container',
        instrument: '#instrument-container',
        selector: '#selector'
    }
});