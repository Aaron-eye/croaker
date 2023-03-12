export interface IFormModel extends Object {
  updateFormData: Function;
}

export interface IFormController extends Object {
  displayInputBugs: Function;
}

export interface IFormView extends Object {
  getFormData: Function;
  addSubmitListener: Function;
  formElement: Element;
  displayInputBugs: Function;
}
