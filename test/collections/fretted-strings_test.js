var FrettedStrings = require('scripts/collections/fretted-strings');
var defaultFrettedStrings = new FrettedStrings();

describe('fretted strings', function() {
    it('should default to 4 strings', function(done) {
        defaultFrettedStrings.length.should.equal(4);
        done();
    });
    it('should default to 20 frets', function(done) {
        defaultFrettedStrings.getFrets().should.equal(20);
        done();
    });
    it('should produce a display width', function(done) {
        defaultFrettedStrings.getDisplayWidth().should.equal(745.0229699288578);
        done();
    });
});