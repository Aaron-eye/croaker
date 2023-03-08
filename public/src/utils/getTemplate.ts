import handlebars from "handlebars";

export default async (templateReference: string, data = {}) => {
  try {
    console.log(`/templates/${templateReference}.hbs`);
    const templateResponse = await fetch(`/templates/${templateReference}.hbs`);

    const templateText = await templateResponse.text();
    console.log(templateText);

    const template = handlebars.compile(templateText);
    console.log(template(data));
    return template(data);
  } catch (err) {
    console.error(err);
  }
};
