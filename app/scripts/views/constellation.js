var eachSectionDegrees = 360 / 12;
var startRotation = -90;

var KonvaView = require('./konva');

module.exports = KonvaView.extend({
    initialize: function(options) {
        options = options || {};
        this.baseLayer = options.baseLayer;
        this.stage = options.stage;
        this.options = options;
        
        this.render();
    },

    _addToGroup: function() {
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
        this.group.add(arrow);
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
        this.baseLayer.destroy();
    }
}); 