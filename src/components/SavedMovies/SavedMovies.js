import { useState, useEffect } from 'react';
import { SearchForm } from '../SearchForm/SearchForm';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { CardHelper } from '../../helpers/cardHelper';

import './SavedMovies.css';

export function SavedMovies({ handleSavedCardsLoad, savedCards, savedCardsLabel}) {
  const [filteredSavedCards, setFilteredSavedCards] = useState(savedCards);

  // FIXME: Добавить запрос при переходе каждый раз

  const handleSavedCardsSearch = (searchQuery, checkboxQuery) => {
    if (savedCards) {
      const movies = CardHelper.filterMoviesCards(savedCards, searchQuery, checkboxQuery);
      setFilteredSavedCards(movies);
    }
  };

  useEffect(() => {
    setFilteredSavedCards(savedCards);
  }, [savedCards]);

  useEffect(() => {
    handleSavedCardsLoad()
  }, []);

  return (
    <>
      <SearchForm onSubmitSearch={handleSavedCardsSearch} />
      {savedCards && filteredSavedCards && <MoviesCardList cards={filteredSavedCards} cardsLabel={savedCardsLabel} />}
    </>
  );
}
