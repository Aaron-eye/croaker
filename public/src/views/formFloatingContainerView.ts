import { addLoader, removeLoader } from "../spinningLoader.js";
import getFormField from "../utils/getFormField.js";
import FloatingContainerView from "./floatingContainerView";

export default class FormFloatingContainerView extends FloatingContainerView {
  signFunction: Function;
  constructor(elementTemplate: string, signFunction: Function) {
    super(elementTemplate);
    this.signFunction = signFunction;
  }

  addSignFormListener() {
    const form = this.element;
    if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.submitForm();
    });
  }

  async submitForm() {
    const form = this.element;
    if (!form) return;

    const data: any = {};
    const inputs = Array.from(form.querySelectorAll("input"));

    inputs.forEach((input: any) => {
      const value = input.value;
      const dataField = getFormField(input);
      data[dataField] = value;
    });
    try {
      addLoader(form);
      await this.signFunction(data, form);
      removeLoader(form);
    } catch (err) {}
    removeLoader(form);
  }
}
