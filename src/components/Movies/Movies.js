import { useState } from 'react';
import { SearchForm } from '../SearchForm/SearchForm';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { Preloader } from '../Preloader/Preloader';
import { moviesApiClient } from '../../utils/MoviesApi';

import './Movies.css';

export function Movies({ cards }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitSearch = async (searchQuery) => {
    setIsLoading(true);
    try {
      const movies = await moviesApiClient.getMovies();
      console.info(movies);
    } catch {
      console.error('Ошибка');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SearchForm onSubmitSearch={handleSubmitSearch} />
      <MoviesCardList cards={cards} />
      {isLoading && (
        <div className="entry-form__loader">
          <Preloader />
        </div>
      )}
    </>
  );
}
