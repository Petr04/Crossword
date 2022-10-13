import iterateWord from './iterateWord'

export default function getIntersectedWords(word, cellWords) {
  return Array.from(iterateWord(word))
    .map(([x, y]) => cellWords[x][y])
    .filter(words => words.length > 1)
    .map(words => words.find(w => w.orientation !== word.orientation))
}
