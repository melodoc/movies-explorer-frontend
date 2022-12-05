import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MoviesCard } from '../MoviesCard/MoviesCard';
import { useResizeObserver } from '../../hooks/useResizeObserver';
import { CardHelper } from '../../utils/cardHelper';
import { mainApiClient } from '../../utils/MainApi';
import { beatfilmMoviesRequestParams } from '../../constants/requestParams';
import { ROUTES } from '../../constants/routes';
import { ERROR_LABELS } from '../../constants/errorLabels';

import './MoviesCardList.css';

const MIN_CARDS_TO_SHOW = 3;

export function MoviesCardList({ cards, cardsLabel }) {
  const baseUrl = beatfilmMoviesRequestParams.baseUrl;
  const location = useLocation();
  const isSavedMoviesPage = location?.pathname === ROUTES.SavedMovies;
  const [moviesCards, setMoviesCards] = useState(cards);
  const MAX_AMOUNT = moviesCards?.length ?? 0;
  const [moreCardAmount, setMoreCardAmount] = useState(CardHelper.getMoreCardAmount());
  const [shownCards, setShownCards] = useState(CardHelper.getShownCards(moviesCards, CardHelper.getMaxCardAmount()));
  const dimensions = useResizeObserver();

  const handleMoreClick = () => {
    if (shownCards?.length > MAX_AMOUNT + moreCardAmount) {
      return;
    }
    setShownCards(CardHelper.getShownCards(moviesCards, shownCards?.length + moreCardAmount));
  };

  useEffect(() => {
    setShownCards(CardHelper.getShownCards(moviesCards, CardHelper.getMaxCardAmount()));
  }, [moviesCards, cards]);

  useEffect(() => {
    setMoreCardAmount(CardHelper.getMoreCardAmount());
  }, [moviesCards, cards, dimensions, moreCardAmount, shownCards?.length]);

  const handleClick = async (card, hasDeleteBtn) => {
    const cardData = {
      country: card?.country,
      director: card?.director,
      duration: card?.duration,
      year: card?.year,
      description: card?.description,
      image: `${baseUrl}${card?.image?.url ?? ''}`,
      trailerLink: card?.trailerLink,
      thumbnail: `${baseUrl}${card?.image?.formats?.thumbnail?.url ?? ''}`,
      movieId: card?.id,
      nameRU: card.nameRU,
      nameEN: card.nameEN
    };

    if (!hasDeleteBtn) {
      try {
        await mainApiClient.addNewMovies(cardData);
        return;
      } catch {
        console.error(ERROR_LABELS.Form.connection);
      }
    }
    await mainApiClient.deleteMovieById(card?._id);
    // FIXME: обновить у setMoviesCards карточки
    // добавить тост
  };

  return (
    <section className="cards">
      <div className="cards__container">
        {shownCards.length ? (
          shownCards.map((card, key) => {
            const src = card?.image?.url ? `${baseUrl}${card?.image?.url}` : card?.image;
            return (
              <MoviesCard
                key={key}
                src={src ?? ''}
                label={card?.nameRU}
                duration={card?.duration}
                trailerLink={card?.trailerLink}
                hasDeleteBtn={isSavedMoviesPage}
                handleClick={handleClick}
                card={card}
              />
            );
          })
        ) : (
          <p className="cards__empty">{cardsLabel}</p>
        )}
      </div>
      {!isSavedMoviesPage && shownCards?.length >= MIN_CARDS_TO_SHOW && shownCards?.length < moviesCards?.length && (
        <button className="cards__button" onClick={handleMoreClick}>
          Еще
        </button>
      )}
    </section>
  );
}
