import { useRef, useState } from 'react';
import { INPUT_TYPES } from '../../constants/inputTypes';

import './UIInput.css';

export function UIInput({ label, type, value, required, handleChange }) {
  const input = useRef(null);
  const [inputState, setInputState] = useState({
    valid: true,
    text: ''
  });

  const checkValidation = () => {
    handleChange && handleChange();
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
