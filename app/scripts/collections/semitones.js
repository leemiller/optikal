var semitoneModel = require('../models/semitone');
var config = require('config');

var semitones = [
    {note: 'C', color: '#ff0000'},
    {note: 'C#', color: '#ff6600'},
    {note: 'D', color:'#ff9400'},
    {note: 'D#', color: '#ffc500'},
    {note: 'E', color: '#ffff00'},
    {note: 'F', color: '#8cc700'},
    {note: 'F#', color: '#0fad00'},
    {note: 'G', color: '#00a3c7'},
    {note: 'G#', color: '#0064b5'},
    {note: 'A', color: '#0010a5'},
    {note: 'A#', color: '#6300a5'},
    {note: 'B', color: '#c5007c'}
];

var semitoneCollection = Backbone.Collection.extend({
    model: semitoneModel,
    url: '/semitones',
    noteCache: null,
    
    initialize: function(models, options) {
        this.options = options || {};
        var tonic = this.options.tonic;

        var notes = this._getNotesWithTonic(tonic);
        
        _(notes).each(function(note) {
            this.create(note);
        }, this);
    },

    getTonic: function() {
        return this.first().get('note');
    },

    getNotes: function() {
        if (_.isNull(this.noteCache)) {
            this.noteCache = this.map(function(semitone) {
                return semitone.get('note');
            });
        }

        return this.noteCache.join(' ');
    },

    _getNotesWithTonic: function(tonic) {
        var tonicIndex;
        var notes = [];
        for (var i = 0; i < semitones.length; i++) {
            var semitone = semitones[i];
            if (semitone.note === tonic) {
                tonicIndex = i;
            }
            notes.push({
                note: semitone.note,
                color: semitone.color
            });
        }

        var notesAtTonic = notes.splice(tonicIndex, notes.length - tonicIndex);
        notesAtTonic = notesAtTonic.concat(notes);
        return notesAtTonic;
    },

    sync: function() {

    }
});

module.exports = function(tonic) {
    var tonic = tonic || config.defaultTonic;
    return new semitoneCollection(null, {tonic: tonic});
};
