import PropTypes from 'prop-types';
import { ICON_TYPES } from '../../constants/iconTypes';
import { LinkHelper } from '../../utils/linkHelper';
import profile from '../../images/profile.svg';

import './UILink.css';

const ICON_TYPE_MAP = new Map([
  [ICON_TYPES.Profile, { src: profile, alt: profile }]
]);

export function UILink({
  label,
  link,
  font,
  isWithIcon,
  isVertical,
  iconType,
  hasDecoration
}) {
  const image = ICON_TYPE_MAP.get(iconType);
  const linkStyles = LinkHelper.getLinkStyles(
    font,
    isVertical,
    hasDecoration
  );

  return !isWithIcon ? (
    <li className={linkStyles.item}>
      <a
        className={linkStyles.link}
        href={link}
        style={linkStyles.font}
      >
        {label}
      </a>
    </li>
  ) : (
    <li className={linkStyles.item}>
      <a className={`${linkStyles.link} link__image`} href={link}>
        <span className="link__text" style={linkStyles.font}>
          {label}
        </span>
        <img src={image?.src} alt={image?.alt} />
      </a>
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
