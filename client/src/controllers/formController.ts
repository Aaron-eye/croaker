import loadData from "./../utils/loadData";
import { IFormView } from "./../types/form";

export default class FormController {
  view: IFormView;
  submitFunction: Function;
  constructor(view: IFormView, submitFunction: Function) {
    this.view = view;
    this.submitFunction = submitFunction;

    this.view.addSubmitListener(this.handleFormSubmit.bind(this));
  }

  async handleFormSubmit(event: Event) {
    event.preventDefault();

    const formData = this.view.getFormData();

    try {
      await loadData(
        () => this.submitFunction(formData),
        this.view.formElement
      );
    } catch (err) {
      this.view.displayInputBugs(err);
    }
  }
}
