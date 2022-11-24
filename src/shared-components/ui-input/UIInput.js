import { INPUT_TYPES } from '../../constants/inputTypes';

import './UIInput.css';

export function UIInput({ label, type, value, required, handleChange }) {
  return (
    <div class="field__container">
      <label class="field__label" htmlFor={label}>
        {label}
      </label>
      <input
        class="field__input"
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
