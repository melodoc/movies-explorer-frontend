import { useState, useEffect } from 'react';
import { SearchForm } from '../SearchForm/SearchForm';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { Preloader } from '../Preloader/Preloader';
import { CardHelper } from '../../helpers/cardHelper';

import './Movies.css';

export function Movies({ cards, savedCards, cardsLabel, isLoading }) {
  const [movieCards, setMovieCards] = useState();
  const storageMovies = CardHelper.getMoviesFromLocalStorage();

  const handleSubmitSearch = (searchQuery, checkboxQuery) => {
    if (movieCards) {
      const movies = CardHelper.filterMoviesCards(storageMovies, searchQuery, checkboxQuery);
      CardHelper.setLocalStorageSearchQuery(searchQuery);
      CardHelper.setLocalStorageCheckboxQuery(checkboxQuery);
      setMovieCards(movies);
    }
  };

  useEffect(() => {
    const searchQuery = CardHelper.getSearchQueryFromLocalStorage();
    const checkboxQuery = CardHelper.getCheckboxFromLocalStorage();
    const movies = CardHelper.filterMoviesCards(storageMovies, searchQuery, checkboxQuery);
    setMovieCards(movies);
  }, [cards]);

  return (
    <>
      <SearchForm onSubmitSearch={handleSubmitSearch} />
      {(cards || CardHelper.hasSavedFilms()) && movieCards && savedCards && (
        <MoviesCardList cards={movieCards} cardsLabel={cardsLabel} savedCards={savedCards} />
      )}
      {isLoading && (
        <div className="entry-form__loader">
          <Preloader />
        </div>
      )}
    </>
  );
}
