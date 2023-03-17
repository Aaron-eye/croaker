import OverlayController from "./../controllers/overlayController";
import OverlayView from "./../views/overlayView";
import FormController from "./../controllers/formController";
import FormView from "./../views/formView";
import getTemplate from "./../utils/getTemplate.js";

export default {
  async createOverlayController(
    overlayName: string,
    addTrigger = false,
    templateData = {}
  ) {
    const overlayTemplate = await getTemplate(
      `overlays/${overlayName}`,
      templateData
    );
    const overlayView = new OverlayView(overlayTemplate);
    const overlayController = new OverlayController(overlayView);

    if (addTrigger) {
      const buttonClass = `.${overlayName}-btn`;
      const openTrigger = document.querySelector(buttonClass);
      if (!openTrigger)
        throw new Error(`No open trigger button for ${overlayName} overlay!`);
      overlayController.addOpenTrigger(openTrigger);
    }

    return overlayController;
  },

  async createFormOverlayController(
    overlayName: string,
    submitFunction: Function,
    templateData = {}
  ) {
    const overlayController = await this.createOverlayController(
      overlayName,
      true,
      templateData
    );
    const formElement = overlayController.getElement()?.querySelector("form");
    if (!formElement)
      throw new Error(`The ${overlayName}'s form doesn't exist!`);

    const overlayFormView = new FormView(formElement);
    const formController = new FormController(overlayFormView, submitFunction);
    return {
      overlayController,
      formController,
    };
  },
};
