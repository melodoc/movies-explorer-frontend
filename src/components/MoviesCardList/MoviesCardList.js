import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MoviesCard } from '../MoviesCard/MoviesCard';
import { useResizeObserver } from '../../hooks/useResizeObserver';
import { CardHelper } from '../../utils/cardHelper';
import { mainApiClient } from '../../utils/MainApi';
import { Toast } from '../../components/Toast/Toast';
import { beatfilmMoviesRequestParams } from '../../constants/requestParams';
import { ROUTES } from '../../constants/routes';
import { ERROR_LABELS } from '../../constants/errorLabels';

import './MoviesCardList.css';

const MIN_CARDS_TO_SHOW = 3;

export function MoviesCardList({ cards, cardsLabel }) {
  const baseUrl = beatfilmMoviesRequestParams.baseUrl;
  const savedCards = CardHelper.getSavedCardsFromLocalStorage();
  const location = useLocation();
  const isSavedMoviesPage = location?.pathname === ROUTES.SavedMovies;
  const [moviesCards, setMoviesCards] = useState(cards);
  const [toastLabel, setToastLabel] = useState();
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

  const addNewMovie = async (card) => {
    const cardData = CardHelper.preparedCardData(card, baseUrl);
    try {
      await mainApiClient.addNewMovies(cardData);
      setToastLabel(`Карточка «${cardData.nameRU}» добавлена в сохраненные фильмы`);
    } catch {
      console.error(ERROR_LABELS.Form.connection);
      setToastLabel(ERROR_LABELS.Form.connection);
    }
  };

  const deleteMovieById = async (card) => {
    console.info(card);
    try {
      await mainApiClient.deleteMovieById(card?._id);
      setToastLabel(`Карточка «${card.nameRU}» удалена из сохраненных фильмов`);
      const updatedCards = moviesCards.filter((oldCard) => oldCard?._id !== card?._id);
      setMoviesCards(updatedCards);
      CardHelper.updateSavedCardsFromLocalStorage(updatedCards);
    } catch {
      console.error(ERROR_LABELS.Form.connection);
      setToastLabel(ERROR_LABELS.Form.connection);
    }
  };

  useEffect(() => {
    setShownCards(CardHelper.getShownCards(moviesCards, CardHelper.getMaxCardAmount()));
  }, [moviesCards, cards]);

  useEffect(() => {
    setMoreCardAmount(CardHelper.getMoreCardAmount());
  }, [moviesCards, cards, dimensions, moreCardAmount, shownCards?.length]);

  useEffect(() => {
    setMoviesCards(cards);
  }, [cards]);

  const handleClick = async (card, hasDeleteBtn) => {
    if (!hasDeleteBtn) {
      addNewMovie(card);
      return;
    }
    deleteMovieById(card);
  };

  return (
    <section className="cards">
      <div className="cards__container">
        {shownCards.length ? (
          shownCards.map((card, key) => {
            const src = card?.image?.url ? `${baseUrl}${card?.image?.url}` : card?.image;
            const hasSaved = !!(savedCards || []).find((savedCard) => savedCard?.nameRU === card?.nameRU);
            return (
              <MoviesCard
                key={key}
                src={src ?? ''}
                label={card?.nameRU}
                duration={card?.duration}
                trailerLink={card?.trailerLink}
                hasDeleteBtn={isSavedMoviesPage}
                hasSaved={hasSaved}
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
      {toastLabel && <Toast label={toastLabel} />}
    </section>
  );
}
