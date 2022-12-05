import './UISubmit.css';

export function UISubmit({ label, name, link, handleClick, secondary, disabled }) {
  const inputClassName = `form__submit ${secondary ? `form__submit_type_secondary` : `form__submit_type_primary`}`;

  return (
    <input
      className={inputClassName}
      type="submit"
      id="submit"
      name={name}
      value={label}
      onClick={handleClick}
      disabled={disabled}
    />
  );
}
