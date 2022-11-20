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
      <form className="form" onSubmit={onSubmit}>
        <div className="form__wrapper">
          <label className="form__label">
            <input
              className="form__input"
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
          <button className="form__button" />
        </div>
        <UICheckbox label="Короткометражки"/>
      </form>
    </section>
  );
}
