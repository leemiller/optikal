var FrettedStrings = require('scripts/collections/fretted-strings');
var defaultFrettedStrings = new FrettedStrings();

describe('fretted strings', function() {
    it('should default to 6 strings', function(done) {
        defaultFrettedStrings.length.should.equal(6);
        done();
    });
    it('should default to 12 frets', function(done) {
        defaultFrettedStrings.getFrets().should.equal(12);
        done();
    });
});