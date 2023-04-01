import handlebarsInit from "./handlebarsInit";
import getGlobalConfig from "./utils/config/getGlobalConfig";

import access from "./components/base/access.js";
import croaks from "./components/lazy-loaders/croaks";
import croak from "./components/base/croak";
import search from "./components/base/search";
import users from "./components/lazy-loaders/users";
import profile from "./components/users/profile";
import pageNavs from "./components/base/pageNavs";

(async () => {
  window.globalConfig = await getGlobalConfig();

  // Activating components (instances of the controllers of some HTML elements)
  await handlebarsInit();
  access();
  croak();
  search();
  croaks();
  users();
  profile();
  pageNavs();
})();
