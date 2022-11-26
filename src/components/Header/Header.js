import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DocumentBreakpoints } from '../../utils/documentBreakpoints';
import { HeaderHelper } from '../../utils/headerHelper';
import { UILink } from '../../shared-components/ul-link/UILink';
import { UIButton } from '../../shared-components/ui-button/UIButton';
import { Portal } from '../../components/Portal/Portal';
import { PopUp } from '../../components/PopUp/PopUp';
import { ICON_TYPES } from '../../constants/iconTypes';
import { ROUTES } from '../../constants/routes';
import logo from '../../images/logo.svg';
import menu from '../../images/menu.svg';
import menu_mobile from '../../images/menu_mobile.svg';

import './Header.css';

export function Header({ isLoggedIn, type }) {
  const [isMobileMenuPopupOpen, setIsMobileMenuPopupOpen] =
    useState(false);

  const [isLoggedInMock, setIsLoggedInMock] = useState(isLoggedIn);
  const isDesktop = DocumentBreakpoints.getIsDesktop();
  const menuSrc = DocumentBreakpoints.getIsMobile
    ? menu_mobile
    : menu;

  const handleMobileMenuPopup = (e) => {
    e.preventDefault();
    setIsMobileMenuPopupOpen(!isMobileMenuPopupOpen);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setIsLoggedInMock(!isLoggedInMock);
  };

  return (
    <header
      className={`header ${
        HeaderHelper.isBanner(type) ? 'header-banner' : 'header-main'
      }`}
    >
      <nav className="header__nav">
        <Link to={ROUTES.About} className="header__link">
          <img src={logo} alt="logo" />
        </Link>
        {isLoggedInMock ? (
          <>
            {isDesktop ? (
              <div className="header__list">
                <ul className="header__links">
                  <UILink label="Фильмы" link={ROUTES.Movies} />
                  <UILink
                    label="Сохранённые фильмы"
                    link={ROUTES.SavedMovies}
                    font={{ weight: 400 }}
                  />
                  <div className="header__link--container">
                    <UILink
                      label="Аккаунт"
                      link={ROUTES.Profile}
                      isWithIcon
                      iconType={ICON_TYPES.Profile}
                    />
                  </div>
                </ul>
              </div>
            ) : (
              <button
                className="header__list-menu_button"
                onClick={handleMobileMenuPopup}
              >
                <img
                  className="header__list-menu_mobile"
                  src={menuSrc}
                  alt="menu"
                />
              </button>
            )}
            {isMobileMenuPopupOpen && (
              <Portal>
                <PopUp
                  isLoggedIn={isLoggedInMock}
                  onToggleMobileMenu={handleMobileMenuPopup}
                  onSignUp={handleSignUp}
                />
              </Portal>
            )}
          </>
        ) : (
          <ul className="header__list">
            <UILink
              label="Регистрация"
              link={ROUTES.SignUp}
              font={{ size: '12px', lineHeight: '16px' }}
            />
            <UIButton
              label="Войти"
              link={ROUTES.SignIn}
            />
          </ul>
        )}
      </nav>
    </header>
  );
}
