import { ROUTES } from '../constants/routes';
import { HEADER_TYPES } from '../constants/headerTypes';

export class RootPageHelper {
  static getPageProps(location) {
    const hasHeader = [ROUTES.About, ROUTES.Movies, ROUTES.SavedMovies, ROUTES.Profile].includes(location?.pathname);
    const hasFooter = [ROUTES.About, ROUTES.Movies, ROUTES.SavedMovies].includes(location?.pathname);
    const headerType = location?.pathname === ROUTES.About ? HEADER_TYPES.Banner : HEADER_TYPES.Main;
    return { headerType, hasHeader, hasFooter };
  }
}
