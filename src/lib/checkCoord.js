function checkCoord(coord, cellWords) {
  return Boolean((cellWords[coord[0]] || [])[coord[1]])
}

export default checkCoord
