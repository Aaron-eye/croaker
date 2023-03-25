import CroaksController from "./controllers/croaksController";
import CroaksModel from "./models/croaksModel";
import CroaksView from "./views/croaksView";
import getUser from "./utils/getUser";

export default async () => {
  /*const userController = getUser();
  userController.setData(["nickname"]);
  const user = userController.getData();*/

  const userCroaksContainer = document.querySelector(".user-croaks");
  const userNickname = (userCroaksContainer as HTMLElement).dataset
    .userNickname;
  if (!userCroaksContainer) return;
  const userCroaksModel = new CroaksModel();
  const userCroaksView = new CroaksView(userCroaksContainer);
  const userCroaksController = new CroaksController(
    userCroaksModel,
    userCroaksView,
    `user/${userNickname}`
  );
};

/*export default async () => {
  const contentLoader = document.querySelector(".content-loader");
  if (!contentLoader) throw new Error("No content loader in this page!");
  const userCroaksContainer = document.querySelector(".user-croaks");
  if (!userCroaksContainer) return;

  const userController = getUser();
  userController.setData(["nickname"]);
  const user = userController.getData();

  let croakLoaderStartingPoint = 0;

  const loadUserCroaks = async () => {
    const userCroaksRes = await loadData(async () => {
      return axios({
        method: "GET",
        url: `/api/v1/croaks/user/${user.nickname}/startingPoint/${croakLoaderStartingPoint}`,
      });
    }, contentLoader);

    const userCroaks = userCroaksRes.data.data;
    userCroaksContainer.insertAdjacentHTML("beforeend", userCroaks.join(""));
    croakLoaderStartingPoint += userCroaks.length;
  };
  loadUserCroaks();
  checkBottomScroll(loadUserCroaks);
};*/
