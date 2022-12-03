import './Promo.css';

import spinner from '../../images/spinner.svg';

export function Promo() {
  return (
    <section className="promo">
      <h1 className="promo__headline">Учебный проект студента факультета Веб-разработки.</h1>
      <div className="promo__image-container">
        <img className="promo__image" src={spinner} alt="spinner" />
      </div>
    </section>
  );
}
