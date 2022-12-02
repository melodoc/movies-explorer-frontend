import { SearchForm } from '../SearchForm/SearchForm';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';

import './SavedMovies.css';

export function SavedMovies({ cards }) {
  return (
    <>
      <SearchForm onSubmitSearch={() => {}} />
      <MoviesCardList cards={cards} />
    </>
  );
}
