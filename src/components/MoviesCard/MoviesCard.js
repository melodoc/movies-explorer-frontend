import { CardButtonHelper } from '../../utils/cardButtonHelper';

import './MoviesCard.css';

export function MoviesCard({
  src,
  label,
  duration,
  isSaved,
  hasDeleteBtn
}) {
  const btn = CardButtonHelper.getButton(isSaved, hasDeleteBtn);
  return (
    <figure className="card">
      <button className={btn?.style}>{btn.label ?? ''}</button>
      <img className="card__image" src={src} alt="label" />
      <figcaption className="card__caption">
        <p className="card__label">{label ?? '-'}</p>
        <p className="card__duration">{duration ?? '-'}</p>
      </figcaption>
    </figure>
  );
}
