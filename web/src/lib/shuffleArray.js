function shuffle (array) {
  var currentIndex = array.length
  var temporaryValue, randomIndex

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}

function shuffleArray (array) {
  const newArray = shuffle(array.slice())
  return newArray
}

module.exports = shuffleArray