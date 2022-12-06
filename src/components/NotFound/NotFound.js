import { useHistory } from 'react-router-dom';

import './NotFound.css';

export function NotFound() {
  const history = useHistory();

  const handleNotFoundBack = () => {
    history.goBack();
  }

  return (
    <section className="notfound">
      <ul className="notfound__container">
        <li className="notfound__container-item">
          <h1 className="notfound__title">404</h1>
          <p className="notfound__paragraph">Страница не найдена</p>
        </li>
        <li className="notfound__container-item notfound__container-item_type_link">
          <span className="notfound__link" onClick={handleNotFoundBack}>
            Назад
          </span>
        </li>
      </ul>
    </section>
  );
}
