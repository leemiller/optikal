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
require.register("app", function(exports, require, module) {
var LayoutController = require('scripts/controllers/layout');
var region = new Backbone.Marionette.Region({
    el: '#main'
});
var layout = new LayoutController({
    region: region
});
layout.show();
});

require.register("bus", function(exports, require, module) {
var EventBus = new Backbone.Wreqr.EventAggregator();
var ReqresBus = new Backbone.Wreqr.RequestResponse();
module.exports = {
    Event: EventBus,
    Reqres: ReqresBus
};
});

require.register("config", function(exports, require, module) {
var Notes = require('scripts/collections/notes');
var notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
var allChromaticScales = {};
_.each(notes, function(tonic) {
    allChromaticScales[tonic] = new Notes(tonic);
});

module.exports = {
    notes: notes,
    chromaticScales: allChromaticScales,
    scales: {
        Acoustic: [0, 2, 4, 5, 6, 7, 9, 10],
        'Natural Minor': [0, 2,3, 5, 7, 8, 10],
        Algerian: [0, 2, 3, 6, 7, 8, 11],
        Altered: [0, 1, 3, 4, 6, 8, 10],
        Augmented: [0, 3, 4, 7, 9, 11],
        'Bebop Dominant': [0, 2, 4, 5, 7, 9, 10, 11],
        Blues: [0, 3, 5, 6, 7, 10],
        Chromatic: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        'Double Harmonic': [0, 1, 4, 5, 7, 8, 11],
        Enigmatic: [0, 1, 4, 6, 8, 10, 11],
        Gypsy: [0, 2, 3, 6, 7, 8, 10],
        'Half Diminshed': [0, 2, 3, 5, 6, 8, 10],
        'Harmonic Major': [0, 2, 4, 5, 7, 8, 11],
        'Harmonc Minor': [0, 2, 3, 5, 7, 8, 11],
        Hirjoshi: [0, 2, 3, 7, 8],
        'Hungarian Minor': [0, 2, 3, 6, 7, 8, 11],
        Insen: [0, 1, 5, 7, 10],
        Major: [0, 2, 4, 5, 7, 9, 11],
        Istrian: [0, 1, 3, 4, 6, 7],
        Iwato: [0, 1, 10, 5, 6],
        'Major Pentatonic Scale': [0, 9, 2, 4, 7]
    },
    instruments: {
        Bass: {
            type: 'fretted-string',
            frets: 20,
            strings: ['G', 'D', 'A', 'E'],
            lengthPerFret: 60,
            stringHeight: 40,
            padding: 40,
            nutWidth: 15,
            fretWidth: 6,
            fretMarkers: [1, 3, 5, 7, 9, 12, 15, 17, 19],
            fretboardColor: '#f2e9cc'
        },
        Guitar: {
            type: 'fretted-string',
            frets: 22,
            strings: ['E', 'B', 'G', 'D', 'A', 'E'],
            lengthPerFret: 50,
            stringHeight: 25,
            padding: 30,
            nutWidth: 15,
            fretWidth: 4,
            fretMarkers: [3, 5, 7, 9, 12, 15, 17, 19, 21],
            fretboardColor: '#f2e9cc'
        },
        Uke: {
            type: 'fretted-string',
            frets: 17,
            strings: ['G', 'C', 'A', 'E'],
            lengthPerFret: 60,
            stringHeight: 30,
            padding: 30,
            nutWidth: 10,
            fretWidth: 5,
            fretMarkers: [5, 7, 10, 12, 15],
            fretboardColor: '#f2e9cc'
        }
    }
};
});

require.register("defaults", function(exports, require, module) {
module.exports = {
    tonic: 'C',
    scale: 'Major',
    instrument: 'Bass'
};
});

