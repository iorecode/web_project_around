import { Card } from "./Card.js";

function openForm(form) {
  console.log("Form opened");
  form.classList.add("form_opened");
  toggleOpacity();
}

const toggleOpacity = () => {
  document.querySelector("#MainSiteOpacity").classList.toggle("page__opacity");
};

function closeForm(form) {
  console.log("Form closed");
  form.classList.remove("form_opened");
  toggleOpacity();
}

function closeImage() {
  const popupImage = document.querySelector(".photo__popup");
  popupImage.style.display = "none";
  document.querySelector("#MainSiteOpacity").classList.remove("page__opacity");
}

function handleProfileFormSubmit(evt, form) {
  evt.preventDefault();
  const name = document.querySelector(".user__name");
  const about = document.querySelector(".user__role");
  const aboutInput = document.querySelector("#AboutInput");
  const nameInput = document.querySelector("#NameInput");
  if (nameInput.value != "") {
    name.textContent = nameInput.value;
    about.textContent = aboutInput.value;

    closeForm(form);
  }
}

function handleUploadFormSubmit(evt, form) {
  evt.preventDefault();
  const titleInput = document.querySelector("#TitleInput");
  const linkInput = document.querySelector("#LinkInput");
  if (linkInput.value !== "" && titleInput.value !== "") {
    const newCard = {
      name: titleInput.value,
      link: linkInput.value,
    };
    titleInput.value = "";
    linkInput.value = "";
    closeForm(form);
    const card = new Card(newCard, "#card-template");
    const cardElement = card.generateCard();
    document.querySelector(".photo").prepend(cardElement);
  }
}

export const setupEventListeners = (
  formProfile,
  formUpload,
  formEdit,
  buttonAdd
) => {
  const closeButtons = document.querySelectorAll(".form__btn-close");
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("photo__card-image_close")) {
      closeImage();
    }
  });
  document.addEventListener("click", (event) => {
    const isCardClick = event.target.closest(".photo__card");
    if (
      !isCardClick &&
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
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeForm(formProfile);
      closeForm(formUpload);
      closeImage();
    }
  });
  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      closeForm(formProfile);
      closeForm(formUpload);
      toggleOpacity();
    });
  });
  formProfile.addEventListener("submit", (evt) => {
    handleProfileFormSubmit(evt, formProfile);
  });
  formUpload.addEventListener("submit", (evt) => {
    handleUploadFormSubmit(evt, formUpload);
  });
  formEdit.addEventListener("click", () => {
    openForm(formProfile);
  });
  buttonAdd.addEventListener("click", () => {
    openForm(formUpload);
  });
};
