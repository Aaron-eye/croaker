class FormModel {
  formData: any;
  constructor() {
    this.formData = {};
  }

  updateFormData(newData: Object) {
    this.formData = newData;
  }
}
