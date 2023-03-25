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

  limitInputLength(field: string, counter: string, maxLength: number) {
    this.view.limitInputLength(field, counter, maxLength);
  }

  async handleFormSubmit(event: Event) {
    event.preventDefault();

    const formData = this.view.getFormData();

    try {
      this.view.disableSubmit();
      await loadData(
        () => this.submitFunction(formData),
        this.view.formElement
      );
    } catch (err) {
      this.view.enableSubmit();
      this.handleError(err);
    }
  }

  handleError(err: any) {
    console.log(err);
    const inputIssues = err.response.data.validationIssues;
    if (inputIssues) this.view.displayInputErrors(inputIssues);
    else {
      this.view.displayGenericError(err);
    }
  }
}
