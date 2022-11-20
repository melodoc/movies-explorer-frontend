import './UIButton.css';

export function UIButton({ label, link, handleClick }) {
  return (
    <li>
      <a
        className="button"
        href={link}
        onClick={handleClick}
      >
        {label ?? "Ok"}
      </a>
    </li>
  );
}
