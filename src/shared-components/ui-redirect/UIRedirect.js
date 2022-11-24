import { Link } from 'react-router-dom';

import './UIRedirect.css';

export function UIRedirect({ label, redirectLabel, link }) {
  return (
    <div class="link__container">
      <p class="link__text">{label ?? ''}</p>
      <Link class="link__redirect-link" to={link}>
        {redirectLabel ?? '-'}
      </Link>
    </div>
  );
}
