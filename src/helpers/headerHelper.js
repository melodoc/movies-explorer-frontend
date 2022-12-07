import { HEADER_TYPES } from '../constants/headerTypes';

export class HeaderHelper {
  static isBanner(type) {
    return type === HEADER_TYPES.Banner;
  }
}
