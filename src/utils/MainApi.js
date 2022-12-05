import { BaseApi } from '../server/Api';
import { moviesRequestParams } from '../constants/requestParams';

class MainApi extends BaseApi {
  //POST /movies
  addNewMovies(card) {
    return this._fetchHandle(this._methods.POST, '/movies', card);
  }

  deleteMovieById(movieId) {
    return this._fetchHandle(this._methods.DELETE, `/movies/${movieId}`);
  }

  getMovies() {
    return this._fetchHandle(this._methods.GET, '/movies');
  }

  // getUserInformation() {
  //   return this._fetchHandle(this._methods.GET, '/users/me');
  // }

  // setUserInfo(name, about) {
  //   return this._fetchHandle(this._methods.PATCH, '/users/me', {
  //     name,
  //     about
  //   });
  // }

  // changeLikeCardStatus(cardId, setLike) {
  //   return setLike ? this.setLikeById(cardId) : this.deleteLikeById(cardId);
  // }

  // setLikeById(cardId) {
  //   return this._fetchHandle(this._methods.PUT, `/cards/${cardId}/likes`);
  // }

  // deleteLikeById(cardId) {
  //   return this._fetchHandle(this._methods.DELETE, `/cards/${cardId}/likes`);
  // }

  // updateUserAvatar(avatar) {
  //   return this._fetchHandle(this._methods.PATCH, `/users/me/avatar`, {
  //     avatar
  //   });
  // }
}

class AuthApi extends BaseApi {
  register({ name, email, password }) {
    console.info(name, email, password);
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
