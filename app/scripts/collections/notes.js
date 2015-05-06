var NoteModel = require('../models/note');
var defaults = require('defaults');

var baseNotes = [
    {name: 'C', color: '#ff0000'},
    {name: 'C#', color: '#ff6600'},
    {name: 'D', color:'#ff9400'},
    {name: 'D#', color: '#ffc500'},
    {name: 'E', color: '#ffff00'},
    {name: 'F', color: '#8cc700'},
    {name: 'F#', color: '#0fad00'},
    {name: 'G', color: '#00a3c7'},
    {name: 'G#', color: '#0064b5'},
    {name: 'A', color: '#0010a5'},
    {name: 'A#', color: '#6300a5'},
    {name: 'B', color: '#c5007c'}
];

var NotesCollection = Backbone.Collection.extend({
    model: NoteModel,
    url: '/notes',
    noteCache: null,
    
    initialize: function(models, options) {
        this.options = options || {};
        this.noteCache = [];
        var tonic = this.options.tonic;

        var notes = this._getNotesFrom(tonic);

        _.each(notes, function(note) {
            this.create(note);
            this.noteCache.push(note.name);
        }, this);

    },

    getTonic: function() {
        return this.first().get('name');
    },

    getNotes: function() {
        return this.noteCache.join(' ');
    },

    getNotesArray: function() {
        return this.noteCache;
    },

    _getNotesFrom: function(tonic) {
        var tonicIndex;
        // copy the notes
        var notes = [];
        _.each(baseNotes, function(baseNote, index) {
            if (baseNote.name === tonic) {
                tonicIndex = index;
            }
            notes.push({
                name: baseNote.name,
                color: baseNote.color
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
    var tonic = tonic || defaults.tonic;
    return new NotesCollection(null, {tonic: tonic});
};
