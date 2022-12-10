import { useState, useEffect } from 'react';
import { SearchForm } from '../SearchForm/SearchForm';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { Preloader } from '../Preloader/Preloader';
import { TOAST_LABELS } from '../../constants/toastLabels';
import { CardHelper } from '../../helpers/cardHelper';
import { mainApiClient } from '../../utils/MainApi';
import { Toast } from '../../components/Toast/Toast';

import './SavedMovies.css';

export function SavedMovies() {
  const [filteredSavedCards, setFilteredSavedCards] = useState();
  const [savedCards, setSavedCards] = useState();
  const [savedCardsLabel, setSavedCardsLabel] = useState(TOAST_LABELS.Movies.notFound);
  const [toastLabel, setToastLabel] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleSavedCardsSearch = (searchQuery, checkboxQuery) => {
    if (savedCards) {
      const movies = CardHelper.filterMoviesCards(savedCards, searchQuery, checkboxQuery);
      setFilteredSavedCards(movies);
    }
  };

  const loadSavedCards = async () => {
    setIsLoading(true);
    try {
      const movies = await mainApiClient.getMovies();
      setSavedCards(movies);
    } catch {
      setSavedCards([]);
      setSavedCardsLabel(TOAST_LABELS.Movies.connection);
      console.error(TOAST_LABELS.Movies.connection);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteMovieById = async (card) => {
    try {
      await mainApiClient.deleteMovieById(card?._id);
      setToastLabel(`Карточка «${card.nameRU}» удалена из сохраненных фильмов`);
      const updatedCards = savedCards.filter((oldCard) => oldCard?._id !== card?._id);
      console.info(updatedCards);
      setSavedCards(updatedCards);
    } catch {
      console.error(TOAST_LABELS.Form.connection);
      setToastLabel(TOAST_LABELS.Form.connection);
    }
  };

  useEffect(() => {
    const initialFilteredCards = CardHelper.filterMoviesCardsByDuration(savedCards, false);
    setFilteredSavedCards(initialFilteredCards);
  }, [savedCards]);

  useEffect(() => {
    loadSavedCards();
  }, []);

  return (
    <>
      <SearchForm onSubmitSearch={handleSavedCardsSearch} />
      {savedCards && filteredSavedCards && (
        <MoviesCardList cards={filteredSavedCards} cardsLabel={savedCardsLabel} deleteMovieById={deleteMovieById} />
      )}
      {toastLabel && <Toast label={toastLabel} />}
      {isLoading && (
        <div className="entry-form__loader">
          <Preloader />
        </div>
      )}
    </>
  );
}
