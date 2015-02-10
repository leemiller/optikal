module.exports = {
    defaultTonic: 'C',
    allPitches: ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'],
    defaultMode: 'Ionian',
    allModes: {
        Ionian: [0, 2, 4, 5, 7, 9, 11],
        Dorian: [0, 2, 3, 5, 7, 9, 10],
        Phrygian: [0, 1, 3, 5, 7, 8, 10],
        Lydian: [0, 2, 4, 6, 7, 9, 11],
        Mixolydian: [0, 2, 4, 5, 7, 9, 10],
        Aeolian: [0, 2, 3, 5, 7, 8, 10],
        Locrian: [0, 1, 3, 5, 6, 8, 10],
        'Iwato Scale': [0, 1, 10, 5, 6],
        'Major Pentatonic Scale': [0, 9, 2, 4, 7]
    }  
};