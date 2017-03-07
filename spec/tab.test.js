import processTab from '../src/tab.js'

test('corretly processes input1', () => {
  expect(processTab('spec/fixtures/input1.txt')).toBe(
    'B2 A2 G2 A2 B2 B2 B2 A2 A2 A2 B2 D3 D3',
  )
})

test('corretly processes input2', () => {
  expect(processTab('spec/fixtures/input2.txt')).toBe(
    'D4 D4 D4 B3 A3 D4 D4 D4 B3 A3 G#3 G#3 G#3 B3 D4 G#3 G#3 G#3 B3 D4',
  )
})

test('corretly processes bonus', () => {
  expect(processTab('spec/fixtures/bonusInput.txt')).toBe(
    'E2 E3 E3 E4 C4 A3 A2',
  )
})
