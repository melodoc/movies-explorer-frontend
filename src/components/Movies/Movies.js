import { SearchForm } from '../SearchForm/SearchForm';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';

import './Movies.css';

export function Movies({onSubmit, cards, cardsLabel}) {

  return (
    <>
      <SearchForm onSubmitSearch={onSubmit} />
      {cards && <MoviesCardList cards={cards} cardsLabel={cardsLabel} />}
    </>
  );
}
