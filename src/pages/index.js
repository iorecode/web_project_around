import "./index.css";
import { Validate } from "../components/Validate.js";
import { Card } from "../components/Card.js";
import { PopupWithConfirmation, PopupWithForm } from "../components/Popup.js";
import {
  handleUploadFormSubmit,
  handleProfileFormSubmit,
  setupPopups,
  setupProfileEdit,
  renderLoad,
  handleConfirmationSubmit,
  handleLikes,
} from "../utils/utils.js";
import {
  formProfile,
  formUpload,
  formEdit,
  buttonAdd,
  photoContainer,
  userimage,
  nameInput,
  aboutInput,
} from "../utils/constants.js";
import { Section } from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import API from "../components/API.js";

const api = new API({
  url: "https://around.nomoreparties.co/v1/web-ptbr-cohort-11",
  headers: {
    authorization: "ef61af7f-62bd-42c6-ac64-de2d2731292b",
    "Content-type": "application/json",
  },
});

const UserValues = new UserInfo({
  nameSelector: ".user__name",
  aboutSelector: ".user__role",
  pictureSelector: ".user__image-main",
});

export const popupConfirmation = new PopupWithConfirmation(
  "#SubmitCheck",
  handleConfirmationSubmit
);
popupConfirmation.setEventListeners();

let currentUserId;

api
  .getUserData()
  .then((userData) => {
    UserValues.setUserInfo(userData);
    currentUserId = userData._id;

    api
      .getInitialCards()
      .then((cards) => {
        const ProfileCards = new Section(
          {
            data: cards,
            renderer: (item) => {
              const card = new Card(
                item,
                "#card-template",
                (cardInstance) => popupConfirmation.open(cardInstance),
                currentUserId,
                handleLikes
              );
              const cardElement = card.generateCard();
              ProfileCards.setItem(cardElement);
            },
          },
          photoContainer
        );
        ProfileCards.renderItem();
        setupPopups(".photo__card");
      })
      .catch((err) => {
        console.error("Failed to load initial cards:", err);
      });
  })
  .catch((err) => {
    console.error("Failed to fetch user data:", err);
  });

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

const popupProfile = new PopupWithForm("#FormProfile", handleProfileFormSubmit);
popupProfile.setEventListeners();

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

const handleAvatarFormSubmit = (inputValues) => {
  renderLoad(true, "#PictureUploadButton");
  const avatarUrl = inputValues.profileUrl;
  api
    .updateProfilePicture({ avatar: avatarUrl })
    .then((userData) => {
      UserValues.setUserInfo({ ...userData, avatar: userData.avatar });
      popupAvatar.close();
    })
    .catch((err) => {
      console.error("Failed to update profile picture:", err);
    })
    .finally(() => renderLoad(false, "#PictureUploadButton"));
};

const popupAvatar = new PopupWithForm(
  "#FormProfilePicture",
  handleAvatarFormSubmit
);
popupAvatar.setEventListeners();

const formAvatarValidator = new Validate(
  {
    inputSelector: ".form__input",
    submitButtonSelector: ".form__button",
    inactiveButtonClass: "form__button-disabled",
    inputErrorClass: "form__input-invalid",
    errorClass: "form__input-error",
  },
  document.querySelector("#FormProfilePicture")
);
formAvatarValidator.enableValidation();

userimage.addEventListener("click", () => {
  popupAvatar.open();
});

setupProfileEdit(popupAvatar);
