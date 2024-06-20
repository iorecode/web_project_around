export class Card {
  constructor(cards, selector, handleConfirm, currentUserId, handleLikes) {
    this._name = cards.name;
    this._link = cards.link;
    this._cardID = cards._id;
    this._ownerID = cards.owner._id;
    this._likes = cards.likes;
    this._cardSelector = selector;
    this._handleConfirm = handleConfirm;
    this._currentUserId = currentUserId;
    this._handleLikes = handleLikes;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._cardSelector).content;
    const cardElement = cardTemplate
      .querySelector(".photo__card")
      .cloneNode(true);
    return cardElement;
  }

  _setListeners() {
    const likeButton = this._card.querySelector(".photo__like");
    const deleteButton = this._card.querySelector(".photo__delete");
    if (this._ownerID === this._currentUserId) {
      deleteButton.addEventListener("click", () => {
        this._handleConfirm(this);
      });
    } else {
      deleteButton.style.display = "none"; // Esconde o botao de deletar caso usuario nao for o dono
    }

    likeButton.addEventListener("click", () =>
      this._handleLikes(this._cardID, this._card)
    );
  }

  updateLikes(data) {
    const likeButton = this._card.querySelector(".photo__like");
    const likeCount = this._card.querySelector(".photo__like-count");

    likeCount.textContent = data.likes.length;

    if (data.likes.some((like) => like._id === this._currentUserId)) {
      likeButton.classList.add("photo__like_active");
    } else {
      likeButton.classList.remove("photo__like_active");
    }
  }

  generateCard() {
    this._card = this._getTemplate();
    this._card.querySelector(".photo__card-image").src = this._link;
    this._card.querySelector(".photo__card-image").alt = this._name;
    this._card.querySelector(".photo__text").textContent = this._name;
    this._card.querySelector(".photo__like-count").textContent =
      this._likes.length;

    if (this._likes.some((like) => like._id === this._currentUserId)) {
      this._card
        .querySelector(".photo__like")
        .classList.add("photo__like_active");
    }

    console.log("Card generated:", this._card); // Debug log
    this._setListeners();
    return this._card;
  }

  handleNoPics() {
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
