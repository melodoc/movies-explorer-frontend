import { DocumentBreakpoints } from './documentBreakpoints';
import { BREAK_POINT_TYPES } from '../constants/breakPointTypes';

const FONT_STYLES_MAP = new Map([
  [BREAK_POINT_TYPES.Tablet, { fontSize: '12px' }],
  [BREAK_POINT_TYPES.Mobile, { fontSize: '10px', lineHeight: '16px' }]
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
          ...FONT_STYLES_MAP.get(BREAK_POINT_TYPES.Tablet),
          ...baseFontLinkStyle
        }
      : {
          ...FONT_STYLES_MAP.get(BREAK_POINT_TYPES.Mobile),
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
