var LayoutController = require('scripts/controllers/layout');
var region = new Backbone.Marionette.Region({
    el: '#main'
});
var layout = new LayoutController({
    region: region
});
layout.show();