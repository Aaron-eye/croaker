import getTemplate from "./getTemplate";

export default async (err: any) => {
  const errorTemplate = await getTemplate("errorMessage", {
    message: err.message,
  });

  const errorElement = document.createElement("div");
  errorElement.innerHTML = errorTemplate.trim();
  return errorElement;

  /*const errorElement = document.createElement("div");
  errorElement.className = "error-message";
  errorElement.textContent = err.message;
  return errorElement;*/
};
