import { useState, useEffect } from 'react';
import { SearchForm } from '../SearchForm/SearchForm';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { Preloader } from '../Preloader/Preloader';
import { moviesApiClient } from '../../utils/MoviesApi';
import { CardHelper } from '../../helpers/cardHelper';
import { ERROR_LABELS } from '../../constants/errorLabels';
import { LOCAL_STORAGE_KEYS } from '../../constants/localStorageKeys';

import './Movies.css';

export function Movies() {
  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState();
  const [cardsLabel, setCardsLabel] = useState(ERROR_LABELS.Movies.notFound);

  const loadInitialData = () => {
    setCards(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.Movies)));
  };

  const handleSubmitSearch = async (searchQuery, checkboxQuery) => {
    setIsLoading(true);
    try {
      const movies = CardHelper.filterMoviesCards(await moviesApiClient.getMovies(), searchQuery, checkboxQuery);
      CardHelper.setLocalStorageItems(movies, searchQuery, checkboxQuery);
      setCards(movies);
    } catch {
      setCards([]);
      setCardsLabel(ERROR_LABELS.Movies.connection);
      console.error(ERROR_LABELS.Movies.connection);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  return (
    <>
      <SearchForm onSubmitSearch={handleSubmitSearch} />
      {cards && <MoviesCardList cards={cards} cardsLabel={cardsLabel} />}
      {isLoading && (
        <div className="entry-form__loader">
          <Preloader />
        </div>
      )}
    </>
  );
}
