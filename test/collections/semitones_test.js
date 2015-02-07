var Semitones = require('scripts/collections/semitones');

var defaultSemitones = new Semitones();
var noteSemitonesMap = {
    'C C# D D# E F F# G G# A A# B': defaultSemitones,
    'C# D D# E F F# G G# A A# B C': new Semitones('C#'),
    'D D# E F F# G G# A A# B C C#': new Semitones('D'),
    'D# E F F# G G# A A# B C C# D': new Semitones('D#'),
    'E F F# G G# A A# B C C# D D#': new Semitones('E'),
    'F F# G G# A A# B C C# D D# E': new Semitones('F'),
    'F# G G# A A# B C C# D D# E F': new Semitones('F#'),
    'G G# A A# B C C# D D# E F F#': new Semitones('G'),
    'G# A A# B C C# D D# E F F# G': new Semitones('G#'),
    'A A# B C C# D D# E F F# G G#': new Semitones('A'),
    'A# B C C# D D# E F F# G G# A': new Semitones('A#'),
    'B C C# D D# E F F# G G# A A#': new Semitones('B')
}

describe('semitones', function() {
    it('should contain 12 semitones', function(done) {
        defaultSemitones.length.should.equal(12);
        done()
    });
    it('should default to a tonic of C', function(done) {
        defaultSemitones.getTonic().should.equal('C');
        done();
    });
    it('should allow a tonic of any note', function(done) {
        _.each(noteSemitonesMap, function(semitones, scaleNotes) {
            var tonic = scaleNotes.split(' ')[0];
            semitones.getTonic().should.equal(tonic);
        });
        done();
    });
    it('should print a list of semitones, starting with the tonic', function(done) {
        defaultSemitones.getNotes().should.equal('C C# D D# E F F# G G# A A# B');
        done();
    });
});