require.register("scripts/collections/fretted-strings", function(exports, require, module) {
var FrettedStringModel = require('../models/fretted-string');
var defaults = require('defaults');
var config = require('config');

var FrettedStringCollection = Backbone.Collection.extend({
    model: FrettedStringModel,
    url: '/fretted-strings',
    settings: null,
    fretDistanceMap: null,
    displayWidth: 0,
    displayHeight: 0,
    
    initialize: function(models, options) {
        this.options = options || {};
        this.settings = options.settings;

        this._setSettings();

        _.each(this.settings.strings, function(tonic) {
            this.create({
                tonic: tonic,
                frets: this.settings.frets
            });
        }, this);
    },

    getFrets: function() {
        return this.options.settings.frets;
    },

    _setSettings: function() {
        var strings = this.settings.strings;
        var frets = this.settings.frets;
        var scaleLength = this.settings.lengthPerFret * frets;
        var distance = 0;
        var fretDistanceMap = {};
        for (var fret = 1; fret <= frets; fret++) {
            var location = scaleLength - distance;
            var scaleFactor = location / 17.817;
            distance += scaleFactor;
            fretDistanceMap[fret] = {
                distance: distance,
                width: scaleFactor
            };
        }
        var endPadding = (2 * this.settings.padding);
        var totalLength = distance + endPadding;

        this.settings.displayWidth = distance + endPadding;
        this.settings.fretboardWidth = distance;
        this.settings.fretDistanceMap = fretDistanceMap;
        this.settings.fretboardHeight = strings.length * this.settings.stringHeight
        this.settings.displayHeight = this.settings.fretboardHeight + endPadding;

    },  

    sync: function() {

    }
});

var defaultInstrument = config.instruments[defaults.instrument];

module.exports = function(settings) {
    settings = settings || defaultInstrument;
    return new FrettedStringCollection(null, {
        settings: settings
    });
};
});

require.register("scripts/collections/notes", function(exports, require, module) {
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

});

require.register("scripts/controllers/color-wheel", function(exports, require, module) {
var ColorWheelView = require('scripts/views/color-wheel');
var ConstellationView = require('../views/constellation');
var config = require('config');
var defaults = require('defaults');
var Bus = require('bus');

module.exports = Backbone.Marionette.Controller.extend({
    baseLayer: null,
    mouseoverLayer: null,
    constellationLayer: null,
    stage: null,
    wheel: null,
    constellation: null,
    _currentScale: defaults.scale,
    _currentTonic: defaults.tonic,

    initialize: function(options) {
        this.options = options || {};

        this.stage = new Konva.Stage({
            container: this.options.container,
            width: 500,
            height: 500
        });

        this.baseLayer = new Konva.Layer();
        this.mouseoverLayer = new Konva.Layer();
        this.constellationLayer = new Konva.Layer();
        this.stage.add(this.baseLayer, this.mouseoverLayer, this.constellationLayer);

        Bus.Event.on('change:tonic', this._changeTonic, this);
        Bus.Event.on('change:scale', this._changeScale, this);

        Bus.Reqres.setHandler('current:tonic', function() {
            return this._currentTonic;
        }, this);
        Bus.Reqres.setHandler('current:scale', function() {
            return this._currentScale;
        }, this);
    },

    _changeScale: function(newScale) {
        this._currentScale = newScale;
        this._clearPreviousConstellation();
        var scalePositions = config.scales[newScale];
        this.constellation = new ConstellationView({
            stage: this.stage,
            baseLayer: this.constellationLayer,
            collection: scalePositions
        });
    },

    _clearPreviousConstellation: function() {
        if (_.isNull(this.constellation)) return;
        this.constellation.off();
        this.constellation.destroy();
        this.constellationLayer.destroyChildren();
        this.stage.draw();
    },

    _changeTonic: function(newTonic) {
        this._currentTonic = newTonic;
        this._clearPreviousWheel();
        this._showColorWheel(newTonic);
    },

    _clearPreviousWheel: function() {
        if (_.isNull(this.wheel)) return;
        this.wheel.off();
        this.wheel.destroy();
        this.baseLayer.destroyChildren();
        this.mouseoverLayer.destroyChildren();
        this.stage.draw();
    },

    _showColorWheel: function(tonic) {
        this.wheel = new ColorWheelView({
            stage: this.stage,
            baseLayer: this.baseLayer,
            mouseoverLayer: this.mouseoverLayer, 
            collection: config.chromaticScales[tonic]
        });
    }
});
});

