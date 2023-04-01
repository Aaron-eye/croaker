export interface IFormModel extends Object {
  updateFormData: Function;
}

export interface IFormController extends Object {
  setFieldLimit: Function;
  limitInputLength: Function;
}

export interface IFormView extends Object {
  getFormData: Function;
  addSubmitListener: Function;
  formElement: Element;
  displayInputErrors: Function;
  setFieldLimit: Function;
  limitInputLength: Function;
  disableSubmit: Function;
  enableSubmit: Function;
  displayGenericError: Function;
}
