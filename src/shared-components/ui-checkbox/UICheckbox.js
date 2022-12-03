import { useRef } from 'react';
import './UICheckbox.css';

export function UICheckbox({ onSubmit, label }) {
  const input = useRef(null);

  const handleOnChange = () => {
    onSubmit(input.current.checked)
  };

  return (
    <div className="checkbox__container">
      <div className="checkbox">
        <input
          ref={input}
          className="checkbox__input"
          type="checkbox"
          id="custom-checkbox"
          tabIndex="1"
          onChange={handleOnChange}
        />
        <label className="checkbox__label" htmlFor="custom-checkbox">
          {label ?? ''}
        </label>
      </div>
      <span className="checkbox__text">{label ?? ''}</span>
    </div>
  );
}
