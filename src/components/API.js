export default class API {
  constructor(data) {
    this._standardUrl = data.url;
    this._headers = data.headers;
  }

  getInitialCards() {
    return fetch(`${this._standardUrl}/cards`, {
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          console.log("cards loaded successfully");
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error("Error in getInitialCards:", err);
        return Promise.reject(err);
      });
  }

  getUserData() {
    return fetch(`${this._standardUrl}/users/me`, {
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          console.log(res);
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error("Error in getUserData:", err);
        return Promise.reject(err);
      });
  }

  saveProfileChanges(userData) {
    console.log("Saving profile changes:", userData);
    return fetch(`${this._standardUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.about,
      }),
    })
      .then((res) => {
        console.log("Received response:", res);
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error("Error in saveProfileChanges:", err);
        return Promise.reject(err);
      });
  }

  updateProfilePicture({ avatar }) {
    console.log("Updating profile picture with URL:", avatar);
    return fetch(`${this._standardUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar }),
    })
      .then((res) => {
        console.log("Received response:", res);
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error("Error in updateProfilePicture:", err);
        return Promise.reject(err);
      });
  }

  addCard(cardData) {
    return fetch(`${this._standardUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error("Error in addCard:", err);
        return Promise.reject(err);
      });
  }

  deleteCard(cardId) {
    return fetch(`${this._standardUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error("Error in deleteCard:", err);
        return Promise.reject(err);
      });
  }

  addLike(cardId) {
    return fetch(`${this._standardUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error("Error in addLike:", err);
        return Promise.reject(err);
      });
  }

  removeLike(cardId) {
    return fetch(`${this._standardUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error("Error in removeLike:", err);
        return Promise.reject(err);
      });
  }
}
