export const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

export class Card {
  constructor(cards, selector) {
    this._title = cards.name;
    this._link = cards.link;
    this._cardSelector = selector;
    this._popupElement = document.querySelector(".popup");
    this._popupImage = this._popupElement.querySelector(".popup__image");
    this._popupSubtitle = this._popupElement.querySelector(
      ".popup__image-subtitle"
    );
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
    const cardImage = this._card.querySelector(".photo__card-image");
    deleteButton.addEventListener("click", () => {
      this._card.remove();
      this._handleNoPics();
    });
    likeButton.addEventListener("click", (evt) => {
      evt.target.classList.toggle("photo__like_active");
    });
    cardImage.addEventListener("click", () => {
      this.openImage();
    });
    const closeButton = this._popupElement.querySelector(".popup__close");
    closeButton.addEventListener("click", () => {
      this.closeImage();
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

  openImage() {
    this._popupImage.src = this._link;
    this._popupSubtitle.textContent = this._title;
    this._popupElement.style.display = "block";
    document.querySelector("#MainSiteOpacity").classList.add("page__opacity");
  }

  closeImage() {
    this._popupImage.src = "";
    this._popupSubtitle.textContent = "";
    this._popupElement.style.display = "none";
    document
      .querySelector("#MainSiteOpacity")
      .classList.remove("page__opacity");
  }
}
