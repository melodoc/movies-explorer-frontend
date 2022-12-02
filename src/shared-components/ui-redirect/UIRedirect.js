import { Link } from 'react-router-dom';

import './UIRedirect.css';

export function UIRedirect({ label, redirectLabel, link }) {
  return (
    <div className="redirect-link__container">
      <p className="redirect-link__text">{label ?? ''}</p>
      <Link className="redirect-link__link" to={link}>
        {redirectLabel ?? '-'}
      </Link>
    </div>
  );
}
