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