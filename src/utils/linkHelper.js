import { DocumentBreakpoints } from './documentBreakpoints';
import { breakPointTypes } from '../constants/breakPointTypes';

const FONT_STYLES_MAP = new Map([
  [breakPointTypes.Tablet, { fontSize: '12px' }],
  [breakPointTypes.Mobile, { fontSize: '10px', lineHeight: '16px' }]
]);

export class LinkHelper {
  static getFontLinkStyle(font) {
    const baseFontLinkStyle = {
      fontWeight: font?.weight,
      fontSize: font?.size,
      lineHeight: font?.lineHeight
    };

    if (DocumentBreakpoints.getIsDesktop()) {
      return baseFontLinkStyle;
    }

    return DocumentBreakpoints.getIsTablet()
      ? {
          ...FONT_STYLES_MAP.get(breakPointTypes.Tablet),
          ...baseFontLinkStyle
        }
      : {
          ...FONT_STYLES_MAP.get(breakPointTypes.Mobile),
          ...baseFontLinkStyle
        };
  }

  static getLinkItemStyle(isVertical) {
    return isVertical ? 'link-item' : '';
  }

  static getLinkStyle(hasDecoration) {
    return `link ${hasDecoration ? 'link__selected-item' : ''}`;
  }

  static getLinkStyles(font, isVertical, hasDecoration) {
    return {
      font: LinkHelper.getFontLinkStyle(font),
      item: LinkHelper.getLinkItemStyle(isVertical),
      link: LinkHelper.getLinkStyle(hasDecoration)
    };
  }
}
