exports.hello = function(){
  return 'Hello World!!!';
}

/*var can = document.getElementById('canvas1');
var ctx = can.getContext('2d');
var semiTones = [
    {note: 'C', color: 'ff0000'},
    {note: 'C#', color: 'ff6600'},
    {note: 'D', color:'ff9400'},
    {note: 'D#', color: 'ffc500'},
    {note: 'E', color: 'ffff00'},
    {note: 'F', color: '8cc700'},
    {note: 'F#', color: '0fad00'},
    {note: 'G', color: '00a3c7'},
    {note: 'G#', color: '0064b5'},
    {note: 'A', color: '0010a5'},
    {note: 'A#', color: '6300a5'},
    {note: 'B', color: 'c5007c'}
];

var rootNote = 'F';
var rootIndex;
var notes = [];
for (var i = 0; i < semiTones.length; i++) {
    var semiTone = semiTones[i];
    if (semiTone.note === rootNote) {
        rootIndex = i;
    }
    notes.push({
        note: semiTone.note,
        color: semiTone.color
    });
}

var n = notes.splice(rootIndex, notes.length - rootIndex);
n = n.concat(notes);

console.log(n);

var fullCircle = 2 * Math.PI;
var eachSectionSize = fullCircle/12;
var startPosition = (1.5 * Math.PI) - (eachSectionSize/2);
var center = {
    x: 250,
    y: 250
};
var currentPosition = startPosition;
var color;
for (var i = 0; i< n.length; i++ ) {
    color = n[i].color;
    ctx.fillStyle = '#' + color;
    ctx.beginPath();
    ctx.moveTo(center.x, center.y);
    ctx.arc(center.x, center.y, 150, currentPosition, currentPosition + eachSectionSize);
    ctx.lineTo(center.x, center.y);
    ctx.closePath();
    ctx.fill();
    currentPosition += eachSectionSize
}

ctx.fillStyle = 'black';
ctx.beginPath();
ctx.moveTo(center.x, center.y);
ctx.lineTo(center.x+150, center.y);
ctx.closePath();
ctx.stroke();

*/