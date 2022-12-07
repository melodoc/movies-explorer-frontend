import { SearchForm } from '../SearchForm/SearchForm';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';

import './Movies.css';

export function Movies({handleSubmitSearch, cards, cardsLabel}) {

  return (
    <>
      <SearchForm onSubmitSearch={handleSubmitSearch} />
      {cards && <MoviesCardList cards={cards} cardsLabel={cardsLabel} />}
    </>
  );
}
