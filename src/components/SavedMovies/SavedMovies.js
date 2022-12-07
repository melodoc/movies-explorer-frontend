import { SearchForm } from '../SearchForm/SearchForm';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';

import './SavedMovies.css';

export function SavedMovies({handleSubmitSearch, savedCards, savedCardsLabel}) {
  return (
    <>
      <SearchForm onSubmitSearch={handleSubmitSearch} />
      {savedCards && <MoviesCardList cards={savedCards} cardsLabel={savedCardsLabel} />}
    </>
  );
}
