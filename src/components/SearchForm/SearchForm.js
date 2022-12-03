import { useState, useRef } from 'react';
import { UICheckbox } from '../../shared-components/ui-checkbox/UICheckbox';
import { ValidationHelper } from '../../utils/validationHelper';

import './SearchForm.css';

const SEARCH_FORM_VALIDATION_MAP = new Map([
  [true, { valid: true, text: '' }],
  [false, { valid: false, text: 'Нужно ввести ключевое слово' }]
]);

export function SearchForm({ onSubmitSearch }) {
  const input = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [inputState, setInputState] = useState(
    SEARCH_FORM_VALIDATION_MAP.get(true)
  );

  const onSubmit = (e) => {
    e.preventDefault();
    const isWord = ValidationHelper.isWord(searchQuery);
    setInputState(SEARCH_FORM_VALIDATION_MAP.get(isWord));
    isWord && onSubmitSearch(searchQuery);
  };

  const handleOnChange = (e) => {
    setSearchQuery(e.target.value);
  };

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
            />
          </label>
          <button className="search-form__button" />
        </div>
        {!inputState.valid && (
          <p className="search-form__valid-text">{inputState.text}</p>
        )}
        <UICheckbox label="Короткометражки" />
      </form>
    </section>
  );
}
