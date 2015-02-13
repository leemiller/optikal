var Notes = require('scripts/collections/notes');
var notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
var allChromaticScales = {};
_.each(notes, function(tonic) {
    allChromaticScales[tonic] = new Notes(tonic);
});

module.exports = {
    notes: notes,
    chromaticScales: allChromaticScales,
    scales: {
        Ionian: [0, 2, 4, 5, 7, 9, 11],
        Dorian: [0, 2, 3, 5, 7, 9, 10],
        Phrygian: [0, 1, 3, 5, 7, 8, 10],
        Lydian: [0, 2, 4, 6, 7, 9, 11],
        Mixolydian: [0, 2, 4, 5, 7, 9, 10],
        Aeolian: [0, 2, 3, 5, 7, 8, 10],
        Locrian: [0, 1, 3, 5, 6, 8, 10],
        'Iwato Scale': [0, 1, 10, 5, 6],
        'Major Pentatonic Scale': [0, 9, 2, 4, 7]
    },
    instruments: {
        Bass: {
            type: 'fretted-string',
            frets: 20,
            strings: ['G', 'D', 'A', 'E'],
            lengthPerFret: 60,
            stringHeight: 40,
            padding: 40,
            nutWidth: 15,
            fretWidth: 6,
            fretMarkers: [1, 3, 5, 7, 9, 12, 15, 17, 19],
            fretboardColor: '#f2e9cc'
        },
        Guitar: {
            type: 'fretted-string',
            frets: 22,
            strings: ['E', 'B', 'G', 'D', 'A', 'E'],
            lengthPerFret: 50,
            stringHeight: 25,
            padding: 30,
            nutWidth: 15,
            fretWidth: 4,
            fretMarkers: [3, 5, 7, 9, 12, 15, 17, 19, 21],
            fretboardColor: '#f2e9cc'
        }
    }
};