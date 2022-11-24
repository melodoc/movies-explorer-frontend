import './UISubmit.css';

export function UISubmit({ label, name }) {
  return (
    <input
      class="form__submit"
      type="submit"
      id="submit"
      name={name}
      value={label}
    />
  );
}
