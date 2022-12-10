import { DocumentBreakpoints } from './documentBreakpoints';
import { LOCAL_STORAGE_KEYS } from '../constants/localStorageKeys';

const SHORT_DURATION = 40;

export class CardHelper {
  // на главной
  // !isSaved -- не добавлено в избранное
  // isSaved -- добавлено в избранное

  // на странице избранного
  // delete --  удалить на странице избранных
  static getButtonStyle(isSaved, hasDeleteBtn) {
    return {
      style: [
        'card__button',
        isSaved && 'card__button-saved',
        !isSaved && !hasDeleteBtn && 'card__button--add-to-saved',
        hasDeleteBtn && 'card__button-delete'
      ]
        .filter((className) => !!className)
        .join(' '),
      label: [(isSaved || hasDeleteBtn) && '', !isSaved && !hasDeleteBtn && 'Сохранить']
        .filter((className) => !!className)
        .pop()
    };
  }

  static _addAdditionalSymbolsBefore(inputString, symbol, symbolsAmount) {
    return inputString.padStart(symbolsAmount, symbol);
  }

  static getDuration(duration) {
    if (!duration) {
      return '-';
    }

    const hours = parseInt(duration / 60);
    const minutes = CardHelper._addAdditionalSymbolsBefore((duration % 60).toString(), '0', 2);

    return hours ? `${hours} ч ${minutes} м` : `${minutes} м`;
  }

  static getMaxCardAmount() {
    return !DocumentBreakpoints.getIsDesktop() ? (DocumentBreakpoints.getIsTablet() ? 8 : 5) : 12;
  }

  static getMoreCardAmount() {
    return !DocumentBreakpoints.getIsDesktop() ? (DocumentBreakpoints.getIsTablet() ? 2 : 1) : 3;
  }

  static getShownCards(cards, amount) {
    return [...cards].slice(0, amount);
  }

  static filterMoviesCards(movies, searchQuery, isShort) {
    return (movies || []).filter((movie) => {
      const isSearchQueryIncluded =
        movie?.nameRU?.includes(searchQuery.toUpperCase()) ||
        movie?.nameRU?.includes(searchQuery.toLowerCase()) ||
        movie?.nameRU?.includes(searchQuery) ||
        movie?.nameRU?.includes(searchQuery[0].toUpperCase() + searchQuery.slice(1));
      return !isShort
        ? isSearchQueryIncluded && movie?.duration > SHORT_DURATION
        : isSearchQueryIncluded && movie?.duration <= SHORT_DURATION;
    });
  }

  static filterMoviesCardsByDuration(movies, isShort) {
    return (movies || []).filter((movie) => {
      return !isShort ? movie?.duration > SHORT_DURATION : movie?.duration <= SHORT_DURATION;
    });
  }

  static hasSavedFilms() {
    return !!JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.Movies))?.length;
  }

  static setLocalStorageMovies(movies) {
    localStorage.setItem(LOCAL_STORAGE_KEYS.Movies, JSON.stringify(movies));
  }

  static setLocalStorageSearchQuery(searchQuery) {
    localStorage.setItem(LOCAL_STORAGE_KEYS.SearchQuery, searchQuery);
  }

  static setLocalStorageCheckboxQuery(checkboxQuery) {
    localStorage.setItem(LOCAL_STORAGE_KEYS.Checkbox, checkboxQuery);
  }

  static getMoviesFromLocalStorage() {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.Movies)) ?? [];
  }

  static getCheckboxFromLocalStorage() {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.Checkbox)) ?? false;
  }

  static getSearchQueryFromLocalStorage() {
    return localStorage.getItem(LOCAL_STORAGE_KEYS.SearchQuery) ?? '';
  }

  static getToken() {
    return localStorage.getItem(LOCAL_STORAGE_KEYS.Token);
  }

  static preparedCardData(card, baseUrl) {
    return {
      country: card?.country,
      director: card?.director,
      duration: card?.duration,
      year: card?.year,
      description: card?.description,
      image: `${baseUrl}${card?.image?.url ?? ''}`,
      trailerLink: card?.trailerLink,
      thumbnail: `${baseUrl}${card?.image?.formats?.thumbnail?.url ?? ''}`,
      movieId: card?.id,
      nameRU: card.nameRU,
      nameEN: card.nameEN
    };
  }

  static getSavedState(savedCards, card) {
    return savedCards.map((savedCard) => savedCard?.movieId).some((id) => id === card?.id)
  }

  static getCardByMovieId(cards, id) {
    return cards.find((card) => card?.movieId === id);
  }
}
