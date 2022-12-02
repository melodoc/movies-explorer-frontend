export class CardButtonHelper {
  // на главной
  // !isSaved -- не добавлено в избранное
  // isSaved -- добавлено в избранное

  // на странице избранного
  // delete --  удалить на странице избранных
  static getButton(isSaved, hasDeleteBtn) {
    return {
      style: [
        'card__button',
        isSaved && 'card__button-saved',
        !isSaved && !hasDeleteBtn && 'card__button--add-to-saved',
        hasDeleteBtn && 'card__button-delete'
      ]
        .filter((className) => !!className)
        .join(' '),
      label: [
        (isSaved || hasDeleteBtn) && '',
        !isSaved && !hasDeleteBtn && 'Сохранить'
      ]
        .filter((className) => !!className)
        .pop()
    };
  }
}
