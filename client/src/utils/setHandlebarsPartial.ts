import handlebars from "handlebars";

export default async (partialPath: string) => {
  const partialResponse = await fetch(`/templates/${partialPath}.hbs`);
  const partialSource = await partialResponse.text();

  const partialName = partialPath.split("/").at(-1);
  if (partialName) handlebars.registerPartial(partialName, partialSource);
};