require.register("scripts/controllers/fretted-string", function(exports, require, module) {
var FrettedStringView = require('../views/instruments/fretted');
var FrettedStrings = require('scripts/collections/fretted-strings');
var config = require('config');
var Bus = require('bus');

module.exports = Backbone.Marionette.Controller.extend({
    baseLayer: null,
    mouseoverLayer: null,
    stage: null,
    frettedString: null,

    initialize: function(options) {
        this.options = options || {};

        Bus.Event.on('change:instrument', this._changeInstrument, this);
        Bus.Event.on('change:scale', this._changeScale, this);
        Bus.Event.on('change:tonic', function() {
            this.frettedString._changeScale(Bus.Reqres.request('current:scale'));
        }, this);
    },

    _changeScale: function(newScale) {
        this.frettedString._changeScale(newScale);
    },

    _showInstrument: function(newInstrument) {
        var stringSettings = config.instruments[newInstrument];
        var strings = new FrettedStrings(stringSettings);
        var settings = {
            height: strings.settings.displayHeight,
            width: strings.settings.displayWidth
        };

        this._initializeStageAndLayers(settings);

        this.frettedString = new FrettedStringView({
            collection: strings,
            stage: this.stage,
            baseLayer: this.baseLayer,
            mouseoverLayer: this.mouseoverLayer,
        });
    },

    _initializeStageAndLayers: function(settings) {
        this.stage = new Konva.Stage({
            container: this.options.container,
            width: settings.width,
            height: settings.height
        });
        this.baseLayer = new Konva.Layer();
        this.mouseoverLayer = new Konva.Layer();
        this.stage.add(this.baseLayer, this.mouseoverLayer);
    },

    _changeInstrument: function(newInstrument) {
        this._clearPreviousInstrument();
        this._showInstrument(newInstrument);

        this.frettedString._changeScale(Bus.Reqres.request('current:scale'));
    },

    _clearPreviousInstrument: function() {
        if (_.isNull(this.frettedString)) return;
        this.frettedString.off();
        this.frettedString.destroy();
        this.baseLayer.destroyChildren();
        this.mouseoverLayer.destroyChildren();
        this.baseLayer.destroy();
        this.mouseoverLayer.destroy();
        this.stage.destroy();
        this.stage = null;
    }
})
});

;require.register("scripts/controllers/layout", function(exports, require, module) {
var LayoutView = require('../views/layout');
var SelectorView = require('../views/selector');
var ColorWheelController = require('./color-wheel');
var FrettedStringController = require('./fretted-string');
var config = require('config');
var Bus = require('bus');

module.exports = Backbone.Marionette.Controller.extend({
    initialize: function(options) {
        this.options = options || {};
    },

    show: function() {
        var layoutView = new LayoutView();
        this.options.region.show(layoutView);

        var selectorView = new SelectorView();
        
        var wheelContainer = $(layoutView.getRegion('colorWheel').el)[0];
        var colorWheel = new ColorWheelController({
            container: wheelContainer
        });

        var instrumentContainer = $(layoutView.getRegion('instrument').el)[0];
        var instrument = new FrettedStringController({
            container: instrumentContainer
        });

        layoutView.getRegion('selector').show(selectorView);
    }
})
});

;require.register("scripts/models/fretted-string", function(exports, require, module) {
var config = require('config');
var defaults = require('defaults');

module.exports = Backbone.Model.extend({
    _notes: null,

    defaults: {
        tonic: defaults.tonic,
        frets: config.instruments[defaults.instrument].frets
    },

    initialize: function(options) {
        var chromaticScale = config.chromaticScales[this.get('tonic')];
        var notes = [];
        var numberOfNotesInScale = chromaticScale.length;
        var frets = this.get('frets') + 1;
        _(frets).range().map(function(fret) {
            var scaleIndex = fret >= numberOfNotesInScale ? fret % numberOfNotesInScale : fret;
            notes.push(chromaticScale.at(scaleIndex));
        });

        this._notes = notes;
        this.set('notes', notes);
        this.set('noteNames', _.map(notes, function(note) {
            return note.get('name');
        }));
    },

    sync: function() {
        // no need to save, no need for sync!
    }
});
});

require.register("scripts/models/note", function(exports, require, module) {
module.exports = Backbone.Model.extend({
    defaults: {
        name: undefined,
        color: undefined
    },

    sync: function() {
        // no need to save, no need for sync!
    }
});
});

