import { useState, useEffect } from 'react';
import { SearchForm } from '../SearchForm/SearchForm';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { Preloader } from '../Preloader/Preloader';
import { ERROR_LABELS } from '../../constants/errorLabels';
import { CardHelper } from '../../helpers/cardHelper';
import { mainApiClient } from '../../utils/MainApi';

import './SavedMovies.css';

export function SavedMovies() {
  const [filteredSavedCards, setFilteredSavedCards] = useState();
  const [savedCards, setSavedCards] = useState();
  const [savedCardsLabel, setSavedCardsLabel] = useState(ERROR_LABELS.Movies.notFound);
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
      setSavedCardsLabel(ERROR_LABELS.Movies.connection);
      console.error(ERROR_LABELS.Movies.connection);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setFilteredSavedCards(savedCards);
  }, [savedCards]);

  useEffect(() => {
    loadSavedCards()
  }, []);

  //handleLogOut

  return (
    <>
      <SearchForm onSubmitSearch={handleSavedCardsSearch} />
      {savedCards && filteredSavedCards && <MoviesCardList cards={filteredSavedCards} cardsLabel={savedCardsLabel} />}
      {isLoading && (
        <div className="entry-form__loader">
          <Preloader />
        </div>
      )}
    </>
  );
}
