import "./index.css";
import { Validate } from "../components/Validate.js";
import { Card } from "../components/Card.js";
import { PopupWithForm, PopupWithImage } from "../components/Popup.js";
import {
  handleUploadFormSubmit,
  handleProfileFormSubmit,
  setupPopups,
} from "../utils/utils.js";
import {
  initialCards,
  aboutInput,
  nameInput,
  formProfile,
  formUpload,
  formEdit,
  buttonAdd,
  photoContainer,
} from "../utils/constants.js";
import { Section } from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

const ProfileCards = new Section(
  {
    data: initialCards,
    renderer: (i) => {
      const card = new Card(i, "#card-template");
      const cardElement = card.generateCard();
      ProfileCards.setItem(cardElement);
    },
  },
  photoContainer
);

ProfileCards.renderItem();

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

setupPopups(".photo__card");

const popupProfile = new PopupWithForm("#FormProfile", handleProfileFormSubmit);
popupProfile.setEventListeners();

const UserValues = new UserInfo({
  nameSelector: ".user__name",
  aboutSelector: ".user__role",
});

const popupUpload = new PopupWithForm("#FormUpload", handleUploadFormSubmit);
popupUpload.setEventListeners();
formEdit.addEventListener("click", () => {
  popupProfile.open();
  const currentValues = UserValues.getUserInfo();
  nameInput.value = currentValues.name;
  aboutInput.value = currentValues.about;
});
buttonAdd.addEventListener("click", () => {
  popupUpload.open();
});
