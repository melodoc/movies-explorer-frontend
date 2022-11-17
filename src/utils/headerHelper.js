import { headerType } from '../constants/headerType';

export class HeaderHelper {
  static isBanner(type) {
    return type === headerType.Banner;
  }
}
