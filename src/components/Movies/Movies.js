import { SearchForm } from '../SearchForm/SearchForm';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';

import './Movies.css';

export function Movies() {
  return (
    <>
      <SearchForm onSubmitSearch={() => {}} />
      <br />
      <MoviesCardList />
    </>
  );
}
