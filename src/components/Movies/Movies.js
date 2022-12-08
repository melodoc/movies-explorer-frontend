import { useState, useEffect } from 'react';
import { SearchForm } from '../SearchForm/SearchForm';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { CardHelper } from '../../helpers/cardHelper';

import './Movies.css';

export function Movies({ cards, cardsLabel }) {
  const [movieCards, setMovieCards] = useState();
  const storageMovies = CardHelper.getMoviesFromLocalStorage();

  const loadInitialCards = () => {
    const searchQuery = CardHelper.getSearchQueryFromLocalStorage();
    const checkboxQuery = CardHelper.getCheckboxFromLocalStorage();
    const movies = CardHelper.filterMoviesCards(storageMovies, searchQuery, checkboxQuery);
    setMovieCards(movies);
  };

  const handleSubmitSearch = async (searchQuery, checkboxQuery) => {
    if (movieCards) {
      const movies = CardHelper.filterMoviesCards(storageMovies, searchQuery, checkboxQuery);
      CardHelper.setLocalStorageSearchQuery(searchQuery);
      CardHelper.setLocalStorageCheckboxQuery(checkboxQuery);
      setMovieCards(movies);
    }
  };

  useEffect(() => {
    loadInitialCards();
  }, [cards]);

  return (
    <>
      <SearchForm
        onSubmitSearch={handleSubmitSearch}
        initialSearchQuery={CardHelper.getSearchQueryFromLocalStorage()}
        initialCheckboxQuery={CardHelper.getCheckboxFromLocalStorage()}
      />
      {(cards || CardHelper.hasSavedFilms()) && movieCards && (
        <MoviesCardList cards={movieCards} cardsLabel={cardsLabel} />
      )}
    </>
  );
}
