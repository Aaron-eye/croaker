import handlebars from "handlebars";

export default async (templateReference: string, data = {}) => {
  const templateResponse = await fetch(`/templates/${templateReference}.hbs`);
  const templateText = await templateResponse.text();

  const template = handlebars.compile(templateText);
  return template(data);
};
