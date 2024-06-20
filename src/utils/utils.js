import { Card } from "../components/Card.js";
import UserInfo from "../components/UserInfo.js";
import { PopupWithConfirmation, PopupWithImage } from "../components/Popup.js";
import { photoContainer, userimage, userimageEdit } from "./constants.js";
import API from "../components/API.js";
import { Section } from "../components/Section.js";
import { popupConfirmation } from "../pages/index.js";

const userInfo = new UserInfo({
  nameSelector: ".user__name",
  aboutSelector: ".user__role",
  pictureSelector: ".user__image-main",
});
const UtilAPI = new API({
  url: "https://around.nomoreparties.co/v1/web-ptbr-cohort-11",
  headers: {
    authorization: "ef61af7f-62bd-42c6-ac64-de2d2731292b",
    "Content-type": "application/json",
  },
});

export function handleProfileFormSubmit(inputValues) {
  renderLoad(true, "#UserUploadButton");
  console.log("Submitting profile form with values:", inputValues);
  if (inputValues.name !== "" && inputValues.about !== "") {
    console.log(inputValues);
    this.close();
    return UtilAPI.saveProfileChanges(inputValues)
      .then((userData) => {
        console.log("Profile changes saved successfully:", userData);
        userInfo.setUserInfo(userData);
        document.querySelector("#FormProfile").classList.remove("form_opened");
      })
      .catch((err) => {
        console.error("Failed to save profile changes:", err);
      })
      .finally(() => renderLoad(false, "#UserUploadButton"));
  } else {
    return Promise.reject("Invalid input values");
  }
}

const ProfileCards = new Section(
  {
    data: [],
    renderer: (item) => {
      const card = new Card(item, "#card-template", handleCardClick);
      const cardElement = card.generateCard();
      ProfileCards.setItem(cardElement);
    },
  },
  photoContainer
);

export function handleUploadFormSubmit(inputValues, currentUserId) {
  renderLoad(true, "#CardUploadButton");
  if (inputValues.url !== "" && inputValues.title !== "") {
    const newCard = {
      name: inputValues.title,
      link: inputValues.url,
    };

    UtilAPI.addCard(newCard)
      .then((addedCard) => {
        console.log("New card added:", addedCard);
        addedCard.owner = { _id: currentUserId }; // Define ID do owner pro ID do usuario atual
        const card = new Card(
          addedCard,
          "#card-template",
          (cardInstance) => popupConfirmation.open(cardInstance),
          currentUserId,
          handleLikes
        );
        const cardElement = card.generateCard();
        document.querySelector(".photo").prepend(cardElement);
        setupPopups(".photo__card");
        this.close();
      })
      .catch((err) => {
        console.error("Failed to add new card:", err);
      })
      .finally(() => renderLoad(false, "#CardUploadButton"));
  } else {
    console.error("Title and URL cannot be empty");
  }
}

export const handleConfirmationSubmit = (target) => {
  UtilAPI.deleteCard(target._cardID)
    .then(() => {
      target._card.remove(); // Remove a carta do Dom
    })
    .catch((err) => {
      console.log(err);
    });
  popupConfirmation.close();
};

export function handleLikes(cardId, cardElement) {
  const likeButton = cardElement.querySelector(".photo__like");
  const likeCount = cardElement.querySelector(".photo__like-count");

  if (likeButton.classList.contains("photo__like_active")) {
    UtilAPI.removeLike(cardId)
      .then((data) => {
        likeButton.classList.remove("photo__like_active");
        likeCount.textContent = data.likes.length;
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    UtilAPI.addLike(cardId)
      .then((data) => {
        likeButton.classList.add("photo__like_active");
        likeCount.textContent = data.likes.length;
      })
      .catch((err) => {
        console.error(err);
      });
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

export function setupProfileEdit() {
  userimage.addEventListener("mouseover", () => {
    userimage.querySelector(".user__image-main").style.opacity = "25%";
    userimageEdit.style.display = "block";
  });
  userimage.addEventListener("mouseout", () => {
    userimage.querySelector(".user__image-main").style.opacity = "100%";
    userimageEdit.style.display = "none";
  });
}

export function renderLoad(status, selector) {
  const element = document.querySelector(selector);
  if (!element) {
    console.error(`Element with selector ${selector} not found`);
    return;
  }

  if (status) {
    element.textContent += "...";
  } else {
    element.textContent = element.textContent.replace("...", "");
  }
}
