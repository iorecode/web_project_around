export class Validate {
  constructor(selectors, formSelector) {
    this._inputs = Array.from(
      formSelector.querySelectorAll(selectors.inputSelector)
    );
    this._inputErrorClass = selectors.inputErrorClass;
    this._errorClass = selectors.errorClass;
    this._button = formSelector.querySelector(selectors.submitButtonSelector);
    this._inactiveButtonClass = selectors.inactiveButtonClass;
  }

  enableValidation() {
    this._toggleButton(this._inputs);
    this._inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._validateInputs(input);
        this._toggleButton(this._inputs);
      });
    });
  }

  _toggleButton(inputList) {
    if (this._checkInvalid(inputList)) {
      this._button.disabled = true;
      this._button.classList.add(this._inactiveButtonClass);
    } else {
      this._button.disabled = false;
      this._button.classList.remove(this._inactiveButtonClass);
    }
  }

  _checkInvalid(inputList) {
    return inputList.some((input) => !input.validity.valid);
  }

  _validateInputs(input) {
    const spanError = input.nextElementSibling;
    if (!input.validity.valid) {
      input.classList.add(this._inputErrorClass);
      spanError.classList.add(this._errorClass);
      spanError.textContent = input.validationMessage;
    } else {
      input.classList.remove(this._inputErrorClass);
      spanError.classList.remove(this._errorClass);
      spanError.textContent = "";
    }
  }
}
