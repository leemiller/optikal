var config = require('config');
var defaults = require('defaults');

module.exports = Backbone.Model.extend({
    _notes: null,

    defaults: {
        tonic: defaults.tonic,
        frets: defaults.instruments['fretted-string'].frets,
        chromaticScale: null,
    },

    initialize: function(options) {
        var chromaticScale = config.chromaticScales[this.get('tonic')];
        this.set('chromaticScale', chromaticScale);
        var notes = [];
        for (var i = 0; i <= this.get('frets'); i++) {
            (function(i) {
                var index = i >= chromaticScale.length ? i % chromaticScale.length : i;
                notes.push(chromaticScale.at(index));
            })(i);
        }
        this._notes = notes;
    },

    getNotes: function() {
        return _.map(this._notes, function(note) {
            return note.get('name');
        }).join(' ');
    },

    sync: function() {
        // no need to save, no need for sync!
    }
});