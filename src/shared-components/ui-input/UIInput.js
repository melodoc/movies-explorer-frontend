import { useRef, useState } from 'react';
import { INPUT_TYPES } from '../../constants/inputTypes';

import './UIInput.css';

const VALIDATION_PATTERN = '^[sA-Za-z А-Яа-яёЁ-]{2,30}$';

const VALIDATION_MESSAGE = new Map([
  [true, { valid: true, text: '' }],
  [false, { valid: false, text: 'Введите 2 - 30 символов: только латиницу, кириллицу, пробел или дефис.' }]
]);

export function UIInput({ label, type, value, required, handleChange }) {
  const input = useRef(null);
  const [inputState, setInputState] = useState(VALIDATION_MESSAGE.get(true));

  const checkValidation = (e) => {
    handleChange && handleChange(e);

    if (type === INPUT_TYPES.Name) {
      setInputState(VALIDATION_MESSAGE.get(!!input.current.value.match(VALIDATION_PATTERN)?.input))
      return;
    }

    setInputState({
      valid: input.current.validity.valid,
      text: input.current.validationMessage
    });
  };

  return (
    <div className="field__container">
      <label className="field__label" htmlFor={label}>
        {label}
      </label>
      <input
        value={value}
        className="field__input"
        onChange={checkValidation}
        type={type}
        id={label}
        placeholder={label}
        autoComplete="off"
        name={label}
        required={required}
        minLength={2}
        maxLength={type === INPUT_TYPES.Email ? 200 : 40}
        ref={input}
      />
      {!inputState.valid && <p className="field__valid-text">{inputState.text}</p>}
    </div>
  );
}
