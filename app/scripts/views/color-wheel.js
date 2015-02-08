var Semitones = require('../collections/semitones');

var eachSectionDegrees = 360 / 12;
var startRotation = -90 - (eachSectionDegrees / 2);

var group;
var tween;

module.exports = Backbone.KonvaView.extend({
    initialize: function(options) {
        options = options || {};
        this.baseLayer = options.baseLayer;
        this.mouseoverLayer = options.mouseoverLayer;
        this.stage = options.stage;
        this.options = options;
        this.addWedges();
        this.render();
    },

    el: function() {
        if (_.isUndefined(group)){
            group = new Konva.Group();    
        }

        return group;
    },

    addWedges: function() {
        this.options.semitones.each(function(semitones, index) {
            var rotation = startRotation + (eachSectionDegrees * (index));
            var wedge = new Konva.Wedge({
                x: 250,
                y: 250,
                radius: 150,
                angle: eachSectionDegrees,
                name: 'note-wedge',
                fill: semitones.get('color'),
                rotation: rotation,
                startRotation: rotation,
                scale: {
                    x: 1,
                    y: 1
                },
                startScale: 1
            });
            group.add(wedge);
        }, this);
        this.delegateEvents();
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
        }
    },

    render: function() {
        this.baseLayer.add(this.el);
        this.baseLayer.draw();
    },

    destroy: function() {
        group.destroyChildren();
        group.destroy();
        this.baseLayer.destroy();
        this.mouseoverLayer.destroy();
    }
}); 