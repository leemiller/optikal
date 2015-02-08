var eachSectionDegrees = 360 / 12;
var startRotation = -90;

var group;

module.exports = Backbone.KonvaView.extend({
    endPoints: null,

    initialize: function(options) {
        options = options || {};
        this.layer = options.layer;
        this.stage = options.stage;
        this.options = options;
        this.endPoints = _.map(this.options.pitches, function(step) {
            var rotation = startRotation + (eachSectionDegrees * step);
            var endPoint = this.getAngle(250, 250, rotation, 175);
            return endPoint;
        }, this);

        this.addLines();
        this.render();
    },

    addLines: function() {
        var nonTonicPoints = _.rest(this.endPoints);
        _.each(nonTonicPoints, function(endPoint) {
            var line = new Konva.Line({
                points: [250, 250, endPoint.x, endPoint.y],
                stroke: 'black',
                strokeWidth: 2
            });
            line.setListening(false);
            group.add(line);
        }, this);
        var tonicPoint = _.first(this.endPoints);
        var arrow = new Konva.Arrow({
            points: [250, 250, tonicPoint.x, tonicPoint.y],
            stroke: 'black',
            strokeWidth: 2,
            pointerLength: 12,
            pointerWidth: 8,
            radius: 10,
            fill: 'black'
        });

        arrow.setListening(false);
        group.add(arrow);
    },

    el: function() {
        group = new Konva.Group();  

        return group;
    },

    getAngle: function(x, y, angle, length) {
        var radians = angle * (Math.PI / 180);
        return { 
            x: x + length * Math.cos(radians), 
            y: y + length * Math.sin(radians) 
        };
    },

    render: function() {
        this.layer.add(this.el);
        this.stage.draw();
    },

    destroy: function() {
        this.undelegateEvents();
        group.destroyChildren();
        group.destroy();
        this.layer.destroy();
    }
}); 