import './Footer.css';

export function Footer() {
  return (
    <footer className="footer">
      <p className="footer__name">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__container">
        <p className="footer__year">© {new Date().getFullYear()}</p>
        <ul className="footer__links">
          <li className="footer__link-item">
            <a className="footer__link" href="https://practicum.yandex.ru/web/" target="_blank" rel="noreferrer">
              Яндекс.Практикум
            </a>
          </li>
          <li className="footer__link-item">
            <a className="footer__link" href="https://github.com/melodoc/" target="_blank" rel="noreferrer">
              Github
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
