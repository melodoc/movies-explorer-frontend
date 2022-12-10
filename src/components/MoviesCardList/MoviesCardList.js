import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MoviesCard } from '../MoviesCard/MoviesCard';
import { useResizeObserver } from '../../hooks/useResizeObserver';
import { CardHelper } from '../../helpers/cardHelper';
import { mainApiClient } from '../../utils/MainApi';
import { Toast } from '../../components/Toast/Toast';
import { beatfilmMoviesRequestParams } from '../../constants/requestParams';
import { ROUTES } from '../../constants/routes';
import { TOAST_LABELS } from '../../constants/toastLabels';

import './MoviesCardList.css';

const MIN_CARDS_TO_SHOW = 3;

export function MoviesCardList({ cards, cardsLabel, savedCards }) {
  const baseUrl = beatfilmMoviesRequestParams.baseUrl;
  const location = useLocation();
  const isSavedMoviesPage = location?.pathname === ROUTES.SavedMovies;
  const [moviesCards, setMoviesCards] = useState(cards);
  const [toastLabel, setToastLabel] = useState();
  const [updatedSavedCards, setUpdatedSavedCards] = useState(savedCards);
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
      setToastLabel(`Карточка «${cardData.nameRU}» добавлена в сохраненные фильмы`);
      return await mainApiClient.addNewMovies(cardData);
    } catch {
      console.error(TOAST_LABELS.Form.connection);
      setToastLabel(TOAST_LABELS.Form.connection);
    }
  };

  const deleteMovieById = async (card) => {
    try {
      setToastLabel(`Карточка «${card.nameRU}» удалена из сохраненных фильмов`);
      return await mainApiClient.deleteMovieById(card?._id);
    } catch {
      console.error(TOAST_LABELS.Form.connection);
      setToastLabel(TOAST_LABELS.Form.connection);
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

  useEffect(() => {
    savedCards && setUpdatedSavedCards(savedCards);
  }, [savedCards]);

  const handleAddCard = async (card) => {
    const addedCard = await addNewMovie(card);
    setUpdatedSavedCards([...updatedSavedCards, addedCard]);
  };

  const handleDeleteCard = async (card) => {
    const deletingCard = CardHelper.getCardByMovieId(updatedSavedCards, card?.id);
    const deletedCardRes = deletingCard && (await deleteMovieById(deletingCard));
    setUpdatedSavedCards(updatedSavedCards.filter((card) => card._id !== deletedCardRes._id));
  };

  return (
    <section className="cards">
      <div className="cards__container">
        {shownCards.length ? (
          shownCards.map((card, key) => {
            const src = card?.image?.url ? `${baseUrl}${card?.image?.url}` : card?.image;
            return (
              updatedSavedCards && (
                <MoviesCard
                  key={`${key}${card?.nameRU ?? 'card'}`}
                  src={src ?? ''}
                  label={card?.nameRU}
                  duration={card?.duration}
                  trailerLink={card?.trailerLink}
                  hasDeleteBtn={isSavedMoviesPage}
                  handleAddCard={handleAddCard}
                  handleDeleteCard={handleDeleteCard}
                  card={card}
                  savedCards={updatedSavedCards}
                />
              )
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