require.register("scripts/views/color-wheel", function(exports, require, module) {
var eachSectionDegrees = 360 / 12;
var startRotation = -90 - (eachSectionDegrees / 2);

var KonvaView = require('./konva');
var Bus = require('bus');

module.exports = KonvaView.extend({
    wedgeGroup: null,
    labelGroup: null,
    currentTween: null,

    events: {
        'mouseover .note-wedge': '_scaleUpWedge',
        'mouseout .note-wedge': '_resetWedge',
        'click .note-wedge': '_changeTonic'
    },

    initialize: function(options) {
        options = options || {};
        this.baseLayer = options.baseLayer;
        this.mouseoverLayer = options.mouseoverLayer;
        this.stage = options.stage;
        this.options = options;

        this.render();
    },

    _changeTonic: function(e) {
        var wedge = e.target;
        var newTonic = wedge.getAttr('id').split('-')[1];
        Bus.Event.trigger('change:tonic', newTonic);
    },

    _scaleUpWedge: function(e) {
        var wedge = e.target;

        Bus.Event.trigger('note:highlighted', wedge.getAttr('note'));

        wedge.moveTo(this.mouseoverLayer);
        
        var scale = 1.15;
        var newAngle = eachSectionDegrees * scale;
        var newRotation = wedge.getAttr('startRotation') - ((eachSectionDegrees * scale) / 2) + (eachSectionDegrees /2);

        this.currentTween = new Konva.Tween({
            node: wedge,
            duration: 0.5,
            easing: Konva.Easings.ElasticEaseOut,
            scaleX: scale,
            scaleY: scale,
            angle: newAngle,
            rotation: newRotation
        });
        this.currentTween.play();
        this.stage.draw();
    },

    _addToGroup: function() {
        this.wedgeGroup = new Konva.Group();
        this.labelGroup = new Konva.Group();
        this.collection.each(function(note, index) {
            this._addWedge(note, index);
            this._addLabel(note, index);
        }, this);
        this.group.add(this.wedgeGroup);
        this.group.add(this.labelGroup);
    },

    _addLabel: function(note, index) {
        var startRot = -90;
        var rotation = startRot + (eachSectionDegrees * index);
        var pos = this.getPositionFromAngle(250, 250, rotation, 200);
        var label = new Konva.Text({
            x: pos.x,
            y: pos.y,
            text: note.get('name'),
            id: 'label-' + note.get('name'),
            fontSize: 24,
            fill: 'black'
        });
        label.setOffset({
            x: label.getWidth() / 2,
            y: label.getHeight() / 2
        });
        this.labelGroup.add(label);
    },

    _addWedge: function(note, index) {
        var rotation = startRotation + (eachSectionDegrees * index);
        var wedge = new Konva.Wedge({
            x: 250,
            y: 250,
            radius: 150,
            angle: eachSectionDegrees,
            name: 'note-wedge',
            id: 'note-' + note.get('name'),
            fill: note.get('color'),
            note: note.get('name'),
            rotation: rotation,
            startRotation: rotation,
            scale: {
                x: 1,
                y: 1
            },
            startScale: 1
        });
        this.wedgeGroup.add(wedge);
    },

    _resetWedge: function(e) {
        var wedge = e.target;
        Bus.Event.trigger('note:unhighlighted', wedge.getAttr('note'));
        wedge.moveTo(this.baseLayer);
        if(this.currentTween) {
            this.currentTween.pause();
        }

        wedge.setAttrs({
            scaleY: 1,
            scaleX: 1,
            angle: eachSectionDegrees,
            rotation: wedge.getAttr('startRotation')
        });
        this.stage.draw();
    },

    onDestroy: function() {
        this.wedgeGroup.destroyChildren();
        this.labelGroup.destroyChildren();
    }
}); 
});

