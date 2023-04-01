import FormController from "../../controllers/formController";
import FormView from "../../views/formView";
import { IFormController, IFormView } from "../../types/form";

const mainSearchFormContainer = document.querySelector(
  ".search-container.main-search"
);
const secondarySearchFormContainer = document.querySelector(
  ".search-container.secondary-search"
);

function openSearchPage(page: string, data: any) {
  const searchKeyword = data.keyword;
  window.location.href = `/search/${page}/${searchKeyword}`;
}

const searchFactory = (searchPage: string, searchContainer: Element) => {
  const searchFormView = new FormView(searchContainer);
  const searchFormController = new FormController(
    searchFormView,
    openSearchPage.bind(null, searchPage)
  );
  return searchFormController;
};

interface ISearchControllers {
  secondaryForm: IFormController | null;
  searchUsersForm: IFormController | null;
  searchCroaksForm: IFormController | null;
}

export const searchControllers: ISearchControllers = {
  secondaryForm: null,
  searchUsersForm: null,
  searchCroaksForm: null,
};

export default () => {
  if (secondarySearchFormContainer) {
    const secondarySearchFormView = new FormView(secondarySearchFormContainer);
    const secondarySearchFormController = new FormController(
      secondarySearchFormView,
      openSearchPage.bind(null, "users")
    );
    searchControllers.secondaryForm = secondarySearchFormController;
  }

  if (mainSearchFormContainer) {
    const searchTarget = (mainSearchFormContainer as HTMLElement).dataset
      .searchTarget;
    if (!searchTarget)
      throw new Error("No search target in main search form container!");

    searchControllers.searchUsersForm = searchFactory(
      searchTarget,
      mainSearchFormContainer
    );
  }
};
