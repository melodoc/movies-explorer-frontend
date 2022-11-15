import { Headline } from '../../shared-components/headline/Headline';
import profile from '../../images/pic.png';

import './AboutMe.css';

export function AboutMe() {
  return (
    <section className="about-me">
      <Headline text="Студент" />
      <ul className="about-me__list">
        <li className="about-me__list-item">
          <p className="about-me__title">Виталий</p>
          <p className="about-me__subtitle">
            Фронтенд-разработчик, 30 лет
          </p>
          <p className="about-me__description">
            Я родился и живу в Саратове, закончил факультет экономики
            СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а
            ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года
            работал в компании «СКБ Контур». После того, как прошёл
            курс по веб-разработке, начал заниматься фриланс-заказами
            и ушёл с постоянной работы.
          </p>
          <a
            className="about-me__link"
            href="https://github.com/melodoc/"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </li>
        <li className="about-me__list-item">
          <img
            className="about-me__image"
            src={profile}
            alt="profile"
          />
        </li>
      </ul>
    </section>
  );
}
