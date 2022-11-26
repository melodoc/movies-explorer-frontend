import './UISubmit.css';

export function UISubmit({ label, name, link }) {
  return (
    <input
      className="form__submit"
      type="submit"
      id="submit"
      name={name}
      value={label}
    />
  );
}
