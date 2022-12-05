import { useState, useEffect } from 'react';
import { SearchForm } from '../SearchForm/SearchForm';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { Preloader } from '../Preloader/Preloader';
import { ERROR_LABELS } from '../../constants/errorLabels';
import { mainApiClient } from '../../utils/MainApi';
import { LOCAL_STORAGE_KEYS } from '../../constants/localStorageKeys';
import { CardHelper } from '../../utils/cardHelper';

import './SavedMovies.css';

export function SavedMovies() {
  const [isLoading, setIsLoading] = useState(false);
  const [savedCards, setSavedCards] = useState();
  const [savedCardsLabel, setSavedCardsLabel] = useState(ERROR_LABELS.Movies.notFound);

  const loadInitialData = async () => {
    setIsLoading(true);
    try {
      const movies = await mainApiClient.getMovies();
      const searchQuery = CardHelper.getSearchQueryFromLocalStorage();
      const checkboxQuery = CardHelper.getCheckboxFromLocalStorage();
      const filteredMovies =
        searchQuery && checkboxQuery ? CardHelper.filterMoviesCards(movies, searchQuery, checkboxQuery) : movies;
      setSavedCards(filteredMovies);
      localStorage.setItem(LOCAL_STORAGE_KEYS.SavedMovies, JSON.stringify(filteredMovies));
    } catch {
      setSavedCards([]);
      setSavedCardsLabel(ERROR_LABELS.Movies.connection);
      console.error(ERROR_LABELS.Movies.connection);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitSearch = (searchQuery, checkboxQuery) => {
    const movies = CardHelper.filterMoviesCards(savedCards, searchQuery, checkboxQuery);
    CardHelper.setLocalStorageItems(movies, searchQuery, checkboxQuery);
    setSavedCards(movies);
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  return (
    <>
      <SearchForm onSubmitSearch={handleSubmitSearch} />
      {savedCards && <MoviesCardList cards={savedCards} cardsLabel={savedCardsLabel} />}
      {isLoading && (
        <div className="entry-form__loader">
          <Preloader />
        </div>
      )}
    </>
  );
}
