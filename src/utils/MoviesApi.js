import { BaseApi } from '../server/Api';
import { beatfilmMoviesRequestParams } from '../constants/requestParams';

class MoviesApi extends BaseApi {
  getMovies() {
    return this._fetchHandle(this._methods.GET);
  }
}

export const moviesApiClient = new MoviesApi(
  beatfilmMoviesRequestParams
);
