const fs = require('fs');

const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const getNoteForKey = (key, fretNumber) =>
  NOTES[(NOTES.indexOf(key) + fretNumber) % NOTES.length];

const FRET_NUMBER_PATTERN = /\d+/g;
const extractNotesFromLine = line => {
  const key = line.charAt(0);
  const notes = [];
  let fretNumber;
  while (fretNumber = FRET_NUMBER_PATTERN.exec(line)) {
    notes.push({
      name: getNoteForKey(key, Number(fretNumber[0])),
      index: fretNumber.index,
    });
  }
  return notes;
};

const getLinesFromFile = path => fs.readFileSync(path, 'utf-8').split('\n');

console.log(
  getLinesFromFile('./input2.txt')
    .reduce((notes, line) => notes.concat(extractNotesFromLine(line)), [])
    .sort((a, b) => a.index - b.index)
    .map(n => n.name)
    .join(' ')
);
