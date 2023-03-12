import handlebarsManager from "./handlebarsManager";
import overlayManager from "./overlayManager.js";

import isSignedIn from "./isSignedIn";

window.isSignedIn = isSignedIn();

(async () => {
  await handlebarsManager();
  await overlayManager();
  // profileController();
})();
