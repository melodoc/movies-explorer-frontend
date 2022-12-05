import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ROUTES } from '../../constants/routes';
import { INPUT_TYPES } from '../../constants/inputTypes';
import { Preloader } from '../../components/Preloader/Preloader';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import { UIRedirect } from '../../shared-components/ui-redirect/UIRedirect';
import { UIInput } from '../../shared-components/ui-input/UIInput';
import { UISubmit } from '../../shared-components/ui-submit/UISubmit';
import { UITitle } from '../../shared-components/ui-title/UITitle';
import logo from '../../images/logo.svg';

import './Register.css';

export function Register({ onSubmit, isLoading }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {handleChange, isValid } = useFormWithValidation();

  const handleChangeName = (e) => {
    handleChange(e);
    setName(e.target.value);
  };

  const handleChangeEmail = (e) => {
    handleChange(e);
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    handleChange(e);
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    handleChange(e);
    e.preventDefault();
    onSubmit({ name, email, password });
  };

  return (
    <>
      <section className="entry-form">
        <div className="entry-form__container">
          <form className="entry-form__form" onSubmit={handleSubmit}>
            <Link to={ROUTES.About}>
              <img src={logo} className="entry-form__logo" alt="logo" />
            </Link>
            <UITitle label="Добро пожаловать!" />
            <UIInput label="Имя" type={INPUT_TYPES.Name} required value={name} handleChange={handleChangeName} />
            <UIInput label="E-mail" type={INPUT_TYPES.Email} required value={email} handleChange={handleChangeEmail} />
            <UIInput
              label="Пароль"
              type={INPUT_TYPES.Password}
              required
              value={password}
              handleChange={handleChangePassword}
            />
            <div className="entry-form__input entry-form__input_type_register">
              <UISubmit label="Зарегистрироваться" name="signUp" disabled={isLoading || !isValid} />
            </div>
            <UIRedirect label="Уже зарегистрированы?" redirectLabel="Войти" link={ROUTES.SignIn} />
          </form>
        </div>
      </section>
      {isLoading && (
        <div className="entry-form__loader">
          <Preloader />
        </div>
      )}
    </>
  );
}
