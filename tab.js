const fs = require('fs');

const FRET_NUMBER_PATTERN = /\d+/g;
const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const getNote = (stringTuning, fretNumber) =>
  NOTES[(NOTES.indexOf(stringTuning) + fretNumber) % NOTES.length];

const extractNotesFromLine = line => {
  const notes = [];
  let fretNumber;
  while (fretNumber = FRET_NUMBER_PATTERN.exec(line)) {
    notes.push({
      name: getNote(line.charAt(0), Number(fretNumber[0])),
      pos: fretNumber.index,
    });
  }
  return notes;
};

const getLinesFromFile = path => fs.readFileSync(path, 'utf-8').split('\n');

console.log(
  getLinesFromFile('./input2.txt')
    .reduce((notes, line) => notes.concat(extractNotesFromLine(line)), [])
    .sort((a, b) => a.pos - b.pos)
    .map(n => n.name)
    .join(' ')
);
