/**
 * Provides methods for generating random strings from a variety of character sets
 */
export class RandomStringGenerator {
  private readonly letters = 'abcdefghijklmdanopqrstuvwxyzABCDEFGHIJKLMOPQRSTUVXYZ';
  private readonly numbers = '0123456789';
  private readonly specialCharacters = '!^"$%&()=?`´}';

  constructor(public defaultLength = 7) {}

  /**
   * Returns a randomly generated string
   *
   * Character range: [a-zA-Z0-9]
   *
   * @param length The length of the returned string, defaults to defaultLength
   */
  generate(length = this.defaultLength) {
    const alphabet = this.letters + this.numbers;

    let result = '';
    for (let i = 0; i < length; i++) {
      result += alphabet[Math.floor(Math.random() * alphabet.length)];
    }

    return result;
  }

  /**
   * Returns a randomly generated string of letters
   *
   * Character range: [a-zA-Z]
   *
   * @param length The length of the returned string, defaults to defaultLength
   */
  generateLetters(length = this.defaultLength) {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += this.letters[Math.floor(Math.random() * this.letters.length)];
    }

    return result;
  }

  /**
   * Returns a randomly generated string of numbers

   * Character range: [0-9]
   *
   * @param length The length of the returned string, defaults to defaultLength
   */
  generateNumbers(length = this.defaultLength) {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += this.numbers[Math.floor(Math.random() * this.numbers.length)];
    }

    return result;
  }

  /**
   * Returns a randomly generated string of numbers
   *
   * Character range: !^"$%&()=?`´}
   *
   * @param length The length of the returned string, defaults to defaultLength
   */
  generateSpecialCharacters(length = this.defaultLength) {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += this.specialCharacters[Math.floor(Math.random() * this.specialCharacters.length)];
    }

    return result;
  }
}
