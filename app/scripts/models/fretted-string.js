var config = require('config');
var defaults = require('defaults');

module.exports = Backbone.Model.extend({
    _notes: null,

    defaults: {
        tonic: defaults.tonic,
        frets: config.instruments[defaults.instrument].frets
    },

    initialize: function(options) {
        var chromaticScale = config.chromaticScales[this.get('tonic')];
        var notes = [];
        var numberOfNotesInScale = chromaticScale.length;
        var frets = this.get('frets') + 1;
        _(frets).range().map(function(fret) {
            var scaleIndex = fret >= numberOfNotesInScale ? fret % numberOfNotesInScale : fret;
            notes.push(chromaticScale.at(scaleIndex));
        });

        this._notes = notes;
        this.set('notes', notes);
        this.set('noteNames', _.map(notes, function(note) {
            return note.get('name');
        }));
    },

    sync: function() {
        // no need to save, no need for sync!
    }
});