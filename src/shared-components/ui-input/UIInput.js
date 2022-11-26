import { INPUT_TYPES } from '../../constants/inputTypes';

import './UIInput.css';

export function UIInput({ label, type, value, required, handleChange }) {
  return (
    <div className="field__container">
      <label className="field__label" htmlFor={label}>
        {label}
      </label>
      <input
        className="field__input"
        onChange={handleChange}
        type={type}
        id={label}
        placeholder={label}
        autoComplete="off"
        name={label}
        required={required}
        minLength={2}
        maxLength={type === INPUT_TYPES.Email ? 200 : 40}
      />
    </div>
  );
}
