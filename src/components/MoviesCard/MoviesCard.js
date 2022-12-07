import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CardHelper } from '../../helpers/cardHelper';
import { ROUTES } from '../../constants/routes';

import './MoviesCard.css';

export function MoviesCard({ src, label, duration, trailerLink, hasDeleteBtn, hasSaved, handleClick, card }) {
  const location = useLocation();
  const isSavedPage = location?.pathname === ROUTES.SavedMovies;
  const [isSaved, setIsSaved] = useState(isSavedPage || hasSaved);

  const btn = CardHelper.getButtonStyle(isSaved, hasDeleteBtn);
  const convertedDuration = CardHelper.getDuration(duration);

  const onClickHandler = async (e) => {
    handleClick(card, hasDeleteBtn);
    if (!hasDeleteBtn) {
      setIsSaved(true);
    }
  };

  return (
    <figure className="card">
      <button className={btn?.style} onClick={onClickHandler} disabled={isSaved && !isSavedPage}>
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
