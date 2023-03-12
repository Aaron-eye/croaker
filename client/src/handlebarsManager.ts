const layouts = require("handlebars-layouts");
import handlebars from "handlebars";
import setHandlebarsPartial from "./utils/setHandlebarsPartial";

export default async () => {
  const partials = ["overlays/overlayBase", "closeButton"];
  for (const partialPath of partials) {
    await setHandlebarsPartial(partialPath);
  }
  handlebars.registerHelper(layouts(handlebars));
  return;
};
