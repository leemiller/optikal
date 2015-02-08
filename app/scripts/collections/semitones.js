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
        this.noteCache = [];
        var tonic = this.options.tonic;

        var notes = this._getNotesWithTonic(tonic);

        _.each(notes, function(note) {
            this.create(note);
            this.noteCache.push(note.note);
        }, this);

    },

    getTonic: function() {
        return this.first().get('note');
    },

    getNotes: function() {
        return this.noteCache.join(' ');
    },

    getNotesArray: function() {
        return this.noteCache;
    },

    _getNotesWithTonic: function(tonic) {
        var tonicIndex;
        var notes = [];
        _.each(semitones, function(semitone, index) {
            if (semitone.note === tonic) {
                tonicIndex = index;
            }
            notes.push({
                note: semitone.note,
                color: semitone.color
            });
        });

        var notesFromTonic = notes.splice(tonicIndex, notes.length - tonicIndex);
        notesFromTonic = notesFromTonic.concat(notes);
        return notesFromTonic;
    },

    sync: function() {

    }
});

module.exports = function(tonic) {
    var tonic = tonic || config.defaultTonic;
    return new semitoneCollection(null, {tonic: tonic});
};
