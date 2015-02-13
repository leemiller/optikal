module.exports = {
    expect: expect,
    should: should,

    init: function() {
        require('test/collections/notes_test');
        require('test/collections/fretted-strings_test');

        require('test/models/fretted-string_test');
    }
}