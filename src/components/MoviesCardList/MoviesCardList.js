import { MoviesCard } from '../MoviesCard/MoviesCard';
import { DocumentBreakpoints } from '../../utils/documentBreakpoints';

import './MoviesCardList.css';

function getMaxCardAmount(isDesktop, isTablet) {
  return !isDesktop ? (isTablet ? 8 : 5) : 12;
}

export function MoviesCardList({ cards }) {
  const MAX_CARD_AMOUNT = getMaxCardAmount(
    DocumentBreakpoints.getIsDesktop(),
    DocumentBreakpoints.getIsTablet()
  );
  
  const shownCards = [...cards].slice(0, MAX_CARD_AMOUNT);

  return (
    <section className="cards">
      <div className="cards__container">
        {shownCards.map((card, key) => {
          return (
            <MoviesCard
              key={key}
              src={card?.src}
              label={card?.label}
              duration={card?.duration}
              isSaved={card?.isSaved}
              hasDeleteBtn={card?.hasDeleteBtn}
            />
          );
        })}
      </div>
      {cards?.length > MAX_CARD_AMOUNT && (
        <button className="cards__button">Еще</button>
      )}
    </section>
  );
}
