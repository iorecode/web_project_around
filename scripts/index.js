import { setupEventListeners } from "./utils.js";
import { Validate } from "./validate.js";
import { Card, initialCards } from "./Card.js";

const formProfile = document.querySelector("#FormProfile");
const formUpload = document.querySelector("#FormUpload");
const formEdit = document.querySelector(".user__edit");
const buttonAdd = document.querySelector(".user__add");

const formProfileValidator = new Validate(
  {
    inputSelector: ".form__input",
    submitButtonSelector: ".form__button",
    inactiveButtonClass: "form__button-disabled",
    inputErrorClass: "form__input-invalid",
    errorClass: "form__input-error",
  },
  formProfile
);
formProfileValidator.enableValidation();

const formUploadValidator = new Validate(
  {
    inputSelector: ".form__input",
    submitButtonSelector: ".form__button",
    inactiveButtonClass: "form__button-disabled",
    inputErrorClass: "form__input-invalid",
    errorClass: "form__input-error",
  },
  formUpload
);
formUploadValidator.enableValidation();

setupEventListeners(formProfile, formUpload, formEdit, buttonAdd);

// Initialize cards
initialCards.forEach((i) => {
  const card = new Card(i, "#card-template");
  const cardElement = card.generateCard();
  document.querySelector(".photo").prepend(cardElement);
});
