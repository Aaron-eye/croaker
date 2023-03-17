export interface IFormModel extends Object {
  updateFormData: Function;
}

export interface IFormController extends Object {
  displayInputErrors: Function;
}

export interface IFormView extends Object {
  getFormData: Function;
  addSubmitListener: Function;
  formElement: Element;
  displayInputErrors: Function;
  setFieldLimit: Function;
  setInputCounter: Function;
}
