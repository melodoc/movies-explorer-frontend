import { useRef, useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { INPUT_TYPES } from '../../constants/inputTypes';
import { UISubmit } from '../../shared-components/ui-submit/UISubmit';
import { ValidationHelper } from '../../helpers/validationHelper';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { Toast } from '../../components/Toast/Toast';

import './Profile.css';

const VALIDATION_MESSAGE = ValidationHelper.validationNameMessages;
const VALIDATION_EQUAL_MESSAGES = ValidationHelper.validationEqualMessages;

export function Profile({ handleChangeProfile, handleProfileLogOut, toastLabel }) {
  const currentUser = useContext(CurrentUserContext);
  const history = useHistory();

  const [isReadOnly, setIsReadOnly] = useState(true);
  const [profileName, setProfileName] = useState(currentUser?.name);
  const [email, setEmail] = useState(currentUser?.email);
  const [emailErrorText, setEmailErrorText] = useState(undefined);
  const [profileNameErrorText, setProfileNameErrorText] = useState(undefined);
  const [customUniqueness, setCustomUniqueness] = useState({
    name: false,
    email: false,
  });

  const isUnique = Object.values(customUniqueness).some((unique) => unique);
  
  const profileInput = useRef(null);
  const emailInput = useRef(null);
  const { handleChange } = useFormWithValidation();

  const handleInputField = (e) => {
    if (e.target?.type === INPUT_TYPES.Email) {
      if (e.target.validity.valid) {
        setEmailErrorText(undefined);
        return;
      }
      setEmailErrorText(VALIDATION_MESSAGE.get(INPUT_TYPES.Email));
    } else {
      if (e.target.validity.valid) {
        setProfileNameErrorText(undefined);
        return;
      }
      setProfileNameErrorText(VALIDATION_MESSAGE.get(INPUT_TYPES.Name));
    }
  };

  const handleChangeProfileName = (e) => {
    handleInputField(e);
    setProfileName(e.target.value);
    if (e.target.value !== currentUser?.name) {
      setCustomUniqueness({ ...customUniqueness, name: e.target.validity.valid });
      return;
    }
    setCustomUniqueness({ ...customUniqueness, name: false });
    setProfileNameErrorText(VALIDATION_EQUAL_MESSAGES.get(INPUT_TYPES.Name));
  };

  const handleChangeEmail = (e) => {
    handleInputField(e);
    setEmail(e.target.value);
    if (e.target.value !== currentUser?.email) {
      setCustomUniqueness({ ...customUniqueness, email: e.target.validity.valid });
      return;
    }
    setCustomUniqueness({ ...customUniqueness, email: false });
    setEmailErrorText(VALIDATION_EQUAL_MESSAGES.get(INPUT_TYPES.Email));
  };

  const handleSubmit = (e) => {
    handleChange(e);
    e.preventDefault();
    handleChangeProfile({ name: profileName, email });
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
    setCustomUniqueness({ email: false, name: false });
    setEmailErrorText(undefined);
    setProfileNameErrorText(undefined);
  };

  const handleLogOut = () => {
    handleProfileLogOut();
    history.push(ROUTES.Movies);
  };

  useEffect(() => {
    setProfileName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser.email, currentUser.name]);

  return (
    <>
      <section className="profile">
        <div className="profile__container">
          <h1 className="profile__title">Привет, {currentUser?.name ?? ''}</h1>
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
                  pattern={ValidationHelper.namePattern}
                />
              </li>
              {profileNameErrorText && !isUnique && <p className="field__valid-text">{profileNameErrorText}</p>}
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
                  pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$"
                />
              </li>
              {emailErrorText && !isUnique && <p className="field__valid-text">{emailErrorText}</p>}
            </ul>
            {isReadOnly ? (
              <div className="profile__form-links">
                <UISubmit label="Редактировать" name="edit" handleClick={handleEditProfileClick} secondary />
                <Link className="profile__form-link" to={ROUTES.Movies} onClick={handleLogOut}>
                  Выйти из аккаунта
                </Link>
              </div>
            ) : (
              <UISubmit label="Сохранить" name="save" handleClick={handleSaveProfileClick} disabled={!isUnique} />
            )}
          </form>
        </div>
      </section>
      {toastLabel && <Toast label={toastLabel} />}
    </>
  );
}
