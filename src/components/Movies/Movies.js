import { useState } from 'react';
import { SearchForm } from '../SearchForm/SearchForm';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { Preloader } from '../Preloader/Preloader';
import { moviesApiClient } from '../../utils/MoviesApi';
import { ERROR_LABELS } from '../../constants/errorLabels';
import { LOCAL_STORAGE_KEYS } from '../../constants/localStorageKeys';

import './Movies.css';

export function Movies() {
  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState();
  const [cardsLabel, setCardsLabel] = useState(ERROR_LABELS.Movies.notFound);

  const handleSubmitSearch = async (searchQuery, checkboxQuery) => {
    setIsLoading(true);
    try {
      const movies = await moviesApiClient.getMovies();
      setCards(movies);
      const localStorageItems = [
        { key: LOCAL_STORAGE_KEYS.Movies, value: JSON.stringify(movies) },
        { key: LOCAL_STORAGE_KEYS.SearchQuery, value: searchQuery },
        { key: LOCAL_STORAGE_KEYS.Checkbox, value: checkboxQuery }
      ];

      localStorageItems.forEach((item) => {
        localStorage.setItem(item.key, item.value);
      });
    } catch {
      setCards([]);
      setCardsLabel(ERROR_LABELS.Movies.connection);
      console.error(ERROR_LABELS.Movies.connection);
    } finally {
      setIsLoading(false);
    }
  };

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
