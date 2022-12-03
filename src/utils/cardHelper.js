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

  static getMaxCardAmount(isDesktop, isTablet) {
    return !isDesktop ? (isTablet ? 8 : 5) : 12;
  }

  static getMoreCardAmount(isDesktop) {
    return !isDesktop ? 2 : 3;
  }

  static filterMovies(movies, searchQuery, isShort) {
    const shortDuration = 40;

    return movies.filter((movie) => {
      return !isShort
        ? movie?.nameRU?.includes(searchQuery) && movie?.duration > shortDuration
        : movie?.nameRU?.includes(searchQuery) && movie?.duration <= shortDuration;
    });
  }
}
