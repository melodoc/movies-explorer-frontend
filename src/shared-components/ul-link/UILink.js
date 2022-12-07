import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ICON_TYPES } from '../../constants/iconTypes';
import { LinkHelper } from '../../helpers/linkHelper';
import profile from '../../images/profile.svg';

import './UILink.css';

const ICON_TYPE_MAP = new Map([[ICON_TYPES.Profile, { src: profile, alt: profile }]]);

export function UILink({ label, link, font, isWithIcon, isVertical, iconType, hasDecoration }) {
  const image = ICON_TYPE_MAP.get(iconType);
  const linkStyles = LinkHelper.getLinkStyles(font, isVertical, hasDecoration);

  return !isWithIcon ? (
    <li className={linkStyles.item}>
      <Link className={linkStyles.link} to={link} style={linkStyles.font}>
        {label}
      </Link>
    </li>
  ) : (
    <li className={linkStyles.item}>
      <Link className={`${linkStyles.link} link__image`} to={link}>
        <span className="link__text" style={linkStyles.font}>
          {label}
        </span>
        <img src={image?.src} alt={image?.alt} />
      </Link>
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
