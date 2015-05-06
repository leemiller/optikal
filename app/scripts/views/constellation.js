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