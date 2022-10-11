import choose from '../lib/choose'

class CrosswordAPI {
  static async checkWord(wordValue, /* args */) {
    return new Promise((resolve) =>
      resolve(Array.from(wordValue).every(Boolean)
        ? choose(['correct', 'wrong'])
        : null
      )
    )
  }
}

export default CrosswordAPI
