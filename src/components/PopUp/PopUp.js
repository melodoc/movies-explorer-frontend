import { useRef } from 'react';
import { UILink } from '../../shared-components/ul-link/UILink';
import { useOutsideAlerter } from '../../hooks/useOutsideAlerter';
import { iconType } from '../../constants/iconType';
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
          <UILink label="Главная" link="." font={font} isVertical />
          {/* FIXME: Добавить определение текуще страницы автоматически  */}
          <UILink
            label="Фильмы"
            link="."
            font={font}
            isVertical
            hasDecoration
          />
          <UILink label="Сохранённые фильмы" link="." font={font} />
        </ul>
        <ul className="popup__links">
          <UILink
            label="Аккаунт"
            link="."
            isWithIcon
            iconType={iconType.Profile}
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
