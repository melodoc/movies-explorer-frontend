import { useState, useEffect } from 'react';
import { SearchForm } from '../SearchForm/SearchForm';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { Preloader } from '../Preloader/Preloader';
import { TOAST_LABELS } from '../../constants/toastLabels';
import { CardHelper } from '../../helpers/cardHelper';
import { moviesApiClient } from '../../utils/MoviesApi';

import './Movies.css';

export function Movies() {
  const [movieCards, setMovieCards] = useState();
  const [cards, setCards] = useState();
  const [cardsLabel, setCardsLabel] = useState(TOAST_LABELS.Movies.notFound);
  const [isLoading, setIsLoading] = useState(false);
  const storageMovies = CardHelper.getMoviesFromLocalStorage();

  const handleSubmitSearch = (searchQuery, checkboxQuery) => {
    if (movieCards) {
      const movies = CardHelper.filterMoviesCards(storageMovies, searchQuery, checkboxQuery);
      CardHelper.setLocalStorageSearchQuery(searchQuery);
      CardHelper.setLocalStorageCheckboxQuery(checkboxQuery);
      setMovieCards(movies);
    }
  };

  const loadInitialCards = async () => {
    if (!CardHelper.hasSavedFilms()) {
      setIsLoading(true);
      try {
        const movies = await moviesApiClient.getMovies();
        CardHelper.setLocalStorageMovies(movies);
        setCards(movies);
      } catch {
        setCards([]);
        setCardsLabel(TOAST_LABELS.Movies.connection);
        console.error(TOAST_LABELS.Movies.connection);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    const searchQuery = CardHelper.getSearchQueryFromLocalStorage();
    const checkboxQuery = CardHelper.getCheckboxFromLocalStorage();
    const movies = CardHelper.filterMoviesCards(storageMovies, searchQuery, checkboxQuery);
    setMovieCards(movies);
  }, [cards]);

  useEffect(() => {
    loadInitialCards();
  }, [cards]);

  return (
    <>
      <SearchForm onSubmitSearch={handleSubmitSearch} />
      {(cards || CardHelper.hasSavedFilms()) && movieCards && (
        <MoviesCardList cards={movieCards} cardsLabel={cardsLabel} />
      )}
      {isLoading && (
        <div className="entry-form__loader">
          <Preloader />
        </div>
      )}
    </>
  );
}
