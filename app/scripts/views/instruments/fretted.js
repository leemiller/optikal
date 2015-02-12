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
                opacity: 1,
                initialOpacity: 1
            });
        });
        this.stage.draw();
    },

    _unhighlightNotes: function(note) {
        var notes = this.mouseoverLayer.find('.' + note);

        _.each(this.currentTweens, function(tween) {
            tween.destroy();
        });
        var noteGroup = this.noteGroup;
        notes.each(function(noteNode) {
            noteNode.moveTo(noteGroup);
            var initialOpacity = noteNode.getAttr('initialOpacity');
            noteNode.setAttrs({
                opacity: initialOpacity,
                shadowEnabled: false
            });
        });
        this.stage.draw();
    },

    _highlightSelectedNotes: function(note) {
        var notes = this.noteGroup.find('.' + note);

        _.each(this.currentTweens, function(tween) {
            tween.destroy();
        });
        var mouseoverLayer = this.mouseoverLayer;
        notes.each(function(noteNode) {
            noteNode.moveTo(mouseoverLayer);
            var color = noteNode.getAttr('color');
            noteNode.setAttrs({
                shadowBlur: 10,
                shadowEnabled: true,
                shadowColor: color,
                opacity: 1
            });
        });
        this.stage.draw();
    },

    _addNut: function(string, index, settings) {
        var rootNote = _.first(string.get('notes'));
        var rootNoteName = 'note-' + rootNote.get('name');
        var nutNoteColor = new Konva.Rect({
            x: 0,
            y: settings.stringHeight * index + settings.padding,
            width: settings.padding - settings.nutWidth,
            height: settings.stringHeight,
            fill: rootNote.get('color'),
            name: rootNoteName,
            opacity: 0.1
        });
        this.noteGroup.add(nutNoteColor);
        var nut = new Konva.Rect({
            x: settings.padding - settings.nutWidth,
            y: settings.stringHeight * index + settings.padding,
            width: settings.nutWidth,
            height: settings.stringHeight,
            fill: 'black'
        });
        this.fretGroup.add(nut);
    },

    _addNotes: function(string, index, settings) {
        for (var i = 1; i <= string.get('frets'); i++) {
            var distanceFromNut = this.collection.settings.fretDistanceMap[i];
            var fret = new Konva.Rect({
                x: (settings.padding + distanceFromNut.distance) - settings.fretWidth,
                y: settings.stringHeight * index + settings.padding,
                width: settings.fretWidth,
                height: settings.stringHeight,
                fill: 'silver'
            });
            this.fretGroup.add(fret);
            var color = new Konva.Rect({
                x: (settings.padding + distanceFromNut.distance) - distanceFromNut.width,
                y: settings.stringHeight * index + settings.padding,
                width: distanceFromNut.width - settings.fretWidth,
                height: settings.stringHeight,
                fill: string.get('notes')[i].get('color'),
                name: 'note-' + string.get('notes')[i].get('name'),
                opacity: 0.1
            });
            this.noteGroup.add(color);
        }
    },

    _addStrings: function(string, index, settings) {
        var stringOverNut = new Konva.Rect({
            x: 0,
            y: (settings.stringHeight / 2) - (settings.fretWidth / 2) + (settings.stringHeight * index) + settings.padding,
            width: settings.padding,
            height: settings.fretWidth,
            fill: string.get('notes')[0].get('color'),
            name: 'note-' + string.get('notes')[0].get('name')
        });
        this.stringGroup.add(stringOverNut);
        var string = new Konva.Rect({
            x: settings.padding,
            y: (settings.stringHeight / 2) - (settings.fretWidth / 2) + (settings.stringHeight * index) + settings.padding,
            width: this.collection.settings.displayWidth,
            height: settings.fretWidth,
            fill: 'black'
        });
        this.stringGroup.add(string);
    },

    _addToGroup: function() {
        this.fretGroup = new Konva.Group();
        this.noteGroup = new Konva.Group();
        this.stringGroup = new Konva.Group();
        var settings = this.collection.settings;

        this.collection.each(function(string, index) {
            this._addNut(string, index, settings);
            this._addNotes(string, index, settings);
            this._addStrings(string, index, settings);
        }, this);
        this.group.add(this.fretGroup);
        this.group.add(this.noteGroup);
        this.group.add(this.stringGroup);
    },

    onDestroy: function() {
        this.fretGroup.destroyChildren();
        this.noteGroup.destroyChildren();
        this.stringGroup.destroyChildren();

        Bus.Event.off('note:highlighted', this._highlightSelectedNotes, this);
        Bus.Event.off('note:unhighlighted', this._unhighlightNotes, this);
        Bus.Event.off('change:mode', this._changeMode, this);

    }
}); 