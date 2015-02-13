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

        Bus.Event.on('change:mode', this._changeMode, this);
    },

    _changeMode: function(newMode) {
        this.noteGroup.children.each(function(noteNode) {
            noteNode.setAttrs({
                opacity: 0.1,
                initialOpacity: 0.1
            });
        });
        var positions = config.modes[newMode];
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
        Bus.Event.off('change:mode', this._changeMode, this);

    }
}); 