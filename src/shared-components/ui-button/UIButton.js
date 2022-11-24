import { Link } from 'react-router-dom';

import './UIButton.css';

export function UIButton({ label, link, handleClick }) {
  return (
    <li>
      <Link
        className="button"
        to={link}
        onClick={handleClick}
      >
        {label ?? "Ok"}
      </Link>
    </li>
  );
}
