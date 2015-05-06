(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';

    if (has(cache, path)) return cache[path].exports;
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex].exports;
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  var list = function() {
    var result = [];
    for (var item in modules) {
      if (has(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.list = list;
  globals.require.brunch = true;
})();
require.register("test/collections/fretted-strings_test", function(exports, require, module) {
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
});
});

require.register("test/collections/notes_test", function(exports, require, module) {
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
});

require.register("test/models/fretted-string_test", function(exports, require, module) {
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
});

require.register("test/test-helpers", function(exports, require, module) {
module.exports = {
    expect: expect,
    should: should,

    init: function() {
        require('test/collections/notes_test');
        require('test/collections/fretted-strings_test');

        require('test/models/fretted-string_test');
    }
}
});

;
//# sourceMappingURL=test.js.map