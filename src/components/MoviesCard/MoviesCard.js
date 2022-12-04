import { CardHelper } from '../../utils/cardHelper';

import './MoviesCard.css';

export function MoviesCard({ src, label, duration, trailerLink, isSaved, hasDeleteBtn, handleClick, card }) {
  const btn = CardHelper.getButtonStyle(isSaved, hasDeleteBtn);
  const convertedDuration = CardHelper.getDuration(duration);

  const onClickHandler = (e) => {
    handleClick(isSaved, card);
  };

  return (
    <figure className="card">
      <button className={btn?.style} onClick={onClickHandler}>
        {btn.label ?? ''}
      </button>
      <a href={trailerLink} target="_blank" rel="noreferrer">
        <img className="card__image" src={src} alt="label" />
      </a>
      <figcaption className="card__caption">
        <p className="card__label">{label ?? '-'}</p>
        <p className="card__duration">{convertedDuration}</p>
      </figcaption>
    </figure>
  );
}
