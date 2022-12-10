import { useState, useEffect } from 'react';
import { CardHelper } from '../../helpers/cardHelper';

import './MoviesCard.css';

export function MoviesCard({
  src,
  label,
  duration,
  trailerLink,
  hasDeleteBtn,
  disabled,
  handleAddCard,
  handleDeleteCard,
  card,
  savedCards
}) {
  const convertedDuration = CardHelper.getDuration(duration);
  const [hasSaved, setHasSaved] = useState(savedCards && CardHelper.getSavedState(savedCards, card));
  const [buttonStyle, setButtonStyle] = useState(CardHelper.getButtonStyle(hasSaved, hasDeleteBtn));

  const onClickHandler = (e) => {
    if (!hasSaved && !hasDeleteBtn) {
      handleAddCard(card);
    } else {
      handleDeleteCard(card);
    }
    savedCards && setHasSaved(CardHelper.getSavedState(savedCards, card));
    setButtonStyle(CardHelper.getButtonStyle(hasSaved, hasDeleteBtn));
  };

  useEffect(() => {
    savedCards && setHasSaved(CardHelper.getSavedState(savedCards, card));
    setButtonStyle(CardHelper.getButtonStyle(hasSaved, hasDeleteBtn));
  }, [card, hasDeleteBtn, hasSaved, savedCards]);

  return (
    <figure className="card">
      <button className={buttonStyle?.style} onClick={onClickHandler} disabled={disabled}>
        {buttonStyle.label ?? ''}
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
