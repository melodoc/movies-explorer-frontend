import { useState, useEffect } from 'react';
import { SearchForm } from '../SearchForm/SearchForm';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { Preloader } from '../Preloader/Preloader';
import { CardHelper } from '../../helpers/cardHelper';
import { useResizeObserver } from '../../hooks/useResizeObserver';

import './Movies.css';

const MIN_CARDS_TO_SHOW = 3;

export function Movies({ cards, savedCards, cardsLabel, isLoading }) {
  const [movieCards, setMovieCards] = useState();
  const [shownCards, setShownCards] = useState();
  const [moreCardAmount, setMoreCardAmount] = useState(CardHelper.getMoreCardAmount());
  const dimensions = useResizeObserver();
  const storageMovies = CardHelper.getMoviesFromLocalStorage();

  const handleSubmitSearch = (searchQuery, checkboxQuery) => {
    if (movieCards) {
      const movies = CardHelper.filterMoviesCards(storageMovies, searchQuery, checkboxQuery);
      CardHelper.setLocalStorageSearchQuery(searchQuery);
      CardHelper.setLocalStorageCheckboxQuery(checkboxQuery);
      setMovieCards(movies);
      movieCards && setShownCards(CardHelper.getShownCards(movieCards, CardHelper.getMaxCardAmount()));
    }
  };

  const handleMoreClick = () => {
    if (shownCards?.length > (movieCards?.length ?? 0) + moreCardAmount) {
      return;
    }
    movieCards && setShownCards(CardHelper.getShownCards(movieCards, shownCards?.length + moreCardAmount));
  };

  useEffect(() => {
    const searchQuery = CardHelper.getSearchQueryFromLocalStorage();
    const checkboxQuery = CardHelper.getCheckboxFromLocalStorage();
    const movies = CardHelper.filterMoviesCards(storageMovies, searchQuery, checkboxQuery);
    setMovieCards(movies);
    movieCards && setShownCards(CardHelper.getShownCards(movieCards, CardHelper.getMaxCardAmount()));
  }, [cards]);

  useEffect(() => {
    movieCards && setShownCards(CardHelper.getShownCards(movieCards, CardHelper.getMaxCardAmount()));
  }, [movieCards, cards]);

  useEffect(() => {
    setMoreCardAmount(CardHelper.getMoreCardAmount());
  }, [movieCards, cards, dimensions, moreCardAmount, shownCards?.length]);

  return (
    <>
      <SearchForm onSubmitSearch={handleSubmitSearch} />
      {(cards || CardHelper.hasSavedFilms()) && movieCards && savedCards && (
        <MoviesCardList cards={shownCards} cardsLabel={cardsLabel} savedCards={savedCards} />
      )}
      {shownCards?.length >= MIN_CARDS_TO_SHOW && shownCards?.length < movieCards?.length && (
        <button className="cards__button" onClick={handleMoreClick}>
          Еще
        </button>
      )}
      {isLoading && (
        <div className="entry-form__loader">
          <Preloader />
        </div>
      )}
    </>
  );
}
