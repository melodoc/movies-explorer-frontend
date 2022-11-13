import { useState } from 'react';
import { DocumentBreakpoints } from '../../utils/documentBreakpoints';

import logo from '../../images/logo.svg';
import profile from '../../images/profile.svg';
import close from '../../images/close.svg';
import menu from '../../images/menu.svg';

import './Header.css';

export function Header() {
  // FIXME: Разделить на компонентны 
  const isLoggedIn = false;
  const isDesktop = DocumentBreakpoints.getIsDesktop();

  const [isMobileMenuPopupOpen, setIsMobileMenuPopupOpen] =
    useState(isDesktop);

  const handleMobileMenuClick = (e) => {
    e.preventDefault();
    setIsMobileMenuPopupOpen(!isMobileMenuPopupOpen);
  };

  const handleMobileMenuClose = (e) => {
    e.preventDefault();
    setIsMobileMenuPopupOpen(false);
  };

  return (
    <header
      className={
        'header ' + (!isLoggedIn ? 'header-banner' : 'header-main')
      }
    >
      <nav className="header__nav">
        <a className="header__link" href="/">
          <img src={logo} alt="logo" />
        </a>
        {isLoggedIn ? (
          <>
            {isMobileMenuPopupOpen && (
              <div className="header__list header__list-type_narrow">
                <ul className="header__links">
                  {!isDesktop && (
                    <li>
                      <a
                        className="header__link header__link-type_label header__link-account-link"
                        href="."
                      >
                        Главная
                      </a>
                    </li>
                  )}
                  <li>
                    <a
                      className="header__link header__link-type_label header__link-account-link"
                      href="."
                    >
                      Фильмы
                    </a>
                  </li>
                  <li>
                    <a
                      className="header__link header__link-type_label header__link-account-link"
                      href="."
                    >
                      Сохранённые фильмы
                    </a>
                  </li>
                </ul>
                <a
                  className="header__link header__link-type_label header__link-type_account"
                  href="."
                >
                  <span className="header__link-account-text">
                    Аккаунт
                  </span>
                  <img src={profile} alt="profile" />
                </a>
                {!isDesktop && (
                  <button
                    className="header__list-menu_mobile-button"
                    onClick={handleMobileMenuClose}
                  >
                    <img src={close} alt="close" />
                  </button>
                )}
              </div>
            )}
            <a
              className="header__list-menu_mobile"
              href="."
              onClick={handleMobileMenuClick}
            >
              <img
                className="header__list-menu_mobile"
                src={menu}
                alt="menu"
              />
            </a>
          </>
        ) : (
          <ul className="header__list">
            <li>
              <a
                className="header__link header__link-type_label"
                href="."
              >
                Регистрация
              </a>
            </li>
            <li>
              <a
                className="header__link header__link--button"
                href="."
              >
                Войти
              </a>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}
