import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

import './NotFound.css';

export function NotFound() {
  return (
    <section className="notfound">
      <ul className="notfound__container">
        <li className="notfound__container-item">
          <h1 className="notfound__title">404</h1>
          <p className="notfound__paragraph">Страница не найдена</p>
        </li>
        <li className="notfound__container-item notfound__container-item_type_link">
          <Link className="notfound__link" to={ROUTES.SignUp}>
            Назад
          </Link>
        </li>
      </ul>
    </section>
  );
}
