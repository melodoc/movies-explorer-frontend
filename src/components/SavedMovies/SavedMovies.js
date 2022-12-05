import { useState, useEffect } from 'react';
import { SearchForm } from '../SearchForm/SearchForm';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { Preloader } from '../Preloader/Preloader';
import { ERROR_LABELS } from '../../constants/errorLabels';
import { mainApiClient } from '../../utils/MainApi';

import './SavedMovies.css';

export function SavedMovies() {
  const [isLoading, setIsLoading] = useState(false);
  const [savedCards, setSavedCards] = useState();
  const [savedCardsLabel, setSavedCardsLabel] = useState(ERROR_LABELS.Movies.notFound);

  const handleSubmitSearch = async () => {
    setIsLoading(true);
    try {
      const movies = await mainApiClient.getMovies();
      console.info(movies);
      setSavedCards(movies);
    } catch {
      setSavedCards([]);
      setSavedCardsLabel(ERROR_LABELS.Movies.connection);
      console.error(ERROR_LABELS.Movies.connection);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleSubmitSearch();
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
