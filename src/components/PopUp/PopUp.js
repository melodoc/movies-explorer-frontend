import { useRef } from 'react';
import { UILink } from '../../shared-components/ul-link/UILink';
import { useOutsideAlerter } from '../../hooks/useOutsideAlerter';
import { ROUTES } from '../../constants/routes';
import { ICON_TYPES } from '../../constants/iconTypes';
import close from '../../images/close.svg';

import './PopUp.css';

export function PopUp({ onToggleMobileMenu }) {
  const wrapperRef = useRef(null);
  const font = { size: '18px', lineHeight: '22px', weight: 500 };
  useOutsideAlerter(wrapperRef, onToggleMobileMenu);

  return (
    <nav className="popup" ref={wrapperRef}>
      <div className="popup__list">
        <ul className="popup__links">
          <UILink
            label="Главная"
            link={ROUTES.About}
            font={font}
            isVertical
          />
          {/* FIXME: Добавить определение текуще страницы автоматически  */}
          <UILink
            label="Фильмы"
            link={ROUTES.Movies}
            font={font}
            isVertical
            hasDecoration
          />
          <UILink
            label="Сохранённые фильмы"
            link={ROUTES.SavedMovies}
            font={font}
          />
        </ul>
        <ul className="popup__links">
          <UILink
            label="Аккаунт"
            link={ROUTES.Profile}
            isWithIcon
            iconType={ICON_TYPES.Profile}
            font={{ weight: 500, size: '13px', lineHeight: '12px' }}
          />
        </ul>
        <button
          className="popup__button"
          onClick={onToggleMobileMenu}
        >
          <img src={close} alt="close" />
        </button>
      </div>
    </nav>
  );
}
