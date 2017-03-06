const fs = require('fs')

const FRET_NUMBER_PATTERN = /\d+/g
const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

// E4, B3, G3, D3, A2, E2
// e.g. E4 = (12 * 4) + 4 = 40
const DEFAULT_TUNING = [40, 35, 31, 26, 21, 16];

const getNote = (stringTuning, fretNumber) => {
  const note = NOTES[(stringTuning + fretNumber) % NOTES.length]
  const octave = Math.floor((stringTuning + fretNumber) / NOTES.length) + 1
  return `${note}${octave}`
}

const extractNotesFromLine = (line, index) => {
  const notes = []
  let fretNumber
  while (fretNumber = FRET_NUMBER_PATTERN.exec(line)) {
    notes.push({
      name: getNote(DEFAULT_TUNING[index], Number(fretNumber[0])),
      pos: fretNumber.index,
    })
  }
  return notes
}

const getLinesFromFile = path => fs.readFileSync(path, 'utf-8').split('\n')

console.log(
  getLinesFromFile('./bonusInput.txt')
    .reduce((notes, line, lineIndex) => notes.concat(extractNotesFromLine(line, lineIndex)), [])
    .sort((a, b) => a.pos - b.pos)
    .map(n => n.name)
    .join(' ')
)
