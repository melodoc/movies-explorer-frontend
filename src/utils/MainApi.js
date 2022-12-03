import { BaseApi } from '../server/Api';
import { baseRequestParams } from '../constants/requestParams';

class Api extends BaseApi {
  getUserInformation() {
    return this._fetchHandle(this._methods.GET, '/users/me');
  }

  getCards() {
    return this._fetchHandle(this._methods.GET, '/cards');
  }

  setUserInfo(name, about) {
    return this._fetchHandle(this._methods.PATCH, '/users/me', {
      name,
      about
    });
  }

  addNewCard(name, link) {
    return this._fetchHandle(this._methods.POST, '/cards', {
      name,
      link
    });
  }

  deleteCardById(cardId) {
    return this._fetchHandle(this._methods.DELETE, `/cards/${cardId}`);
  }

  changeLikeCardStatus(cardId, setLike) {
    return setLike ? this.setLikeById(cardId) : this.deleteLikeById(cardId);
  }

  setLikeById(cardId) {
    return this._fetchHandle(this._methods.PUT, `/cards/${cardId}/likes`);
  }

  deleteLikeById(cardId) {
    return this._fetchHandle(this._methods.DELETE, `/cards/${cardId}/likes`);
  }

  updateUserAvatar(avatar) {
    return this._fetchHandle(this._methods.PATCH, `/users/me/avatar`, {
      avatar
    });
  }
}

class AuthApi extends BaseApi {
  signUp(email, password) {
    return this._fetchHandle(this._methods.POST, '/signUp', {
      email,
      password
    });
  }

  signIn(email, password) {
    return this._fetchHandle(this._methods.POST, '/signIn', {
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

export const apiClient = new Api(baseRequestParams);

export const authApiClient = new AuthApi(baseRequestParams);
