import { UIHeadline } from '../../shared-components/ui-headline/UIHeadline';
import profile from '../../images/pic.png';

import './AboutMe.css';

export function AboutMe() {
  return (
    <section className="about-me">
      <UIHeadline text="Студент" />
      <ul className="about-me__list">
        <li className="about-me__list-item">
          <p className="about-me__title">Любовь</p>
          <p className="about-me__subtitle">Фронтенд-разработчик, 29 лет</p>
          <p className="about-me__description">
            Я родилась в городе Казань, закончила Казанский федеральный университет. Я люблю слушать
            музыку и рисовать. С 2017 года работала техническим писателем. Последние 2,5 года работаю во фронтенд-разработке
          </p>
          <a className="about-me__link" href="https://github.com/melodoc/" target="_blank" rel="noreferrer">
            Github
          </a>
        </li>
        <li className="about-me__list-item">
          <img className="about-me__image" src={profile} alt="profile" />
        </li>
      </ul>
    </section>
  );
}
