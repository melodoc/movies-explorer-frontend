import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { UISubmit } from '../../shared-components/ui-submit/UISubmit';

import './Profile.css';

export function Profile() {
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [profileName, setProfileName] = useState('Виталий');
  const [email, setEmail] = useState('pochta@yandex.ru');
  const input = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleEditProfileClick = (e) => {
    e.preventDefault();
    setIsReadOnly(false);
    input.current.focus();
  };
  const handleSaveProfileClick = (e) => {
    e.preventDefault();
    setIsReadOnly(true);
  };

  const handleChangeProfileName = (e) => {
    setProfileName(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  return (
    <section className="profile">
      <div className="profile__container">
        <h1 className="profile__title">Привет, Виталий!</h1>
        <form className="profile__form" onSubmit={handleSubmit}>
          <ul className="profile__form-container">
            <li className="profile__form-item">
              <label htmlFor="name" className="profile__form-label">
                Имя
              </label>
              <input
                id="name"
                onChange={handleChangeProfileName}
                value={profileName}
                className="profile__form-input"
                readOnly={isReadOnly}
                ref={input}
              />
            </li>
            <li className="profile__form-item">
              <label htmlFor="email" className="profile__form-label">
                E-mail
              </label>
              <input
                id="email"
                onChange={handleChangeEmail}
                value={email}
                className="profile__form-input"
                readOnly={isReadOnly}
              />
            </li>
          </ul>
        </form>
        {isReadOnly ? (
            <div className="profile__form-links">
              <UISubmit
                label="Редактировать"
                name="edit"
                handleClick={handleEditProfileClick}
                secondary
              />
              <Link className="profile__form-link" to={ROUTES.SignIn}>
                Выйти из аккаунта
              </Link>
            </div>
          ) : (
            <UISubmit
              label="Сохранить"
              name="save"
              handleClick={handleSaveProfileClick}
            />
          )}
      </div>
    </section>
  );
}