require.register("scripts/views/constellation", function(exports, require, module) {
var eachSectionDegrees = 360 / 12;
var startRotation = -90;

var KonvaView = require('./konva');

module.exports = KonvaView.extend({
    labelGroup: null,
    linesGroup: null,

    initialize: function(options) {
        options = options || {};
        this.baseLayer = options.baseLayer;
        this.stage = options.stage;
        this.options = options;
        
        this.render();
    },

    _addToGroup: function() {
        this.labelGroup = new Konva.Group();
        this.linesGroup = new Konva.Group();

        var endPoints = [];
        var labelPoints = [];
        _.each(this.collection, function(noteNumber) {
            var rotation = startRotation + (eachSectionDegrees * noteNumber);
            var endPoint = this.getPositionFromAngle(250, 250, rotation, 150);
            endPoints.push(endPoint);

            var labelPoint = this.getPositionFromAngle(250, 250, rotation, 162);
            labelPoints.push(labelPoint);
        }, this);
        this._addLines(endPoints);
        this._addLabels(labelPoints);

        this.group.add(this.linesGroup);
        this.group.add(this.labelGroup);
    },

    _addLabels: function(labelPoints) {
        _.each(labelPoints, function(labelPoint, index) {
            var label = new Konva.Text({
                x: labelPoint.x,
                y: labelPoint.y,
                text: index+1,
                id: 'number-label-' + (index+1),
                fontSize: 16,
                fill: 'white',
                shadowColor: 'black',
                shadowBlur: 4
            });
            label.setOffset({
                x: label.getWidth() / 2,
                y: label.getHeight() / 2
            });
            this.labelGroup.add(label);
        }, this);
        
    },

    _addLines: function(endPoints) {
        var endPoints = _.map(this.collection, function(step) {
            var rotation = startRotation + (eachSectionDegrees * step);
            var endPoint = this.getPositionFromAngle(250, 250, rotation, 150);
            return endPoint;
        }, this);
        var nonTonicPoints = _.rest(endPoints);
        _.each(nonTonicPoints, function(endPoint) {
            var attributes = this._getLineAttributes(endPoint);
            var line = new Konva.Line(attributes);
            line.setListening(false);
            this.group.add(line);
        }, this);
        var tonicPoint = _.first(endPoints);
        var arrowAttributes = this._getLineAttributes(tonicPoint);
        arrowAttributes = _.extend(arrowAttributes, {
            pointerLength: 12,
            pointerWidth: 8,
            radius: 10,
        });
        var arrow = new Konva.Arrow(arrowAttributes);
        arrow.setListening(false);
        this.linesGroup.add(arrow);
    },

    _getLineAttributes: function(endPoint) {
        return {
            points: [250, 250, endPoint.x, endPoint.y],
            fill: 'white',
            stroke: 'white',
            strokeWidth: 2,
            shadowColor: 'black',
            shadowBlur: 3,
            shadowOffset: {
                x: 0,
                y: 0
            }  
        };
    },

    onDestroy: function() {
        this.linesGroup.destroyChildren();
        this.labelGroup.destroyChildren();
        this.linesGroup.destroy();
        this.labelGroup.destroy();
    }
}); 
});

