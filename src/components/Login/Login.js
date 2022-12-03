import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { INPUT_TYPES } from '../../constants/inputTypes';
import { Preloader } from '../../components/Preloader/Preloader';
import { UIRedirect } from '../../shared-components/ui-redirect/UIRedirect';
import { UIInput } from '../../shared-components/ui-input/UIInput';
import { UISubmit } from '../../shared-components/ui-submit/UISubmit';
import { UITitle } from '../../shared-components/ui-title/UITitle';
import logo from '../../images/logo.svg';

import './Login.css';

export function Login() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      history.push(ROUTES.Movies);
    }, 1000);
  };

  return (
    <>
      <section className="entry-form">
        <div className="entry-form__container">
          <form className="entry-form__form" onSubmit={onSubmit}>
            <Link to={ROUTES.About}>
              <img src={logo} className="entry-form__logo" alt="logo" />
            </Link>
            <UITitle label="Рады видеть!" />
            <UIInput label="E-mail" type={INPUT_TYPES.Email} required />
            <UIInput label="Пароль" type={INPUT_TYPES.Password} required />
            <div className="entry-form__input">
              <UISubmit label="Войти" name="login" link={ROUTES.Movies} />
            </div>
            <UIRedirect label="Еще не зарегистрированы?" redirectLabel="Регистрация" link={ROUTES.SignUp} />
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
