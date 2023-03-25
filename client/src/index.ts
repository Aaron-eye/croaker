import handlebarsInit from "./handlebarsInit";
import baseComponents from "./baseComponents.js";

import getGlobalConfig from "./utils/getGlobalConfig";
import userCroaks from "./userCroaks";

(async () => {
  window.globalConfig = await getGlobalConfig();

  await handlebarsInit();
  await baseComponents();
  await userCroaks();
  // profileController();
})();
