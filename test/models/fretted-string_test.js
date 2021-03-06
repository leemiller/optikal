var FrettedString = require('scripts/models/fretted-string');
var defaultFrettedString = new FrettedString();

describe('fretted string', function() {
    it('should default to a tonic of C', function(done) {
        defaultFrettedString.get('tonic').should.equal('C');
        done();
    });
    it('should default to 20 frets', function(done) {
        defaultFrettedString.get('frets').should.equal(20);
        done();
    });
    it('should print out a list of notes', function(done) {
        defaultFrettedString.get('noteNames').join(' ').should.equal('C C# D D# E F F# G G# A A# B C C# D D# E F F# G G#');
        done();
    });
    it('should print out a list of 24 notes', function(done) {
        var frettedString = new FrettedString({
            frets: 24
        });
        frettedString.get('frets').should.equal(24);
        frettedString.get('noteNames').join(' ').should.equal('C C# D D# E F F# G G# A A# B C C# D D# E F F# G G# A A# B C');
        done();
    });
    it('should allow any note to be the tonic', function(done) {
        var frettedString = new FrettedString({
            tonic: 'F#'
        });
        frettedString.get('tonic').should.equal('F#');
        frettedString.get('noteNames').join(' ').should.equal('F# G G# A A# B C C# D D# E F F# G G# A A# B C C# D');
        done();
    });
});