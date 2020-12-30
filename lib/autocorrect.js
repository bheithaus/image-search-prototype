import dictionary from './words_dictionary.json'

const dictionaryCategorizedByWordLength = {}

// TODO assure that this work is cached & not rerun on every request
for (const word in dictionary) {
  if (!dictionaryCategorizedByWordLength[word.length]) {
    dictionaryCategorizedByWordLength[word.length] = []
  }

  dictionaryCategorizedByWordLength[word.length].push(word)
}

const VOWELS = ['a', 'e', 'i', 'o', 'u', 'y']
const OTHER_VOWELS = {
  a: ['e', 'i', 'o', 'u', 'y'],
  e: ['a', 'i', 'o', 'u', 'y'],
  i: ['a', 'e', 'o', 'u', 'y'],
  o: ['a', 'e', 'i', 'u', 'y'],
  u: ['a', 'e', 'i', 'o', 'y'],
  y: ['a', 'e', 'i', 'o', 'u']
}

/**
 * verify that a word exists in the dictionary
 * @param  {string} word
 * @return {[type]}      [description]
 */
function verifyWord(word) {
  console.log('possibility count', dictionaryCategorizedByWordLength[word.length].length)

  return dictionaryCategorizedByWordLength[word.length].includes(word)
}

/** give a list of all possible edits with vowels swapped out */
function possibleVowelCorrections(word, startIndex = 0) {
  const edits = []
  let char

  for (let i = startIndex; i < word.length; i++) {
    char = word[i]

    // console.log('is a vowel? ', i, char)
    // is character a vowel?
    if (VOWELS.includes(char)) {
      // go through other vowel possibilities and create a new string for each one
      OTHER_VOWELS[char].forEach((vowelOption) => {
        const edit = word.substring(0, i) + vowelOption + word.substring(i + 1)

        // add all other combinations of vowel subsitutions with this edit
        edits.push(...possibleVowelCorrections(edit, i+1))

        edits.push(edit)
      })
    }
  }

  return edits
}

/**
 * a very basic brute-force vowel replacement autocorrect
 *
 * this is set up to work with American English ONLY
 *
 * @param  {string} word    an input word, possibly mis-spelled
 * @return {string}      a word from the dictionary that resembles the input
 */
export default function autocorrect (input) {
  const word = input.toLowerCase().replace(/[^a-z]/gi, '')
  const attemptedCorrections = {}

  console.log('cleaned word', word)

  if (verifyWord(word)) {
    return word
  }

  // input is not a word
  // --> cast input into a word by replacing vowels
  let attempts = possibleVowelCorrections(word)

  console.log('possible words to try', attempts)

  for (var i = 0; i < attempts.length - 1; i++) {
    if (verifyWord(attempts[i])) {
      return attempts[i]
    }
  }

  throw 'No possible rudimentary autocorrection found!'
}
