import { BaseApi } from '../server/Api';
import { moviesRequestParams } from '../constants/requestParams';

class MainApi extends BaseApi {
  addNewMovies(card) {
    return this._fetchHandle(this._methods.POST, '/movies', card);
  }

  deleteMovieById(movieId) {
    return this._fetchHandle(this._methods.DELETE, `/movies/${movieId}`);
  }

  getMovies() {
    return this._fetchHandle(this._methods.GET, '/movies');
  }

  getUserInformation() {
    return this._fetchHandle(this._methods.GET, '/users/me');
  }

  setUserInfo({ email, name }) {
    return this._fetchHandle(this._methods.PATCH, '/users/me', {
      email,
      name
    });
  }
}

class AuthApi extends BaseApi {
  register({ name, email, password }) {
    return this._fetchHandle(this._methods.POST, '/signup', {
      name,
      email,
      password
    });
  }

  login({ email, password }) {
    return this._fetchHandle(this._methods.POST, '/signin', {
      email,
      password
    });
  }

  checkValidity(token) {
    if (!token) {
      return Promise.reject('Токен не передан');
    }
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject('Токен не валидный');
      }
    });
  }
}

export const mainApiClient = new MainApi(moviesRequestParams);

export const authApiClient = new AuthApi(moviesRequestParams);
