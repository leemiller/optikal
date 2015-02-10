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
        this.collection.each(function(pitch, index) {
            this._addWedge(pitch, index);
            this._addLabel(pitch, index);
        }, this);
        this.group.add(this.wedgeGroup);
        this.group.add(this.labelGroup);
    },

    _addLabel: function(pitch, index) {
        var startRot = -90;
        var rotation = startRot + (eachSectionDegrees * index);
        var pos = this.getPositionFromAngle(250, 250, rotation, 200);
        var label = new Konva.Text({
            x: pos.x,
            y: pos.y,
            text: pitch.get('note'),
            id: 'label-' + pitch.get('note'),
            fontSize: 24,
            fill: 'black'
        });
        label.setOffset({
            x: label.getWidth() / 2,
            y: label.getHeight() / 2
        });
        this.labelGroup.add(label);
    },

    _addWedge: function(pitch, index) {
        var rotation = startRotation + (eachSectionDegrees * index);
        var wedge = new Konva.Wedge({
            x: 250,
            y: 250,
            radius: 150,
            angle: eachSectionDegrees,
            name: 'note-wedge',
            id: 'note-' + pitch.get('note'),
            fill: pitch.get('color'),
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