require.register("scripts/views/instruments/fretted", function(exports, require, module) {
var KonvaView = require('../konva');
var Bus = require('bus');
var defaults = require('defaults');
var config = require('config');

module.exports = KonvaView.extend({
    currentTweens: null,


    events: {
    },

    initialize: function(options) {
        options = options || {};
        this.baseLayer = options.baseLayer;
        this.mouseoverLayer = options.mouseoverLayer;
        this.stage = options.stage;
        this.options = options;

        this.currentTweens = [];

        _.chain(this.mouseoverNoteGroups).values().each(function(mouseoverNoteLayer) {
            this.mouseoverLayer.add(mouseoverNoteLayer);
        }, this);

        this.render();

        Bus.Event.on('note:highlighted', this._highlightSelectedNotes, this);

        Bus.Event.on('note:unhighlighted', this._unhighlightNotes, this);

        Bus.Event.on('change:scale', this._changeScale, this);
    },

    _changeScale: function(newScale) {
        this.noteGroup.children.each(function(noteNode) {
            noteNode.setAttrs({
                opacity: 0.1,
                initialOpacity: 0.1
            });
        });
        var positions = config.scales[newScale];
        var currentTonic = Bus.Reqres.request('current:tonic');
        var scale = config.chromaticScales[currentTonic];
        var nodes = [];
        var nodesToFind = _.map(positions, function(position) {
            return '.note-' + scale.at(position).get('name');
        }).join(',');
        var notes = this.noteGroup.find(nodesToFind);
        notes.each(function(noteNode) {
            noteNode.setAttrs({
                opacity: .75,
                initialOpacity: .75
            });
        });
        this.stage.draw();
    },

    _unhighlightNotes: function(note) {
        _.each(this.currentTweens, function(tween) {
            tween.destroy();
        });
        this.mouseoverNoteGroups[note].hide();
        this.stage.draw();
    },

    _highlightSelectedNotes: function(note) {
        _.each(this.currentTweens, function(tween) {
            tween.destroy();
        });

        this.mouseoverNoteGroups[note].show();
        this.stage.draw();
    },

    _drawFretboard: function(settings) {
        var fretboard = new Konva.Rect({
            x: settings.padding,
            y: settings.padding,
            width: settings.fretboardWidth,
            height: settings.fretboardHeight,
            fill: settings.fretboardColor
        });
        this.fretGroup.add(fretboard);

        var fretboardBinding = new Konva.Rect({
            x: settings.padding + (settings.fretWidth / 2),
            y: settings.padding + settings.fretboardHeight,
            width: settings.fretboardWidth,
            height: settings.padding / 2,
            fill: 'black'
        });
        this.fretGroup.add(fretboardBinding);

        var topOfLastFret = {
            x: settings.displayWidth - settings.padding,
            y: settings.padding
        };
        var firstControlPoint = {
            x: settings.displayWidth,
            y: settings.padding
        };
        var secondControlPoint = {
            x: settings.displayWidth,
            y: settings.padding + settings.fretboardHeight
        };
        var bottomOfLastFret = {
            x: settings.displayWidth - settings.padding,
            y: settings.fretboardHeight + settings.padding
        }
        var fretboardEnd = new Konva.Shape({
            drawFunc: function(context) {
                context.beginPath();
                context.moveTo(topOfLastFret.x, topOfLastFret.y);
                context.bezierCurveTo(
                    firstControlPoint.x, 
                    firstControlPoint.y, 
                    secondControlPoint.x, 
                    secondControlPoint.y, 
                    bottomOfLastFret.x, 
                    bottomOfLastFret.y
                );
                context.closePath();
                context.fillStrokeShape(this);
            },
            fill: settings.fretboardColor
        });

        this.fretGroup.add(fretboardEnd);
    },

    _drawFretMarkers: function(settings) {
        _.each(settings.fretMarkers, function(fretMarkerLocation) {
            var fret = settings.fretDistanceMap[fretMarkerLocation];
            var fretStart = (fret.distance - fret.width) + settings.padding;

            var fretMarker = new Konva.Rect({
                x: fretStart  + (fret.width / 4),
                y: settings.padding + 20,
                height: settings.fretboardHeight - 40,
                width: fret.width / 2,
                fill: 'black'
            });
            this.fretGroup.add(fretMarker);

            var labelStartPosition = {
                x: fretStart + (fret.width / 4),
                y: settings.padding + settings.fretboardHeight + (settings.padding / 8)
            };

            var rectangleAttributes = {
                x: labelStartPosition.x,
                y: labelStartPosition.y,
                width: fret.width / 2,
                height: settings.padding / 4,
                fill: 'white'
            };

            var label;
            // for octive labeling, 
            if (fretMarkerLocation % 12 === 0) {
                // make it smaller,
                rectangleAttributes.width = (fret.width / 2) / 3;
                label = new Konva.Rect(rectangleAttributes);
                this.fretGroup.add(label);
                // add another one after
                rectangleAttributes.x = rectangleAttributes.x + (fret.width / 3);
                label = new Konva.Rect(rectangleAttributes);
                this.fretGroup.add(label);
            } else {
                label = new Konva.Rect(rectangleAttributes);
                this.fretGroup.add(label);
            }
        }, this);
    },

    _drawFrets: function(settings) {
        var fretNumbers = _.range(1, this.collection.getFrets() + 1);

        _.each(fretNumbers, function(fretNumber) {
            var distanceFromNut = this.collection.settings.fretDistanceMap[fretNumber];
            var fret = new Konva.Rect({
                x: (settings.padding + distanceFromNut.distance) - (settings.fretWidth / 2),
                y: settings.padding,
                width: settings.fretWidth,
                height: settings.fretboardHeight,
                fill: 'silver'
            });
            this.fretGroup.add(fret);
        }, this);
    },

    _drawNut: function(settings) {
        var nut = new Konva.Rect({
            x: settings.padding - settings.nutWidth,
            y: settings.padding,
            // pad out the right side a bit
            width: settings.nutWidth + (settings.fretWidth / 2),
            height: settings.fretboardHeight,
            fill: 'black'
        });
        this.fretGroup.add(nut);
    },

    _drawNotes: function(string, index, settings) {
        var rootNote = _.first(string.get('notes'));
        var rootNoteName = 'note-' + rootNote.get('name');
        var nutNoteAttributes = {
            x: 0,
            y: settings.stringHeight * index + settings.padding,
            width: settings.padding - settings.nutWidth,
            height: settings.stringHeight,
            fill: rootNote.get('color'),
            name: rootNoteName,
            opacity: 0.1
        };
        var nutNoteColor = new Konva.Rect(nutNoteAttributes);
        this.noteGroup.add(nutNoteColor);

        nutNoteAttributes.opacity = 1;
        var nutNoteMouseoverColor = new Konva.Rect(nutNoteAttributes);
        this.mouseoverNoteGroups[rootNote.get('name')].add(nutNoteMouseoverColor);

        var frets = _.range(0, string.get('frets'));
        _.each(frets, function(fretNumber) {
            // frets are 1 based, 0 is the open string
            fretNumber = fretNumber + 1;
            var note = string.get('notes')[fretNumber];
            var fret = this.collection.settings.fretDistanceMap[fretNumber];
            var colorStartPoint = {
                x: (settings.padding + fret.distance) - fret.width + (settings.fretWidth / 2),
                y: settings.stringHeight * index + settings.padding
            };
            var rectangleAttributes = {
                x: colorStartPoint.x,
                y: colorStartPoint.y,
                width: fret.width - settings.fretWidth,
                height: settings.stringHeight,
                fill: note.get('color'),
                name: 'note-' + note.get('name'),
                opacity: 0.1
            };
            var color = new Konva.Rect(rectangleAttributes);
            this.noteGroup.add(color);

            rectangleAttributes.opacity = 1;
            rectangleAttributes.shadowEnabled = true;
            rectangleAttributes.shadowBlur = 10;
            rectangleAttributes.shadowColor = note.get('color');
            var mouseoverColor = new Konva.Rect(rectangleAttributes);
            this.mouseoverNoteGroups[note.get('name')].add(mouseoverColor);
        }, this);

    },

    _drawString: function(string, index, settings) {
        var rootNote = _.first(string.get('notes'));
        var stringYPosition = (settings.stringHeight / 2) - (settings.fretWidth / 2) + (settings.stringHeight * index) + settings.padding;
        var fretboardString = new Konva.Rect({
            x: settings.padding,
            y: stringYPosition,
            width: this.collection.settings.displayWidth,
            height: settings.fretWidth,
            fill: rootNote.get('color'),
            shadowEnabled: true,
            shadowColor: 'black',
            shadowBlur: 8
        });
        this.stringGroup.add(fretboardString);
        var stringOverNut = new Konva.Rect({
            x: 0,
            y: stringYPosition,
            width: settings.padding,
            height: settings.fretWidth,
            fill: rootNote.get('color'),
            name: 'note-' + rootNote.get('name')
        });
        this.stringGroup.add(stringOverNut);
    },

    _addToGroup: function() {
        this.fretGroup = new Konva.Group();
        this.noteGroup = new Konva.Group();
        this.stringGroup = new Konva.Group();

        this.mouseoverNoteGroups = {};
        _.each(config.notes, function(note) {
            this.mouseoverNoteGroups[note] = new Konva.Group();
            this.mouseoverNoteGroups[note].hide();
        }, this);

        var settings = this.collection.settings;

        this._drawFretboard(settings);
        this._drawFretMarkers(settings);
        this._drawFrets(settings);
        this._drawNut(settings);
        this.collection.each(function(string, index) {
            this._drawNotes(string, index, settings);
            this._drawString(string, index, settings);
        }, this);

        this.group.add(this.fretGroup);
        this.group.add(this.noteGroup);
        this.group.add(this.stringGroup);
    },

    onDestroy: function() {
        this.fretGroup.destroyChildren();
        this.noteGroup.destroyChildren();
        this.stringGroup.destroyChildren();

        _.chain(this.mouseoverNoteGroups).values().each(function(mouseoverNoteGroup) {
            mouseoverNoteGroup.destroyChildren();
            mouseoverNoteGroup.destroy();
        });

        Bus.Event.off('note:highlighted', this._highlightSelectedNotes, this);
        Bus.Event.off('note:unhighlighted', this._unhighlightNotes, this);
        Bus.Event.off('change:scale', this._changeScale, this);

    }
}); 
});

