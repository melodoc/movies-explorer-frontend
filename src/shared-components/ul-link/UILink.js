import PropTypes from 'prop-types';
import { NavLink, useLocation } from 'react-router-dom';
import { ICON_TYPES } from '../../constants/iconTypes';
import { LinkHelper } from '../../helpers/linkHelper';
import profile from '../../images/profile.svg';

import './UILink.css';

const ICON_TYPE_MAP = new Map([[ICON_TYPES.Profile, { src: profile, alt: profile }]]);

export function UILink({ label, link, font, isWithIcon, isVertical, iconType }) {
  const { pathname } = useLocation();
  const image = ICON_TYPE_MAP.get(iconType);
  const linkStyles = LinkHelper.getLinkStyles(font, isVertical, link === pathname);

  return !isWithIcon ? (
    <li className={linkStyles.item}>
      <NavLink className={`${linkStyles.link}`} exact to={link} style={linkStyles.font}>
        {label}
      </NavLink>
    </li>
  ) : (
    <li className={linkStyles.item}>
      <NavLink className={`${linkStyles.link} link__image`} exact to={link}>
        <span className="link__text" style={linkStyles.font}>
          {label}
        </span>
        <img src={image?.src} alt={image?.alt} />
      </NavLink>
    </li>
  );
}

UILink.propTypes = {
  label: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  font: PropTypes.shape({
    weight: PropTypes.number,
    size: PropTypes.string,
    lineHeight: PropTypes.string
  }),
  isWithIcon: PropTypes.bool,
  isVertical: PropTypes.bool,
  iconType: PropTypes.string,
  hasDecoration: PropTypes.bool
};
