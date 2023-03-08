import getFormField from "./getFormField.js";

export default (err: any, form: Element) => {
  const fieldBugs = err.response.data.specifications;
  const formInputs = form.querySelectorAll("input");

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
};
