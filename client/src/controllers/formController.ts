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

  setFieldLimit(field: string, charLimit: number) {
    this.view.setFieldLimit(field, charLimit);
  }

  setInputCounter(field: string, counter: string, maxLength: number) {
    this.view.setInputCounter(field, counter, maxLength);
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
      this.handleInputErrors(err);
    }
  }

  handleInputErrors(err: any) {
    const inputIssues = err.response.data.validationIssues;
    if (!inputIssues) return;
    this.view.displayInputErrors(inputIssues);
  }
}
