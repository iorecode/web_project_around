let formElement = document.querySelector(".form");
let formEdit = document.querySelector(".user__edit");
let formSubmit = document.querySelector(".form__button");
let pageOpacity = document.querySelector("#MainSiteOpacity");
let formClose = document.querySelector(".form__btn-close");
let nameInput = document.querySelector("#NameInput");
let aboutInput = document.querySelector("#AboutInput");
let userData = document.querySelector(".user__data");
let photos = document.querySelector(".photo");
let name = document.querySelector(".user__name");
let about = document.querySelector(".user__role");

function OpenForm() {
  console.log("Form opened");
  formElement.classList.add("form_opened");
  pageOpacity.classList.add("form__opacity");
}

function CloseForm() {
  console.log("Form closed");
  formElement.classList.remove("form_opened");
  pageOpacity.classList.remove("form__opacity");
}

function NoPics() {
  let pictures = document.querySelectorAll(".photo__card");
  if (pictures.length === 0) {
    photos.insertAdjacentHTML(
      "afterbegin",
      `<p class="photo__empty">NO PICTURES</p>`
    );
  }
}

function handleProfileFormSubmit(evt) {
  // Esta linha impede o navegador
  // de enviar o formulário da forma padrão.
  evt.preventDefault();
  // Fazendo isso, podemos definir nossa própria forma de enviar o formulário.
  // Explicaremos em mais detalhes posteriormente.
  if (nameInput.value != "") {
    name.textContent = nameInput.value;
    about.textContent = aboutInput.value;

    CloseForm();
  }
}

// Conecte o handler ao formulário:
// ele vai observar o evento de submit
formElement.addEventListener("submit", handleProfileFormSubmit);
formEdit.addEventListener("click", OpenForm);
formClose.addEventListener("click", CloseForm);
