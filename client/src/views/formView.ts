import getFormField from "../utils/getFormField";

export default class FormView {
  formElement: Element;
  constructor(formElement: Element) {
    this.formElement = formElement;
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

  displayInputBugs(err: any) {
    const fieldBugs = err.response.data.specifications;
    const formInputs = this._getInputs();

    const buggedFields: any = Object.keys(fieldBugs);

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
        const bugMessage = fieldBugs[field];
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
    return this.formElement.querySelectorAll("input");
  }
}
