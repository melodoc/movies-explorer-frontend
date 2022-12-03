const MIN_LENGTH = 3;

export class ValidationHelper {
  static isWord(word) {
    return !(!word || word.length <= MIN_LENGTH);
  }
}
