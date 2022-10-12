import { generateLayout } from 'crossword-layout-generator'

class CrosswordAPI {
  static async getCrossword(/* args */) {
    // Returns sample crossword.
    // Replace code below with server interaction.

    const exampleInput = [
      { clue: 'Что ты читаешь на уроке?', answer: 'учебник' },
      { clue: 'Куда ты записываешь, что задали?', answer: 'дневник' },
      { clue: 'В чём ты делаешь уроки?', answer: 'тетрадь' },
      { clue: 'Чем ты пишешь?', answer: 'ручка' },
      { clue: 'Чем ты рисуешь?', answer: 'карандаш' },
      { clue: 'Где ты хранишь ручки и карандаши?', answer: 'пенал' },

      // { clue: '', answer: 'abc' },
      // { clue: '', answer: 'ade' },
      // { clue: '', answer: 'ert' },
    ]

    const layout = generateLayout(exampleInput)

    return {
      cols: layout.cols,
      rows: layout.rows,
      result: layout.result.map(word => ({
        startx: word.startx-1,
        starty: word.starty-1,
        clue: word.clue,
        length: word.answer.length,
        position: word.position,
        orientation: word.orientation,
      }))
    }
  }

  static async checkWord(wordValue, /* args */) {
    // Returns sample status.
    // Replace code below with server interaction.
    // status = null (default) | 'correct' | 'wrong'
    return Array.from(wordValue).every(Boolean) ? 'correct' : null
  }
}

export default CrosswordAPI
