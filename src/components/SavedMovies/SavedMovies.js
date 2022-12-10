import { useState, useEffect } from 'react';
import { SearchForm } from '../SearchForm/SearchForm';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { Preloader } from '../Preloader/Preloader';
import { TOAST_LABELS } from '../../constants/toastLabels';
import { CardHelper } from '../../helpers/cardHelper';
import { useCardsHelper } from '../../hooks/useCardsHelper';
import { mainApiClient } from '../../utils/MainApi';

import './SavedMovies.css';

export function SavedMovies() {
  const [filteredSavedCards, setFilteredSavedCards] = useState();
  const [savedCards, setSavedCards] = useState();
  const [savedCardsLabel, setSavedCardsLabel] = useState(TOAST_LABELS.Movies.notFound);
  const [isLoading, setIsLoading] = useState(false);
  const { handleChange } = useCardsHelper();

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
      handleChange(movies)
    } catch {
      setSavedCards([]);
      setSavedCardsLabel(TOAST_LABELS.Movies.connection);
      console.error(TOAST_LABELS.Movies.connection);
    } finally {
      setIsLoading(false);
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
        <MoviesCardList
          cards={filteredSavedCards}
          cardsLabel={savedCardsLabel}
          savedCards={savedCards}
        />
      )}
      {isLoading && (
        <div className="entry-form__loader">
          <Preloader />
        </div>
      )}
    </>
  );
}
