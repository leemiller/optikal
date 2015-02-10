var Notes = require('scripts/collections/notes');

var defaultNotes = new Notes();
var notesAtTonicToNotesMap = {
    'C C# D D# E F F# G G# A A# B': defaultNotes,
    'C# D D# E F F# G G# A A# B C': new Notes('C#'),
    'D D# E F F# G G# A A# B C C#': new Notes('D'),
    'D# E F F# G G# A A# B C C# D': new Notes('D#'),
    'E F F# G G# A A# B C C# D D#': new Notes('E'),
    'F F# G G# A A# B C C# D D# E': new Notes('F'),
    'F# G G# A A# B C C# D D# E F': new Notes('F#'),
    'G G# A A# B C C# D D# E F F#': new Notes('G'),
    'G# A A# B C C# D D# E F F# G': new Notes('G#'),
    'A A# B C C# D D# E F F# G G#': new Notes('A'),
    'A# B C C# D D# E F F# G G# A': new Notes('A#'),
    'B C C# D D# E F F# G G# A A#': new Notes('B')
}

describe('notes', function() {
    it('should contain 12 notes', function(done) {
        defaultNotes.length.should.equal(12);
        done()
    });
    it('should default to a tonic of C', function(done) {
        defaultNotes.getTonic().should.equal('C');
        done();
    });
    it('should allow a tonic of any note', function(done) {
        _.each(notesAtTonicToNotesMap, function(notes, scaleNotes) {
            var tonic = scaleNotes.split(' ')[0];
            notes.getTonic().should.equal(tonic);
        });
        done();
    });
    it('should print a list of notes, starting with the tonic', function(done) {
        defaultNotes.getNotes().should.equal('C C# D D# E F F# G G# A A# B');
        done();
    });
});