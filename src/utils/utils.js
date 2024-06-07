import { Card } from "../components/Card.js";
import UserInfo from "../components/UserInfo.js";
import { PopupWithImage } from "../components/Popup.js";

const userInfo = new UserInfo({
  nameSelector: ".user__name",
  aboutSelector: ".user__role",
});

export function handleProfileFormSubmit(inputValues) {
  if (inputValues.name !== "" && inputValues.about !== "") {
    userInfo.setUserInfo({
      name: inputValues.name,
      about: inputValues.about,
    });
    this.close();
  }
}

export function handleUploadFormSubmit(inputValues) {
  if (inputValues.url !== "" && inputValues.title !== "") {
    const newCard = {
      name: inputValues.title,
      link: inputValues.url,
    };
    const card = new Card(newCard, "#card-template");
    const cardElement = card.generateCard();
    document.querySelector(".photo").prepend(cardElement);
    setupPopups(".photo__card");
    this.close();
  }
}

export function setupPopups(card) {
  document.querySelectorAll(card).forEach((i) =>
    i.querySelector(".photo__card-image").addEventListener("click", (evt) => {
      evt.stopPropagation();
      const ImgSrc = i.querySelector(".photo__card-image").src;
      const title = i.querySelector(".photo__text").textContent;
      const popup = new PopupWithImage(".popup");
      popup.open(ImgSrc, title);
      popup.setEventListeners(".photo__card");
    })
  );
}
