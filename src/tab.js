// @flow
import fs from 'fs'

/*
  The default tuning for E4 is (NOTES.length * 4) + NOTES.indexOf('E')
  E4 = (12 * 4) + 4  = 52
  B3 = (12 * 3) + 11 = 47
  G3 = (12 * 3) + 7  = 43
  D3 = (12 * 3) + 2  = 38
  A2 = (12 * 2) + 9  = 33
  E2 = (12 * 2) + 4  = 28
*/
const DEFAULT_TUNING = [52, 47, 43, 38, 33, 28]
const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
const FRET_NUMBER_PATTERN = /\d+/g

const getNote = (stringTuning: number, fretNumber: number): string => {
  const note = NOTES[(stringTuning + fretNumber) % NOTES.length]
  const octave = Math.floor((stringTuning + fretNumber) / NOTES.length)
  return `${note}${octave}`
}

type Note = {name: string, pos: number}
const extractNotesFromLine = (line: string, index: number): Array<Note> => {
  const notes: Array<Note> = []
  let fretNumber
  while (fretNumber = FRET_NUMBER_PATTERN.exec(line)) {
    notes.push({
      name: getNote(DEFAULT_TUNING[index], Number(fretNumber[0])),
      pos: fretNumber.index,
    })
  }
  return notes
}

const getLinesFromFile = (path: string): Array<string> =>
  fs.readFileSync(path, 'utf-8').split('\n')

export default (filePath: string): string =>
  getLinesFromFile(filePath)
    .reduce(
      (notes, line, lineIndex) =>
        notes.concat(extractNotesFromLine(line, lineIndex)),
      [],
    )
    .sort((a, b) => a.pos - b.pos)
    .map(n => n.name)
    .join(' ')
