import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { INPUT_TYPES } from '../../constants/inputTypes';
import { ValidationHelper } from '../../helpers/validationHelper';
import { UIRedirect } from '../../shared-components/ui-redirect/UIRedirect';
import { UIInput } from '../../shared-components/ui-input/UIInput';
import { UISubmit } from '../../shared-components/ui-submit/UISubmit';
import { UITitle } from '../../shared-components/ui-title/UITitle';
import logo from '../../images/logo.svg';

import './Login.css';

const VALIDATION_MESSAGE = ValidationHelper.validationNameMessages;

export function Login({ onSubmit, isLoading }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [customValidity, setCustomValidity] = useState({
    email: false,
    password: false
  });

  const isValid = Object.values(customValidity).every((valid) => valid);

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    setCustomValidity({ ...customValidity, email: e.target.validity.valid });
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    setCustomValidity({ ...customValidity, password: e.target.validity.valid });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <>
      <section className="entry-form">
        <div className="entry-form__container">
          <form className="entry-form__form" onSubmit={handleSubmit}>
            <Link to={ROUTES.About}>
              <img src={logo} className="entry-form__logo" alt="logo" />
            </Link>
            <UITitle label="Рады видеть!" />
            <UIInput
              label="E-mail"
              type={INPUT_TYPES.Email}
              required
              value={email}
              handleChange={handleChangeEmail}
              pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$"
              errorText={VALIDATION_MESSAGE.get(INPUT_TYPES.Email)}
            />

            <UIInput
              label="Пароль"
              type={INPUT_TYPES.Password}
              required
              value={password}
              handleChange={handleChangePassword}
              errorText={VALIDATION_MESSAGE.get(INPUT_TYPES.Password)}
              pattern={ValidationHelper.passwordPattern}
            />
            <div className="entry-form__input">
              <UISubmit label="Войти" name="login" link={ROUTES.Movies} disabled={isLoading || !isValid} />
            </div>
            <UIRedirect label="Еще не зарегистрированы?" redirectLabel="Регистрация" link={ROUTES.SignUp} />
          </form>
        </div>
      </section>
    </>
  );
}
