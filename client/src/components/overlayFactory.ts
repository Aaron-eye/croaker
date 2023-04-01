import OverlayController from "../controllers/overlayController";
import OverlayView from "../views/overlayView";
import FormController from "../controllers/formController";
import FormView from "../views/formView";
import getTemplate from "../utils/getTemplate.js";

import { IOverlayController } from "../types/overlay";

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
      if (!openTrigger) return;
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

    let formController;
    if (overlayController) {
      const formElement = overlayController.getElement()?.querySelector("form");
      if (!formElement)
        throw new Error(`The ${overlayName}'s form doesn't exist!`);

      const overlayFormView = new FormView(formElement);
      formController = new FormController(overlayFormView, submitFunction);
    }
    return { formController, overlayController };
  },
};
