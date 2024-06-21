import { pageOpacity, imageClose, formClose } from "../utils/constants.js";

export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._isOpen = false;
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  open() {
    pageOpacity.classList.add("page__opacity-toggled");
    pageOpacity.style.display = "block";
    document.addEventListener("keydown", this._handleEscClose);
    this._isOpen = true;
  }

  close() {
    pageOpacity.classList.remove("page__opacity-toggled");
    pageOpacity.style.display = "none";
    document.removeEventListener("keydown", this._handleEscClose);
    this._isOpen = false;
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    document.addEventListener("click", (evt) => {
      if (pageOpacity.contains(evt.target)) {
        this.close();
      }
    });
    imageClose.addEventListener("click", () => {
      this.close();
    });
    formClose.forEach((button) => {
      button.addEventListener("click", () => {
        this.close();
      });
    });
  }
}

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupSubtitle = this._popup.querySelector(".popup__image-subtitle");
    this._popupImage = this._popup.querySelector(".popup__image");
  }
  open(imageSrc, title) {
    super.open();
    this._popup.style.display = "inline-block";
    this._popupImage.src = imageSrc;
    this._popupSubtitle.textContent = title;
  }

  close() {
    super.close();
    this._popup.style.display = "none";
    this._popupImage.src = "";
    this._popupSubtitle.textContent = "";
  }

  setEventListeners() {
    super.setEventListeners();
    document.addEventListener("click", () => {
      if (this._isOpen) {
        this.close();
      }
    });
  }
}

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit, validator) {
    super(popupSelector);
    this._handleSubmit = handleSubmit.bind(this);
    this._inputList = this._popup.querySelectorAll(".form__input");
    this._validator = validator; // Add a reference to the validator
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    const CloseButtons = document.querySelectorAll(".form__btn-close");
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._getInputValues());
    });
    CloseButtons.forEach((button) => {
      button.addEventListener("click", () => {
        this.close();
      });
    });
  }

  close() {
    super.close();
    this._getInputValues();
    this._popup.classList.remove("form_opened");
    this._inputList.forEach((input) => {
      input.value = "";
      console.log("cleared");
    });
  }

  open() {
    super.open();
    this._popup.classList.add("form_opened");
    this._validator.resetValidation(); // Reset validation state when the form is opened
  }
}

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
  }

  open(target) {
    super.open();
    this._target = target;
    this._popup.classList.add("form_opened");
  }

  close() {
    super.close();
    this._popup.classList.remove("form_opened");
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._target);
      this.close();
    });
  }
}
