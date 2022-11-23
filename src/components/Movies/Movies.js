import { SearchForm } from '../SearchForm/SearchForm';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';

import './Movies.css';

export function Movies({cards}) {
  return (
    <>
      <SearchForm onSubmitSearch={() => {}} />
      <MoviesCardList
        cards={cards}
      />
    </>
  );
}
