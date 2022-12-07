import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { INPUT_TYPES } from '../../constants/inputTypes';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import { UIRedirect } from '../../shared-components/ui-redirect/UIRedirect';
import { UIInput } from '../../shared-components/ui-input/UIInput';
import { UISubmit } from '../../shared-components/ui-submit/UISubmit';
import { UITitle } from '../../shared-components/ui-title/UITitle';
import logo from '../../images/logo.svg';

import './Login.css';

export function Login({ onSubmit, isLoading }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { handleChange, isValid } = useFormWithValidation();
  const [validity, setValidity] = useState({});
  const [customIsValid, setCustomIsValid] = useState(Object.values(validity).every((valid) => valid)); 

  useEffect(() => {
    setCustomIsValid(Object.values(validity).every((valid) => valid));
  }, [validity])

  console.info(customIsValid);

  const handleChangeEmail = (e, valid) => {
    handleChange(e);
    setEmail(e.target.value);
    setValidity({ ...validity, email: valid });
  };

  const handleChangePassword = (e, valid) => {
    handleChange(e);
    setPassword(e.target.value);
    setValidity({ ...validity, password: valid });
  };

  const handleSubmit = (e) => {
    handleChange(e);
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
            <UIInput label="E-mail" type={INPUT_TYPES.Email} required handleChange={handleChangeEmail} />
            <UIInput label="Пароль" type={INPUT_TYPES.Password} required handleChange={handleChangePassword} />
            <div className="entry-form__input">
              <UISubmit
                label="Войти"
                name="login"
                link={ROUTES.Movies}
                disabled={isLoading || !isValid || !customIsValid}
              />
            </div>
            <UIRedirect label="Еще не зарегистрированы?" redirectLabel="Регистрация" link={ROUTES.SignUp} />
          </form>
        </div>
      </section>
    </>
  );
}
