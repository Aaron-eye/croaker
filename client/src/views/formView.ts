import getFormField from "../utils/getFormField";

export default class FormView {
  formElement: Element;
  constructor(formElement: Element) {
    this.formElement = formElement;
  }

  setFieldLimit(field: string, charLimit: number) {
    const formField = this._getFormField(field);
    if (!formField)
      throw new Error(`The "${field}" field doesn't exist in this form!`);

    formField.maxLength = charLimit;
  }

  setInputCounter(field: string, counter: string, maxLength: number) {
    const counterElement = this.formElement.querySelector(`.${counter}`);
    if (!counterElement)
      throw new Error(`The "${counter}" counter doesn't exist!`);

    const currentLengthElement =
      counterElement.querySelector(".current-length");
    if (!currentLengthElement)
      throw new Error(
        `The current length element doesn't exist in the "${counter}" counter!`
      );

    const maxLengthElement = counterElement.querySelector(".max-lenght");
    if (!maxLengthElement)
      throw new Error(
        `The max length element doesn't exist in the "${counter}" counter!`
      );

    const formField = this._getFormField(field);

    maxLengthElement.textContent = String(maxLength);

    formField.addEventListener("input", () => {
      const currentLength = formField.value.length;
      currentLengthElement.textContent = String(currentLength);

      if (currentLength >= maxLength)
        counterElement.classList.add("limit-reached");
      else counterElement.classList.remove("limit-reached");
    });
  }

  addSubmitListener(submitHandler: EventListener) {
    this.formElement.addEventListener("submit", submitHandler);
  }

  getFormData() {
    const inputArray = Array.from(this._getInputs());
    const data = {};
    inputArray.forEach((input: any) => {
      const dataField = getFormField(input);
      const value = input.value;
      data[dataField as keyof Object] = value;
    });

    return data;
  }

  clearForm() {
    const inputs = this._getInputs();
    inputs.forEach((input: any) => {
      input.value = "";
    });
  }

  displaySuccessMessage() {}

  displayInputErrors(inputIssues: any) {
    const formInputs = this._getInputs();

    const buggedFields: any = Object.keys(inputIssues);

    formInputs.forEach((input) => {
      const inputDiv = input.parentNode;
      if (!inputDiv) return;
      const field = getFormField(input);

      // Removing bug message by default (it can be added later)
      input.classList.remove("invalid-input");

      const bugMsg = inputDiv.querySelector(".form-bug-message");
      if (bugMsg) {
        inputDiv.removeChild(bugMsg);
      }

      if (buggedFields.includes(field)) {
        const bugMessage = inputIssues[field as keyof Object];
        const formBugMessage = document.createElement("p");
        formBugMessage.className = "form-bug-message";
        formBugMessage.textContent = bugMessage;

        if (!input) return;
        input.insertAdjacentElement("beforebegin", formBugMessage);
        input.classList.add("invalid-input");
      }
    });
  }

  _getInputs() {
    return this.formElement.querySelectorAll(".form-element");
  }

  _getFormField(field: string) {
    return <HTMLInputElement>(
      this.formElement?.querySelector(`[data-field-name="${field}"]`)
    );
  }
}
