export class Card {
  constructor(cards, selector, handleCardClick) {
    this._title = cards.name;
    this._link = cards.link;
    this._cardSelector = selector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._cardSelector).content;
    const cardElement = cardTemplate
      .querySelector(".photo__card")
      .cloneNode(true);
    return cardElement;
  }

  _setListeners() {
    const cardImage = this._card.querySelector(".photo__card-image");
    const likeButton = this._card.querySelector(".photo__like");
    const deleteButton = this._card.querySelector(".photo__delete");
    deleteButton.addEventListener("click", () => {
      this._card.remove();
      this._handleNoPics();
    });
    likeButton.addEventListener("click", (evt) => {
      evt.target.classList.toggle("photo__like_active");
    });
    cardImage.addEventListener("click", () => {
      this._handleCardClick;
    });
  }

  generateCard() {
    this._card = this._getTemplate();
    this._card.querySelector(".photo__card-image").src = this._link;
    this._card.querySelector(".photo__card-image").alt = this._title;
    this._card.querySelector(".photo__text").textContent = this._title;
    this._setListeners();
    return this._card;
  }

  _handleNoPics() {
    const pictures = document.querySelectorAll(".photo__card");
    const emptyMessage = document.querySelector(".photo__empty");
    if (pictures.length === 0) {
      document
        .querySelector(".photo")
        .insertAdjacentHTML(
          "afterbegin",
          `<p class="photo__empty">NO PICTURES</p>`
        );
    } else {
      if (emptyMessage) {
        emptyMessage.remove();
      }
    }
  }
}
