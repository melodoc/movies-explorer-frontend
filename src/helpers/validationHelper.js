import { INPUT_TYPES } from '../constants/inputTypes';

const NAME_TEXT = 'Введите 2 - 30 символов: только латиницу, кириллицу, пробел или дефис';

export class ValidationHelper {
  static isWord(word) {
    return !!word;
  }

  static get validationNameMessage() {
    return new Map([
      [true, { valid: true, text: '' }],
      [false, { valid: false, text: NAME_TEXT }]
    ]);
  }

  static get namePattern() {
    return '[A-Za-z А-Яа-яёЁ\-]{2,30}';
  }

  static get passwordPattern() {
    return '.{6,}';
  }

  static get validationNameMessages() {
    return new Map([
      [INPUT_TYPES.Email, 'Введите валидный email'],
      [INPUT_TYPES.Name, NAME_TEXT],
      [INPUT_TYPES.Password, 'Введите валидный пароль. Минимум 6 символов ']
    ]);
  }

  static get validationEqualMessages() {
    return new Map([
      [INPUT_TYPES.Email, 'Введите email (или имя) отличные от текущего'],
      [INPUT_TYPES.Name, 'Введите имя (или email) отличные от текущего']
    ]);
  }
}
