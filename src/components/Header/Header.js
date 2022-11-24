import { useState } from 'react';
import { DocumentBreakpoints } from '../../utils/documentBreakpoints';
import { HeaderHelper } from '../../utils/headerHelper';
import { UILink } from '../../shared-components/ul-link/UILink';
import { UIButton } from '../../shared-components/ui-button/UIButton';
import { Portal } from '../../components/Portal/Portal';
import { PopUp } from '../../components/PopUp/PopUp';
import { ICON_TYPES } from '../../constants/iconTypes';
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
        <a className="header__link" href="/">
          <img src={logo} alt="logo" />
        </a>
        {isLoggedInMock ? (
          <>
            {isDesktop ? (
              <div className="header__list">
                <ul className="header__links">
                  <UILink label="Фильмы" link="." />
                  <UILink
                    label="Сохранённые фильмы"
                    link="."
                    font={{ weight: 400 }}
                  />
                  <div className="header__link--wrapper">
                    <UILink
                      label="Аккаунт"
                      link="."
                      isWithIcon
                      iconType={ICON_TYPES.Profile}
                    />
                  </div>
                </ul>
              </div>
            ) : (
              <a
                className="header__list-menu_mobile"
                href="."
                onClick={handleMobileMenuPopup}
              >
                <img
                  className="header__list-menu_mobile"
                  src={menuSrc}
                  alt="menu"
                />
              </a>
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
              link="."
              font={{ size: '12px', lineHeight: '16px' }}
            />
            <UIButton
              label="Войти"
              link="."
              handleClick={handleSignUp}
            />
          </ul>
        )}
      </nav>
    </header>
  );
}
