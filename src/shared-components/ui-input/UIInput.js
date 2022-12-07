import { useRef, useState } from 'react';
import { INPUT_TYPES } from '../../constants/inputTypes';
import { ValidationHelper } from '../../helpers/validationHelper';

import './UIInput.css';

const VALIDATION_PATTERN = ValidationHelper.validationPattern;
const VALIDATION_MESSAGE = ValidationHelper.validationMessage;

export function UIInput({ label, type, value, required, handleChange }) {
  const input = useRef(null);
  const [inputState, setInputState] = useState(VALIDATION_MESSAGE.get(true));

  const checkValidation = (e) => {

    if (type === INPUT_TYPES.Name) {
      const validationState = getValidationState();
      setInputState(validationState);
      handleChange && handleChange(e, validationState.valid);
      return;
    }

    setInputState({
      valid: input.current.validity.valid,
      text: input.current.validationMessage
    });

    handleChange && handleChange(e, inputState.valid);
  };

  const getValidationState = () => {
    const validation = !!input.current.value.match(VALIDATION_PATTERN)?.input;
    return VALIDATION_MESSAGE.get(validation);
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
