import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { UICheckbox } from '../../shared-components/ui-checkbox/UICheckbox';
import { ValidationHelper } from '../../helpers/validationHelper';
import { CardHelper } from '../../helpers/cardHelper';
import { ROUTES } from '../../constants/routes';

import './SearchForm.css';

const SEARCH_FORM_VALIDATION_MAP = new Map([
  [true, { valid: true, text: '' }],
  [false, { valid: false, text: 'Нужно ввести ключевое слово' }]
]);

export function SearchForm({ onSubmitSearch, initialSearchQuery, initialCheckboxQuery }) {
  const input = useRef(null);
  const location = useLocation();
  const isMoviesPage = [ROUTES.Movies].includes(location?.pathname);

  const [searchQuery, setSearchQuery] = useState(initialSearchQuery ?? "");
  const [checkboxQuery, setCheckboxQuery] = useState(initialCheckboxQuery ?? false);
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

  const handleOnCheckboxChange = (checkboxValue, e) => {
    onSubmit(e);
    setCheckboxQuery(checkboxValue);
  };

  useEffect(() => {
    isMoviesPage && setSearchQuery(CardHelper.getSearchQueryFromLocalStorage());
  }, [isMoviesPage]);

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
              required
              value={searchQuery}
            />
          </label>
          <button className="search-form__button" />
        </div>
        {!inputState.valid && <p className="search-form__valid-text">{inputState.text}</p>}
        <UICheckbox
          label="Короткометражки"
          onSubmit={handleOnCheckboxChange}
          initialDataLoadHandler={isMoviesPage && CardHelper.getCheckboxFromLocalStorage}
        />
      </form>
    </section>
  );
}
