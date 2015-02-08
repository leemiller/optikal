var template = require('./templates/item-selector');
var config = require('config');
module.exports = Backbone.Marionette.ItemView.extend({
    tagName: 'div',
    className: 'tonic-selector-container',
    template: template,

    ui: {
        tonicSelect: 'select.tonic'
    },

    events: {
        'change @ui.tonicSelect': 'changeTonic'
    },

    changeTonic: function(event) {
        this.trigger('change:tonic', $(event.currentTarget).val());
    },

    onRender: function() {
        this.ui.tonicSelect.val(config.defaultTonic);
    },

    serializeData: function() {
        return {
            notes: config.allPitches.split(' ')
        };
    }
});