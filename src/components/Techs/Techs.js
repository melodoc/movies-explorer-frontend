import { UIHeadline } from '../../shared-components/ui-headline/UIHeadline';

import './Techs.css';

export function Techs() {
  const techs = ['HTML', 'CSS', 'JS', 'React', 'Git', 'Express.js', 'mongoDB'];

  return (
    <section className="techs">
      <UIHeadline text="Технологии" />
      <h3 className="techs__headline">7 технологий</h3>
      <p className="techs__description">
        На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
      </p>
      <ul className="techs__list">
        {techs.map((tech, index) => (
          <li className="tech_list-item" key={`${tech}${index}`}>
            {tech}
          </li>
        ))}
      </ul>
    </section>
  );
}
