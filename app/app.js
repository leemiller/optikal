var colorWheel = require('scripts/views/color-wheel');
var stage = new Konva.Stage({
    container: 'color-wheel-container',
    width: 500,
    height: 500
});
var baseLayer = new Konva.Layer();
var mouseoverLayer = new Konva.Layer();
stage.add(baseLayer, mouseoverLayer);
var cTonicTones = new require('scripts/collections/semitones')();
var wheel = new colorWheel({
    stage: stage,
    baseLayer:baseLayer,
    mouseoverLayer: mouseoverLayer, 
    semitones: cTonicTones
});