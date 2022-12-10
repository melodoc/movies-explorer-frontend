import { LOCAL_STORAGE_KEYS } from '../constants/localStorageKeys';

/**
 * Хук управления карточками
 */
export function useCardsHelper() {
  const handleChange = (cards) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.SavedMovies, JSON.stringify(cards));
  };

  const getCards = () => {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.SavedMovies));
  }

  return { getCards, handleChange };
}
