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

  _fetchHandle(method, path, options) {
    const fetchPath = !!path ? `${this.baseUrl}${path}` : `${this.baseUrl}`;
    const token = localStorage.getItem('token');
    const fetchHeaders = !!token
      ? this.headers
      : {
          ...this.headers,
          Authorization: `Bearer ${localStorage.getItem('token')}`
        };

    return fetch(fetchPath, {
      method,
      headers: fetchHeaders,
      body: JSON.stringify(options)
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
}
