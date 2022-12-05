export class ValidationHelper {
  static isWord(word) {
    return !!word;
  }

  static get validationMessage() {
    return new Map([
      [true, { valid: true, text: '' }],
      [false, { valid: false, text: 'Введите 2 - 30 символов: только латиницу, кириллицу, пробел или дефис.' }]
    ]);
  }

  static get validationPattern() {
    return '^[sA-Za-z А-Яа-яёЁ-]{2,30}$';
  }
}
