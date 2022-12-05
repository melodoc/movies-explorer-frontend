import { LOCAL_STORAGE_KEYS } from '../constants/localStorageKeys';

export class BaseApi {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
    this._methods = {
      GET: 'GET',
      POST: 'POST',
      DELETE: 'DELETE',
      PUT: 'PUT',
      PATCH: 'PATCH'
    };
  }

  async _fetchHandle(method, path, options) {
    const fetchPath = !!path ? `${this.baseUrl}${path}` : `${this.baseUrl}`;
    const token = localStorage.getItem(LOCAL_STORAGE_KEYS.Token);
    const fetchHeaders = !token
      ? this.headers
      : {
          ...this.headers,
          Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEYS.Token)}`
        };

    const res = await fetch(fetchPath, {
      method,
      headers: fetchHeaders,
      body: JSON.stringify(options)
    });
    if (res.ok) {
      return res.json();
    }
    return await Promise.reject(`Ошибка: ${res.status}`);
  }
}
