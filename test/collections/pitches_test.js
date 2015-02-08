var Pitches = require('scripts/collections/pitches');

var defaultPitches = new Pitches();
var notesPitchMap = {
    'C C# D D# E F F# G G# A A# B': defaultPitches,
    'C# D D# E F F# G G# A A# B C': new Pitches('C#'),
    'D D# E F F# G G# A A# B C C#': new Pitches('D'),
    'D# E F F# G G# A A# B C C# D': new Pitches('D#'),
    'E F F# G G# A A# B C C# D D#': new Pitches('E'),
    'F F# G G# A A# B C C# D D# E': new Pitches('F'),
    'F# G G# A A# B C C# D D# E F': new Pitches('F#'),
    'G G# A A# B C C# D D# E F F#': new Pitches('G'),
    'G# A A# B C C# D D# E F F# G': new Pitches('G#'),
    'A A# B C C# D D# E F F# G G#': new Pitches('A'),
    'A# B C C# D D# E F F# G G# A': new Pitches('A#'),
    'B C C# D D# E F F# G G# A A#': new Pitches('B')
}

describe('pitches', function() {
    it('should contain 12 pitches', function(done) {
        defaultPitches.length.should.equal(12);
        done()
    });
    it('should default to a tonic of C', function(done) {
        defaultPitches.getTonic().should.equal('C');
        done();
    });
    it('should allow a tonic of any note', function(done) {
        _.each(notesPitchMap, function(pitches, scaleNotes) {
            var tonic = scaleNotes.split(' ')[0];
            pitches.getTonic().should.equal(tonic);
        });
        done();
    });
    it('should print a list of pitches, starting with the tonic', function(done) {
        defaultPitches.getNotes().should.equal('C C# D D# E F F# G G# A A# B');
        done();
    });
});