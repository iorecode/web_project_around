// Verifica se algum dos inputs é inválido
const hasInvalidInput = (inputs) => {
  return inputs.some((inputElement) => !inputElement.validity.valid);
};

// Esconde o erro associado a um input
const hideError = (input, inputErrorClass, spanError, errorClass) => {
  input.classList.remove(inputErrorClass);
  spanError.classList.remove(errorClass);
  spanError.textContent = "";
};

// Mostra o erro associado a um input
const showError = (input, inputErrorClass, spanError, errorClass) => {
  input.classList.add(inputErrorClass);
  spanError.classList.add(errorClass);
  spanError.textContent = input.validationMessage;
};

// Valida os inputs e mostra/oculta mensagens de erro
const validateInputs = (input, inputErrorClass, errorClass) => {
  const spanError = input.nextElementSibling;
  if (!input.validity.valid) {
    showError(input, inputErrorClass, spanError, errorClass);
  } else {
    hideError(input, inputErrorClass, spanError, errorClass);
  }
};

// Alterna a visibilidade do botão de envio com base na validade dos inputs
const toggleButton = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

// Função principal para habilitar a validação dos formulários
function enableValidation(elements) {
  const form = document.querySelector(elements.formSelector);
  const inputs = Array.from(form.querySelectorAll(elements.inputSelector));
  const button = form.querySelector(elements.submitButtonSelector);
  toggleButton(inputs, button, elements.inactiveButtonClass);

  // Adiciona event listeners para cada input no formulário
  for (const input of inputs) {
    input.addEventListener("input", (evt) => {
      const target = evt.target;
      validateInputs(target, elements.inputErrorClass, elements.errorClass);
      toggleButton(inputs, button, elements.inactiveButtonClass);
    });
  }
}

// Habilita a validação para o formulário de perfil
enableValidation({
  formSelector: "#FormProfile",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button-disabled",
  inputErrorClass: "form__input-invalid",
  errorClass: "form__input-error",
});

// Habilita a validação para o formulário de upload
enableValidation({
  formSelector: "#FormUpload",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button-disabled",
  inputErrorClass: "form__input-invalid",
  errorClass: "form__input-error",
});
