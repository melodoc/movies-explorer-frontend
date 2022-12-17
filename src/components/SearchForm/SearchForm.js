import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { ValidationHelper } from '../../helpers/validationHelper';
import { CardHelper } from '../../helpers/cardHelper';
import { ROUTES } from '../../constants/routes';

import './SearchForm.css';

const SEARCH_FORM_VALIDATION_MAP = new Map([
  [true, { valid: true, text: '' }],
  [false, { valid: false, text: 'Нужно ввести ключевое слово' }]
]);

export function SearchForm({ onSubmitSearch }) {
  const input = useRef(null);
  const checkbox = useRef(null);
  const location = useLocation();
  const isMoviesPage = [ROUTES.Movies].includes(location?.pathname);

  const [searchQuery, setSearchQuery] = useState(isMoviesPage ? CardHelper.getSearchQueryFromLocalStorage() : '');
  const [checkboxQuery, setCheckboxQuery] = useState(isMoviesPage ? CardHelper.getCheckboxFromLocalStorage : false);
  const [inputState, setInputState] = useState(SEARCH_FORM_VALIDATION_MAP.get(true));

  const onSubmit = (e) => {
    e?.preventDefault();
    const isWord = ValidationHelper.isWord(searchQuery);
    setInputState(SEARCH_FORM_VALIDATION_MAP.get(isWord));
    isWord && onSubmitSearch(searchQuery, checkboxQuery);
  };

  const handleOnChange = (e) => {
    setSearchQuery(e.target.value);
  };


  const handleOnCheckboxChange = (e) => {
    setCheckboxQuery(checkbox.current.checked);
    onSubmitSearch(searchQuery, checkbox.current.checked);
  };

  useEffect(() => {
    isMoviesPage && (checkbox.current.checked = CardHelper.getCheckboxFromLocalStorage());
  }, []);

  return (
    <section>
      <form className="search-form" onSubmit={onSubmit}>
        <div className="search-form__container">
          <label className="search-form__label">
            <input
              ref={input}
              className="search-form__input"
              id="films"
              onChange={handleOnChange}
              name="films"
              placeholder="Фильм"
              autoComplete="off"
              type="text"
              value={searchQuery}
            />
          </label>
          <button className="search-form__button" />
        </div>
        {!inputState.valid && <p className="search-form__valid-text">{inputState.text}</p>}
        <div className="checkbox__container">
          <div className="checkbox">
            <input
              ref={checkbox}
              className="checkbox__input"
              type="checkbox"
              id="custom-checkbox"
              tabIndex="1"
              onChange={handleOnCheckboxChange}
            />
            <label className="checkbox__label" htmlFor="custom-checkbox">
              Короткометражки
            </label>
          </div>
          <span className="checkbox__text">Короткометражки</span>
        </div>
      </form>
    </section>
  );
}
