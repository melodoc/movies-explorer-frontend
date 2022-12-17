import { UIHeadline } from '../../shared-components/ui-headline/UIHeadline';

import './AboutProject.css';

export function AboutProject() {
  return (
    <section className="about">
      <UIHeadline text="О проекте" />
      <ul className="about__list about__steps">
        <li className="about__item">
          <h3 className="about__title">Дипломный проект включал 5 этапов</h3>
          <p className="about__subtitle">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
          </p>
        </li>
        <li className="about__item">
          <h3 className="about__title">На выполнение диплома ушло 5 недель</h3>
          <p className="about__subtitle">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <ul className="about__list about__time">
        <li className="about__time-item">
          <p className="about__time-period about__time-period-bright">1 неделя</p>
          <p className="about__time-description">Back-end</p>
        </li>
        <li className="about__time-item">
          <p className="about__time-period">4 недели</p>
          <p className="about__time-description">Front-end</p>
        </li>
      </ul>
    </section>
  );
}
