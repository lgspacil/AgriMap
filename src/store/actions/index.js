// these are the actions you want to make available to the App
export {
  addPlace,
  deletePlace,
  getPlaces,
  placeAdded,
  startAddPlace,
  addNewPlace,
  submitFarmArea,
  getFarms,
  deleteFarm
} from "./farms";
export { tryAuth, authGetToken, authAutoSignIn, authLogout, testSignIn, autoLogin } from "./auth";
export { uiStartLoading, uiStopLoading, loadEarthQuakes, loadFarms } from "./ui";


