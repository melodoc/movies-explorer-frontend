import { useEffect, useState } from 'react';
import { MoviesCard } from '../MoviesCard/MoviesCard';
import { useResizeObserver } from '../../hooks/useResizeObserver';
import { CardHelper } from '../../utils/cardHelper';
import { beatfilmMoviesRequestParams } from '../../constants/requestParams';

import './MoviesCardList.css';

const MIN_CARDS_TO_SHOW = 3;

export function MoviesCardList({ cards, cardsLabel }) {
  const MAX_AMOUNT = cards?.length ?? 0;
  const [moreCardAmount, setMoreCardAmount] = useState(CardHelper.getMoreCardAmount());
  const [shownCards, setShownCards] = useState(CardHelper.getShownCards(cards, CardHelper.getMaxCardAmount()));
  const dimensions = useResizeObserver();

  const handleMoreClick = () => {
    if (shownCards?.length > MAX_AMOUNT + moreCardAmount) {
      return;
    }
    setShownCards(CardHelper.getShownCards(cards, shownCards?.length + moreCardAmount));
  };

  useEffect(() => {
    setShownCards(CardHelper.getShownCards(cards, CardHelper.getMaxCardAmount()));
  }, [cards]);

  useEffect(() => {
    setMoreCardAmount(CardHelper.getMoreCardAmount());
  }, [cards, dimensions, moreCardAmount, shownCards?.length]);

  return (
    <section className="cards">
      <div className="cards__container">
        {shownCards.length ? (
          shownCards.map((card, key) => {
            return (
              <MoviesCard
                key={key}
                src={`${beatfilmMoviesRequestParams.baseUrl}${card?.image?.url ?? ''}`}
                label={card?.nameRU}
                duration={card?.duration}
                trailerLink={card?.trailerLink}
                isSaved={card?.isSaved}
                hasDeleteBtn={card?.hasDeleteBtn}
              />
            );
          })
        ) : (
          <p className="cards__empty">{cardsLabel}</p>
        )}
      </div>
      {shownCards?.length >= MIN_CARDS_TO_SHOW && shownCards?.length < cards?.length && (
        <button className="cards__button" onClick={handleMoreClick}>
          Еще
        </button>
      )}
    </section>
  );
}
