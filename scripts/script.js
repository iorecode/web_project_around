const formUpload = document.querySelector("#FormUpload");
const formProfile = document.querySelector("#FormProfile");
const buttonAdd = document.querySelector(".user__add");
let formEdit = document.querySelector(".user__edit");
let formSubmit = document.querySelector(".form__button");
const pageOpacity = document.querySelector("#MainSiteOpacity");
let nameInput = document.querySelector("#NameInput");
let aboutInput = document.querySelector("#AboutInput");
let titleInput = document.querySelector("#TitleInput");
let linkInput = document.querySelector("#LinkInput");
let userData = document.querySelector(".user__data");
let photos = document.querySelector(".photo");
let name = document.querySelector(".user__name");
let about = document.querySelector(".user__role");
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

function OpenForm(form) {
  console.log("Form opened");
  form.classList.add("form_opened");
  pageOpacity.classList.add("form__opacity");
}

function NoPics() {
  let pictures = document.querySelectorAll(".photo__card");
  let emptyMessage = document.querySelector(".photo__empty");

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
  cardElement.querySelector(".photo__text").textContent = card.name;
  const likeButton = cardElement.querySelector(".photo__like");
  likeButton.addEventListener("click", function (evt) {
    evt.target.classList.toggle("photo__like_active");
  });
  const deleteButton = cardElement.querySelector(".photo__delete");
  deleteButton.addEventListener("click", function () {
    cardElement.remove();
    NoPics();
  });
  currentImageSrc = cardElement.querySelector(".photo__card-image").src =
    card.link;
  currentTextContent = cardElement.querySelector(".photo__text").textContent =
    card.name;
  let currentImage = cardElement.querySelector(".photo__card-image");

  currentImage.addEventListener("click", function () {
    OpenImage();
  });

  cardContainer.prepend(cardElement);
}

function handleProfileFormSubmit(evt, form) {
  // Esta linha impede o navegador
  // de enviar o formulário da forma padrão.
  evt.preventDefault();
  // Fazendo isso, podemos definir nossa própria forma de enviar o formulário.
  // Explicaremos em mais detalhes posteriormente.
  if (nameInput.value != "") {
    name.textContent = nameInput.value;
    about.textContent = aboutInput.value;

    CloseForm(form);
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
    CloseForm(form);
    createCard(newCard);
    NoPics();
  }
}

function CloseForm(form) {
  console.log("Form closed");
  form.classList.remove("form_opened");
  pageOpacity.classList.remove("form__opacity");
}

function OpenImage() {
  const ImageTemplate = document.querySelector("#image-template").content;
  const ImageElement =
    ImageTemplate.querySelector(".photo__popup").cloneNode(true);
  pageOpacity.classList.add("form__opacity");
  ImageElement.querySelector(".photo__card-image_popup").src = currentImageSrc;
  ImageElement.querySelector(".photo__card-image_subtitle").textContent =
    currentTextContent;
  if (!document.querySelector(".photo__popup")) {
    const closeButton = ImageElement.querySelector(".photo__card-image_close");
    closeButton.addEventListener("click", () => {
      ImageElement.remove();
      pageOpacity.classList.remove("form__opacity");
    });
    document.body.appendChild(ImageElement);
  }
}

const closeButtons = document.querySelectorAll(".form__btn-close");

closeButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    CloseForm(formProfile);
    CloseForm(formUpload);
  });
});

// Conecte o handler ao formulário:
// ele vai observar o evento de submit
formProfile.addEventListener("submit", function (evt) {
  handleProfileFormSubmit(evt, formProfile);
});
formUpload.addEventListener("submit", function (evt) {
  handleUploadFormSubmit(evt, formUpload);
});
formEdit.addEventListener("click", function () {
  OpenForm(formProfile);
});

buttonAdd.addEventListener("click", function () {
  OpenForm(formUpload);
});
