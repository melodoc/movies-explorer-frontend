import { useState } from 'react';
import { UICheckbox } from '../../shared-components/ui-checkbox/UICheckbox';

import './SearchForm.css';

export function SearchForm({ onSubmitSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onSubmitSearch(searchQuery);
  };

  return (
    <section>
      <form className="search-form" onSubmit={onSubmit}>
        <div className="search-form__wrapper">
          <label className="search-form__label">
            <input
              className="search-form__input"
              id="films"
              onChange={handleInputChange}
              name="films"
              placeholder="Фильм"
              autoComplete="off"
              minLength={2}
              maxLength={200}
              type="text"
            />
          </label>
          <button className="search-form__button" />
        </div>
        <UICheckbox label="Короткометражки"/>
      </form>
    </section>
  );
}
