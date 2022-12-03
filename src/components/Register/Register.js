import { Link, useHistory } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { INPUT_TYPES } from '../../constants/inputTypes';
import { UIRedirect } from '../../shared-components/ui-redirect/UIRedirect';
import { UIInput } from '../../shared-components/ui-input/UIInput';
import { UISubmit } from '../../shared-components/ui-submit/UISubmit';
import { UITitle } from '../../shared-components/ui-title/UITitle';
import logo from '../../images/logo.svg';

import './Register.css';

export function Register() {
  const history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();
    history.push(ROUTES.SignIn);
  };

  return (
    <section className="entry-form">
      <div className="entry-form__container">
        <form className="entry-form__form" onSubmit={onSubmit}>
          <Link to={ROUTES.About}>
            <img src={logo} className="entry-form__logo" alt="logo" />
          </Link>
          <UITitle label="Добро пожаловать!" />
          <UIInput label="Имя" type={INPUT_TYPES.Text} required />
          <UIInput label="E-mail" type={INPUT_TYPES.Email} required />
          <UIInput label="Пароль" type={INPUT_TYPES.Password} required />
          <div className="entry-form__input entry-form__input_type_register">
            <UISubmit label="Зарегистрироваться" name="signUp" />
          </div>
          <UIRedirect label="Уже зарегистрированы?" redirectLabel="Войти" link={ROUTES.SignIn} />
        </form>
      </div>
    </section>
  );
}
