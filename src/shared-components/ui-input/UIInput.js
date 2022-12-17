import { useRef, useState } from 'react';
import { INPUT_TYPES } from '../../constants/inputTypes';

import './UIInput.css';

export function UIInput({ label, type, value, required, handleChange, pattern, errorText, minLength }) {
  const input = useRef(null);
  const [field, setField] = useState(true);

  const handleInputField = (e) => {
    handleChange(e);
    if (!e.target.validity.valid) {
      setField(undefined);
    } else if (e.target.value.match(pattern) != null) {
      setField(e.target.value);
    } else {
      setField(undefined);
    }
  };

  return (
    <div className="field__container">
      <label className="field__label" htmlFor={label}>
        {label}
      </label>
      <input
        value={value}
        className={`field__input`}
        onChange={handleInputField}
        type={type}
        id={label}
        placeholder={label}
        autoComplete="off"
        name={label}
        required={required}
        minLength={minLength ?? 2}
        maxLength={type === INPUT_TYPES.Email ? 200 : 40}
        ref={input}
        pattern={pattern}
      />
      {!field && <p className="field__valid-text">{errorText}</p>}
    </div>
  );
}
