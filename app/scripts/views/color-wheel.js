var Semitones = require('../collections/semitones');

var eachSectionDegrees = 360 / 12;
var startRotation = -90 - (eachSectionDegrees / 2);

var group;
var labelGroup;
var tween;

module.exports = Backbone.KonvaView.extend({
    initialize: function(options) {
        options = options || {};
        this.baseLayer = options.baseLayer;
        this.mouseoverLayer = options.mouseoverLayer;
        this.stage = options.stage;
        this.semitones = options.semitones;
        this.options = options;
        this.addWedges();
        this.render();
    },

    el: function() {
        group = new Konva.Group();
        labelGroup = new Konva.Group();    

        return group;
    },

    addWedges: function() {
        this.semitones.each(function(semitone, index) {
            this._addWedge(semitone, index);
            this._addLabel(semitone, index);
        }, this);
        this.delegateEvents();
    },

    _addLabel: function(semitone, index) {
        var startRot = -90;
        var rotation = startRot + (eachSectionDegrees * index);
        var pos = this.getAngle(250, 250, rotation, 200);
        var label = new Konva.Text({
            x: pos.x,
            y: pos.y,
            text: semitone.get('note'),
            id: 'label-' + semitone.get('note'),
            fontSize: 24,
            fill: 'black'
        });
        label.setOffset({
            x: label.getWidth() / 2,
            y: label.getHeight() / 2
        });
        labelGroup.add(label);
    },

    _addWedge: function(semitone, index) {
        var rotation = startRotation + (eachSectionDegrees * index);
        var wedge = new Konva.Wedge({
            x: 250,
            y: 250,
            radius: 150,
            angle: eachSectionDegrees,
            name: 'note-wedge',
            id: 'note-' + semitone.get('note'),
            fill: semitone.get('color'),
            rotation: rotation,
            startRotation: rotation,
            scale: {
                x: 1,
                y: 1
            },
            startScale: 1
        });
        group.add(wedge);
    },

    getAngle: function(x, y, angle, length) {
        var radians = angle * (Math.PI / 180);
        return { 
            x: x + length * Math.cos(radians), 
            y: y + length * Math.sin(radians) 
        };
    },

    events: {
        'mouseover .note-wedge': function(e) {
            var wedge = e.target;

            wedge.moveTo(this.mouseoverLayer);
            
            var scale = 1.15;
            var newAngle = eachSectionDegrees * scale;
            var newRotation = wedge.getAttr('startRotation') - ((eachSectionDegrees * scale) / 2) + (eachSectionDegrees /2)
 
            tween = new Konva.Tween({
                node: wedge,
                duration: 0.5,
                easing: Konva.Easings.ElasticEaseOut,
                scaleX: scale,
                scaleY: scale,
                angle: newAngle,
                rotation: newRotation
            });
            tween.play();
            this.stage.draw();
        },
        'mouseout .note-wedge': function(e) {
            var wedge = e.target;
            this.resetWedge(wedge);
        }
    },

    resetWedge: function(wedge) {
        wedge.moveTo(this.baseLayer);
        if(tween) {
            tween.pause();
        }

        wedge.setAttrs({
            scaleY: 1,
            scaleX: 1,
            angle: eachSectionDegrees,
            rotation: wedge.getAttr('startRotation')
        });
        this.stage.draw();
    },

    render: function() {
        this.baseLayer.add(this.el);
        this.baseLayer.add(labelGroup);
        this.stage.draw();
    },

    destroy: function() {
        this.undelegateEvents();
        group.destroyChildren();
        group.destroy();
        this.baseLayer.destroy();
        this.mouseoverLayer.destroy();
    }
}); 