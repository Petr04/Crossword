export default function *iterateWord(word) {
  const coord = {
    x: word.startx,
    y: word.starty,
  }

  const axis = {
    across: 'x',
    down: 'y'
  }[word.orientation]

  for (let i = 0; i < word.length; i++) {
    const newCoord = Object.values({...coord, [axis]: coord[axis]+Number(i)})
    yield newCoord
  }
}
