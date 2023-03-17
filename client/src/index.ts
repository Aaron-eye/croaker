import handlebarsManager from "./handlebarsManager";
import overlayManager from "./overlayManager.js";

import isSignedIn from "./isSignedIn";
import getUser from "./getUser";
import getGlobalConfig from "./getGlobalConfig";

window.isSignedIn = isSignedIn();

(async () => {
  window.globalConfig = await getGlobalConfig();
  window.userController = getUser();

  await handlebarsManager();
  await overlayManager();
  // profileController();
})();
