import './UISubmit.css';

export function UISubmit({ label, name }) {
  return (
    <input
      class="login__submit"
      type="submit"
      id="submit"
      name={name}
      value={label}
    />
  );
}
