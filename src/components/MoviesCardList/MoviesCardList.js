import { useEffect, useState } from 'react';
import { MoviesCard } from '../MoviesCard/MoviesCard';
import { DocumentBreakpoints } from '../../utils/documentBreakpoints';
import { CardHelper } from '../../utils/cardHelper';
import { beatfilmMoviesRequestParams } from '../../constants/requestParams';

import './MoviesCardList.css';

const MIN_CARDS_TO_SHOW = 3;

export function MoviesCardList({ cards, cardsLabel }) {
  // FIXME: Добавить Ресайзобсервер
  const MAX_AMOUNT = cards?.length ?? 0;
  const INITIAL_TO_SHOW_CARDS_AMOUNT = CardHelper.getMaxCardAmount(
    DocumentBreakpoints.getIsDesktop(),
    DocumentBreakpoints.getIsTablet()
  );
  const MORE_CARD_AMOUNT = CardHelper.getMoreCardAmount(DocumentBreakpoints.getIsDesktop());
  const [amountOfCards, setAmountOfCards] = useState(INITIAL_TO_SHOW_CARDS_AMOUNT + MORE_CARD_AMOUNT);
  const [shownCards, setShownCards] = useState([...cards].slice(0, INITIAL_TO_SHOW_CARDS_AMOUNT));

  const handleMoreClick = () => {
    if (amountOfCards > MAX_AMOUNT + MORE_CARD_AMOUNT) {
      return;
    }
    setAmountOfCards(amountOfCards + MORE_CARD_AMOUNT);
    setShownCards([...cards].slice(0, amountOfCards));
  };

  useEffect(() => {
    setShownCards([...cards].slice(0, INITIAL_TO_SHOW_CARDS_AMOUNT));
  }, [INITIAL_TO_SHOW_CARDS_AMOUNT, cards]);

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