require.register("scripts/views/konva", function(exports, require, module) {
module.exports = Backbone.KonvaView.extend({
    group: null,
    baseLayer: null,

    el: function() {
        this.group = new Konva.Group();
        this._addToGroup();

        return this.group;
    },

    render: function() {
        this.baseLayer.add(this.el);

        this.stage.draw();
    },

    destroy: function() {
        this.undelegateEvents();
        this.onDestroy();
        this.group.destroyChildren();
        this.group.destroy();
    },

    onDestroy: function() {

    },

    getPositionFromAngle: function(x, y, angle, length) {
        var radians = angle * (Math.PI / 180);
        return { 
            x: x + length * Math.cos(radians), 
            y: y + length * Math.sin(radians) 
        };
    },

    _addToGroup: function() {

    }
})
});

;require.register("scripts/views/layout", function(exports, require, module) {
var template = require('./templates/layout');
module.exports = Backbone.Marionette.LayoutView.extend({
    tagName: 'div',
    className: 'layout',
    template: template,
    regions: {
        colorWheel: '#color-wheel-container',
        instrument: '#instrument-container',
        selector: '#selector'
    }
});
});

require.register("scripts/views/selector", function(exports, require, module) {
var template = require('./templates/item-selector');
var config = require('config');
var defaults = require('defaults');
var Bus = require('bus');
module.exports = Backbone.Marionette.ItemView.extend({
    tagName: 'div',
    className: 'selector-container',
    template: template,

    ui: {
        tonicSelect: 'select.tonic',
        scaleSelect: 'select.scale',
        instrumentSelect: 'select.instrument'
    },

    events: {
        'change @ui.tonicSelect': 'changeTonic',
        'change @ui.scaleSelect': 'changeScale',
        'change @ui.instrumentSelect': 'changeInstrument'
    },

    initialize: function() {
        Bus.Event.on('change:tonic', this._updateTonic, this);
        Bus.Event.on('change:scale', this._updateScale, this);
    },

    changeInstrument: function(event) {
        var newInstrument = $(event.currentTarget).val();
        Bus.Event.trigger('change:instrument', newInstrument);
    },

    changeScale: function(event) {
        var newScale = $(event.currentTarget).val();
        Bus.Event.trigger('change:scale', newScale);
    },

    changeTonic: function(event) {
        var newTonic = $(event.currentTarget).val();
        Bus.Event.trigger('change:tonic', newTonic);
    },

    onRender: function() {
        Bus.Event.trigger('change:instrument', defaults.instrument);
        Bus.Event.trigger('change:scale', defaults.scale);
        Bus.Event.trigger('change:tonic', defaults.tonic);
    },

    serializeData: function() {
        return {
            notes: config.notes,
            scales: _.keys(config.scales),
            instruments: _.keys(config.instruments)
        };
    },

    _updateTonic: function(newTonic) {
        this.ui.tonicSelect.val(newTonic);
    },

    _updateScale: function(newScale) {
        this.ui.scaleSelect.val(newScale);
    },

    onDestroy: function() {
        Bus.Event.off('change:tonic', this._updateTonic, this);
        Bus.Event.off('change:scale', this._updateScale, this);
    }
});
});

require.register("scripts/views/templates/item-selector", function(exports, require, module) {
var __templateData = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "    <option value=\""
    + escapeExpression(lambda(depth0, depth0))
    + "\">"
    + escapeExpression(lambda(depth0, depth0))
    + "</option>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<select class=\"tonic\">\r\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.notes : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "</select>\r\n\r\n<select class=\"scale\">\r\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.scales : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "</select>\r\n\r\n<select class=\"instrument\">\r\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.instruments : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</select>";
},"useData":true});
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("scripts/views/templates/layout", function(exports, require, module) {
var __templateData = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div id=\"selector\"></div>\r\n<div id=\"color-wheel-container\"></div>\r\n<div id=\"instrument-container\"></div>";
  },"useData":true});
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;
//# sourceMappingURL=app.js.map