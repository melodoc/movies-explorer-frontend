import { useState, useEffect } from 'react';
import { SearchForm } from '../SearchForm/SearchForm';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { Preloader } from '../Preloader/Preloader';
import { CardHelper } from '../../helpers/cardHelper';

import './SavedMovies.css';

export function SavedMovies({loadSavedCards, savedCards, savedCardsLabel, isLoading}) {
  const [filteredSavedCards, setFilteredSavedCards] = useState();

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
    loadSavedCards();
  }, []);

  return (
    <>
      <SearchForm onSubmitSearch={handleSavedCardsSearch} />
      {savedCards && filteredSavedCards && (
        <MoviesCardList
          cards={filteredSavedCards}
          cardsLabel={savedCardsLabel}
          savedCards={savedCards}
          updateCardList={loadSavedCards}
        />
      )}
      {isLoading && (
        <div className="entry-form__loader">
          <Preloader />
        </div>
      )}
    </>
  );
}
