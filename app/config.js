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
        Acoustic: [0, 2, 4, 5, 6, 7, 9, 10],
        'Natural Minor': [0, 2,3, 5, 7, 8, 10],
        Algerian: [0, 2, 3, 6, 7, 8, 11],
        Altered: [0, 1, 3, 4, 6, 8, 10],
        Augmented: [0, 3, 4, 7, 9, 11],
        'Bebop Dominant': [0, 2, 4, 5, 7, 9, 10, 11],
        Blues: [0, 3, 5, 6, 7, 10],
        Chromatic: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        'Double Harmonic': [0, 1, 4, 5, 7, 8, 11],
        Enigmatic: [0, 1, 4, 6, 8, 10, 11],
        Gypsy: [0, 2, 3, 6, 7, 8, 10],
        'Half Diminshed': [0, 2, 3, 5, 6, 8, 10],
        'Harmonic Major': [0, 2, 4, 5, 7, 8, 11],
        'Harmonc Minor': [0, 2, 3, 5, 7, 8, 11],
        Hirjoshi: [0, 2, 3, 7, 8],
        'Hungarian Minor': [0, 2, 3, 6, 7, 8, 11],
        Insen: [0, 1, 5, 7, 10],
        Major: [0, 2, 4, 5, 7, 9, 11],
        Istrian: [0, 1, 3, 4, 6, 7],
        Iwato: [0, 1, 10, 5, 6],
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
        },
        Uke: {
            type: 'fretted-string',
            frets: 17,
            strings: ['G', 'C', 'A', 'E'],
            lengthPerFret: 60,
            stringHeight: 30,
            padding: 30,
            nutWidth: 10,
            fretWidth: 5,
            fretMarkers: [5, 7, 10, 12, 15],
            fretboardColor: '#f2e9cc'
        }
    }
};