import { DocumentBreakpoints } from './documentBreakpoints';
import { LOCAL_STORAGE_KEYS } from '../constants/localStorageKeys';

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
    const shortDuration = 40;

    return movies.filter((movie) => {
      const isSearchQueryIncluded =
        movie?.nameRU?.includes(searchQuery.toUpperCase()) || movie?.nameRU?.includes(searchQuery.toLowerCase());
      return !isShort
        ? isSearchQueryIncluded && movie?.duration > shortDuration
        : isSearchQueryIncluded && movie?.duration <= shortDuration;
    });
  }

  static setLocalStorageItems(movies, searchQuery, checkboxQuery) {
    const localStorageItems = [
      { key: LOCAL_STORAGE_KEYS.Movies, value: JSON.stringify(movies) },
      { key: LOCAL_STORAGE_KEYS.SearchQuery, value: searchQuery },
      { key: LOCAL_STORAGE_KEYS.Checkbox, value: checkboxQuery }
    ];

    localStorageItems.forEach((item) => {
      localStorage.setItem(item.key, item.value);
    });
  }

  static getCheckboxFromLocalStorage() {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.Checkbox));
  }

  static getSavedCardsFromLocalStorage() {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.SavedMovies));
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
}
