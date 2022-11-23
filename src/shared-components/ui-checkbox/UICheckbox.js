import './UICheckbox.css';

export function UICheckbox({ onSubmit, label }) {
  return (
    <div className="checkbox__wrapper">
      <div className="checkbox">
        <input
          className="checkbox__input"
          type="checkbox"
          id="custom-checkbox"
          tabIndex="1"
        />
        <label className="checkbox__label" htmlFor="custom-checkbox">
          {label ?? ''}
        </label>
      </div>
      <span className="checkbox__text">{label ?? ''}</span>
    </div>
  );
}
