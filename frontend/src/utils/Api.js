class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _getTokenHeaders() {
    const token = localStorage.getItem('jwt');
    return {
      ...this._headers,
      authorization: `Bearer ${token}`
    };
  }

  // Получение информации о пользователе
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._getTokenHeaders()
    })
    .then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._getTokenHeaders()
    })
    .then(this._checkResponse);
  }

  updateProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._getTokenHeaders(),
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(this._checkResponse);
  }

  addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._getTokenHeaders(),
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._getTokenHeaders(),
    })
    .then(this._checkResponse);
  }

  changeLikeCardStatus(cardId, like) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: like ? 'PUT' : 'DELETE',
      headers: this._getTokenHeaders(),
    })
    .then(this._checkResponse);
  }

  updateAvatar(avatarURL) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._getTokenHeaders(),
      body: JSON.stringify({
        avatar: avatarURL
      })
    })
    .then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: 'https://api.belacqua-mesto.nomoredomainsmonster.ru',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;