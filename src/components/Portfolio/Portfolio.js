import arrow from '../../images/arrow-up.svg';

import './Portfolio.css';

export function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__headline">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <a
            className="portfolio__link"
            href="https://melodoc.github.io/how-to-learn/"
            target="_blank"
            rel="noreferrer"
          >
            Статичный сайт
          </a>
          <a
            className="portfolio__link-link"
            href="https://melodoc.github.io/how-to-learn/"
            target="_blank"
            rel="noreferrer"
          >
            <img className="portfolio__link-image" src={arrow} alt="icon" />
          </a>
        </li>
        <li className="portfolio__list-item">
          <a
            className="portfolio__link"
            href="https://github.com/melodoc/from-portland-to-portland"
            target="_blank"
            rel="noreferrer"
          >
            Адаптивный сайт
          </a>
          <a
            className="portfolio__link-link"
            href="https://github.com/melodoc/from-portland-to-portland"
            target="_blank"
            rel="noreferrer"
          >
            <img className="portfolio__link-image" src={arrow} alt="icon" />
          </a>
        </li>
        <li className="portfolio__list-item">
          <a
            className="portfolio__link"
            href="https://melodoc.github.io/react-mesto-auth/"
            target="_blank"
            rel="noreferrer"
          >
            Одностраничное приложение
          </a>
          <a
            className="portfolio__link-link"
            href="https://melodoc.github.io/react-mesto-auth/"
            target="_blank"
            rel="noreferrer"
          >
            <img className="portfolio__link-image" src={arrow} alt="icon" />
          </a>
        </li>
      </ul>
    </section>
  );
}
