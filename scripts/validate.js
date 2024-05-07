const hideError = (input, inputErrorClass, spanError, errorClass) => {
  input.classList.remove(inputErrorClass);
  spanError.classList.remove(errorClass);
  spanError.textContent = "";
};

const showError = (input, inputErrorClass, spanError, errorClass) => {
  input.classList.add(inputErrorClass);
  spanError.classList.add(errorClass);
  spanError.textContent = input.validationMessage;
};

const hasInvalidInput = (inputs) => {
  return inputs.some((inputElement) => !inputElement.validity.valid);
};

const toggleButton = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

const validateInputs = (input, inputErrorClass, errorClass) => {
  const spanError = input.nextElementSibling;
  if (!input.validity.valid) {
    showError(input, inputErrorClass, spanError, errorClass);
  } else {
    hideError(input, inputErrorClass, spanError, errorClass);
  }
};

function enableValidation(elements) {
  const form = document.querySelector(elements.formSelector);
  const inputs = Array.from(form.querySelectorAll(elements.inputSelector));
  const button = form.querySelector(elements.submitButtonSelector);
  toggleButton(inputs, button, elements.inactiveButtonClass);
  for (const i of inputs) {
    i.addEventListener("input", (evt) => {
      const target = evt.target;
      validateInputs(target, elements.inputErrorClass, elements.errorClass);
      toggleButton(inputs, button, elements.inactiveButtonClass);
    });
  }
}
enableValidation({
  formSelector: "#FormProfile",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button-disabled",
  inputErrorClass: "form__input-invalid",
  errorClass: "form__input-error",
});

enableValidation({
  formSelector: "#FormUpload",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button-disabled",
  inputErrorClass: "form__input-invalid",
  errorClass: "form__input-error",
});
