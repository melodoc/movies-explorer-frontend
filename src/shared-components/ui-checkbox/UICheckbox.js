import './UICheckbox.css';

export function UICheckbox({ onSubmit, label }) {
  return (
    <div class="checkbox__wrapper">
      <div class="checkbox">
        <input
          class="checkbox__input"
          type="checkbox"
          id="custom-checkbox"
          tabIndex="1"
        />
        <label class="checkbox__label" for="custom-checkbox">
          {label ?? ''}
        </label>
      </div>
      <span class="checkbox__text">{label ?? ''}</span>
    </div>
  );
}
