import { useRef, useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { INPUT_TYPES } from '../../constants/inputTypes';
import { UISubmit } from '../../shared-components/ui-submit/UISubmit';
import { ValidationHelper } from '../../helpers/validationHelper';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { Toast } from '../../components/Toast/Toast';

import './Profile.css';

const VALIDATION_PATTERN = ValidationHelper.validationPattern;
const VALIDATION_MESSAGE = ValidationHelper.validationMessage;

export function Profile({ handleChangeProfile, handleProfileLogOut, toastLabel }) {
  const currentUser = useContext(CurrentUserContext);
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [profileName, setProfileName] = useState(currentUser?.name);
  const [email, setEmail] = useState(currentUser?.email);
  const [emailInputState, setEmailInputState] = useState(VALIDATION_MESSAGE.get(true));
  const [profileNameInputState, setProfileNameInputState] = useState(VALIDATION_MESSAGE.get(true));

  const profileInput = useRef(null);
  const emailInput = useRef(null);
  const { handleChange } = useFormWithValidation();

  const checkValidation = (type) => {
    if (type === INPUT_TYPES.Name) {
      setProfileNameInputState(VALIDATION_MESSAGE.get(!!profileInput.current.value.match(VALIDATION_PATTERN)?.input));
      return;
    }

    setEmailInputState({
      valid: emailInput.current.validity.valid,
      text: emailInput.current.validationMessage
    });
    setProfileNameInputState({
      valid: profileInput.current.validity.valid,
      text: profileInput.current.validationMessage
    });
  };

  const handleSubmit = (e) => {
    handleChange(e);
    e.preventDefault();
    handleChangeProfile({ name: profileName, email });
    console.info(profileName, email);
  };

  const handleEditProfileClick = (e) => {
    handleChange(e);
    e.preventDefault();
    setIsReadOnly(false);
    profileInput.current.focus();
  };

  const handleSaveProfileClick = (e) => {
    handleChange(e);
    e.preventDefault();
    setIsReadOnly(true);
    handleChangeProfile({ name: profileName, email });
  };

  const handleChangeProfileName = (e) => {
    handleChange(e);
    checkValidation(INPUT_TYPES.Name);
    setProfileName(e.target.value);
  };

  const handleChangeEmail = (e) => {
    handleChange(e);
    checkValidation(INPUT_TYPES.Email);
    setEmail(e.target.value);
  };

  const handleLogOut = (e) => {
    handleProfileLogOut();
  };

  useEffect(() => {
    setProfileName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser.email, currentUser.name]);

  return (
    <>
      <section className="profile">
        <div className="profile__container">
          <h1 className="profile__title">Привет, {profileName ?? ''}</h1>
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
                  type={INPUT_TYPES.Name}
                  className="profile__form-input"
                  readOnly={isReadOnly}
                  ref={profileInput}
                  minLength={2}
                  maxLength={200}
                  required
                />
              </li>
              {!profileNameInputState.valid && <p className="field__valid-text">{profileNameInputState.text}</p>}
              <li className="profile__form-item">
                <label htmlFor="email" className="profile__form-label">
                  E-mail
                </label>
                <input
                  id="email"
                  onChange={handleChangeEmail}
                  value={email}
                  type={INPUT_TYPES.Email}
                  className="profile__form-input"
                  readOnly={isReadOnly}
                  minLength={2}
                  maxLength={200}
                  ref={emailInput}
                  required
                />
              </li>
              {!emailInputState.valid && <p className="field__valid-text">{emailInputState.text}</p>}
            </ul>
            {isReadOnly ? (
              <div className="profile__form-links">
                <UISubmit label="Редактировать" name="edit" handleClick={handleEditProfileClick} secondary />
                <Link className="profile__form-link" to={ROUTES.Movies} onClick={handleLogOut}>
                  Выйти из аккаунта
                </Link>
              </div>
            ) : (
              <UISubmit
                label="Сохранить"
                name="save"
                handleClick={handleSaveProfileClick}
                disabled={!profileNameInputState.valid || !emailInputState.valid}
              />
            )}
          </form>
        </div>
      </section>
      {toastLabel && <Toast label={toastLabel} />}
    </>
  );
}
