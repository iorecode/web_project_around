const formUpload = document.querySelector("#FormUpload");
const formProfile = document.querySelector("#FormProfile");
const buttonAdd = document.querySelector(".user__add");
const formEdit = document.querySelector(".user__edit");
const formSubmit = document.querySelector(".form__button");
const pageOpacity = document.querySelector("#MainSiteOpacity");
const nameInput = document.querySelector("#NameInput");
const aboutInput = document.querySelector("#AboutInput");
const titleInput = document.querySelector("#TitleInput");
const linkInput = document.querySelector("#LinkInput");
const userData = document.querySelector(".user__data");
const photos = document.querySelector(".photo");
const name = document.querySelector(".user__name");
const about = document.querySelector(".user__role");
let currentImageSrc = "";
let currentTextContent = "";
const cardContainer = document.querySelector(".photo");
const initialCards = [
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

initialCards.forEach(createCard);

let currentImageElement = null;

function openForm(form) {
  console.log("Form opened");
  form.classList.add("form_opened");
  pageOpacity.classList.add("form__opacity");
}

function handleNoPics() {
  const pictures = document.querySelectorAll(".photo__card");
  const emptyMessage = document.querySelector(".photo__empty");

  if (pictures.length === 0) {
    photos.insertAdjacentHTML(
      "afterbegin",
      `<p class="photo__empty">NO PICTURES</p>`
    );
  } else {
    if (emptyMessage) {
      emptyMessage.remove();
    }
  }
}

function createCard(card) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".photo__card")
    .cloneNode(true);
  cardElement.querySelector(".photo__card-image").src = card.link;
  cardElement.querySelector(".photo__card-image").alt = card.name;
  cardElement.querySelector(".photo__text").textContent = card.name;
  const likeButton = cardElement.querySelector(".photo__like");
  likeButton.addEventListener("click", function (evt) {
    evt.target.classList.toggle("photo__like_active");
  });
  const deleteButton = cardElement.querySelector(".photo__delete");
  deleteButton.addEventListener("click", function () {
    cardElement.remove();
    handleNoPics();
  });
  cardElement.dataset.imageSrc = card.link;
  cardElement.dataset.textContent = card.name;

  const currentImage = cardElement.querySelector(".photo__card-image");

  currentImage.addEventListener("click", function () {
    openImage(cardElement);
  });

  cardContainer.prepend(cardElement);
}

function handleProfileFormSubmit(evt, form) {
  evt.preventDefault();
  if (nameInput.value != "") {
    name.textContent = nameInput.value;
    about.textContent = aboutInput.value;

    closeForm(form);
  }
}

function handleUploadFormSubmit(evt, form) {
  evt.preventDefault();

  if (linkInput.value != "" && titleInput.value != "") {
    const newCard = {
      name: titleInput.value,
      link: linkInput.value,
    };
    titleInput.value = "";
    linkInput.value = "";
    closeForm(form);
    createCard(newCard);
    handleNoPics();
  }
}

function closeForm(form) {
  console.log("Form closed");
  form.classList.remove("form_opened");
  pageOpacity.classList.remove("form__opacity");
}

function openImage(clickedCard) {
  const ImageTemplate = document.querySelector("#image-template").content;
  const ImageElement =
    ImageTemplate.querySelector(".photo__popup").cloneNode(true);
  pageOpacity.classList.add("form__opacity");
  const currentImageSrc = clickedCard.dataset.imageSrc;
  const currentTextContent = clickedCard.dataset.textContent;
  ImageElement.querySelector(".photo__card-image_popup").src = currentImageSrc;
  ImageElement.querySelector(".photo__card-image_popup").alt =
    currentTextContent;
  ImageElement.querySelector(".photo__card-image_subtitle").textContent =
    currentTextContent;

  if (currentImageElement) {
    currentImageElement.remove();
  }

  const closeButton = ImageElement.querySelector(".photo__card-image_close");
  closeButton.addEventListener("click", () => {
    ImageElement.remove();
    pageOpacity.classList.remove("form__opacity");
  });

  document.body.appendChild(ImageElement);
  currentImageElement = ImageElement;
}

const closeButtons = document.querySelectorAll(".form__btn-close");

closeButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    closeForm(formProfile);
    closeForm(formUpload);
  });
});

formProfile.addEventListener("submit", function (evt) {
  handleProfileFormSubmit(evt, formProfile);
});
formUpload.addEventListener("submit", function (evt) {
  handleUploadFormSubmit(evt, formUpload);
});
formEdit.addEventListener("click", function () {
  openForm(formProfile);
});

buttonAdd.addEventListener("click", function () {
  openForm(formUpload);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeForm(formProfile);
    closeForm(formUpload);
    closeImage();
  }
});

document.addEventListener("click", (event) => {
  const isCardClick = event.target.closest(".photo__card");

  if (isCardClick) {
    console.log("Click em uma carta");
  } else if (
    !formProfile.contains(event.target) &&
    !formUpload.contains(event.target) &&
    !formEdit.contains(event.target) &&
    !buttonAdd.contains(event.target)
  ) {
    closeForm(formProfile);
    closeForm(formUpload);
    closeImage();
  }
});

function closeImage() {
  if (currentImageElement) {
    currentImageElement.remove();
    pageOpacity.classList.remove("form__opacity");
  }
}

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("photo__card-image_close")) {
    closeImage();
  }
});
