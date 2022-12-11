import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MoviesCard } from '../MoviesCard/MoviesCard';
import { CardHelper } from '../../helpers/cardHelper';
import { mainApiClient } from '../../utils/MainApi';
import { Toast } from '../../components/Toast/Toast';
import { beatfilmMoviesRequestParams } from '../../constants/requestParams';
import { ROUTES } from '../../constants/routes';
import { TOAST_LABELS } from '../../constants/toastLabels';

import './MoviesCardList.css';

export function MoviesCardList({ cards, cardsLabel, savedCards, updateCardList }) {
  const baseUrl = beatfilmMoviesRequestParams.baseUrl;
  const location = useLocation();
  const isSavedMoviesPage = location?.pathname === ROUTES.SavedMovies;
  const [toastLabel, setToastLabel] = useState();
  const [updatedSavedCards, setUpdatedSavedCards] = useState(savedCards);

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

  const deleteMovieById = async (id, name) => {
    try {
      setToastLabel(`Карточка «${name}» удалена из сохраненных фильмов`);
      return await mainApiClient.deleteMovieById(id);
    } catch {
      console.error(TOAST_LABELS.Form.connection);
      setToastLabel(TOAST_LABELS.Form.connection);
    }
  };

  const handleAddCard = async (card) => {
    const addedCard = await addNewMovie(card);
    setUpdatedSavedCards([...updatedSavedCards, addedCard]);
  };

  const handleDeleteCard = async (card) => {
    if (card) {
      const deletingCard = CardHelper.getCardByMovieId(updatedSavedCards, card?.id);
      const deletedCardRes = await deleteMovieById(
        deletingCard?._id ?? card?._id,
        deletingCard?.nameRU ?? card?.nameRU
      );
      const updatedCards = updatedSavedCards.filter((card) => card._id !== deletedCardRes._id ?? card?._id);
      setUpdatedSavedCards(updatedCards);
      updateCardList && updateCardList();
    }
  };

  return (
    <section className="cards">
      <div className="cards__container">
        {cards?.length ? (
          cards.map((card) => {
            const src = card?.image?.url ? `${baseUrl}${card?.image?.url}` : card?.image;
            return (
              updatedSavedCards && (
                <MoviesCard
                  key={`${card?.id}${card?.nameRU ?? 'card'}`}
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
      {toastLabel && <Toast label={toastLabel} />}
    </section>
  );
}
