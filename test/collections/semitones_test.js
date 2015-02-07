var Semitones = require('scripts/collections/semitones');

describe('semitones', function() {
    it('should contain 12 semitones', function(done) {
        var semitones = new Semitones();
        semitones.length.should.equal(12);
        done()
    });
    it('should default to a tonic of C', function(done) {
        var semitones = new Semitones();
        semitones.getTonic().should.equal('C');
        done();
    });
    it('should allow a tonic of A', function(done) {
        var semitones = new Semitones('A');
        semitones.getTonic().should.equal('A');
        done();
    });
});