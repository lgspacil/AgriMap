import { Navigation } from "react-native-navigation";
import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore';

import AuthScreen from "./src/screens/Auth/Auth";
import FindFarmScreen from "./src/screens/FindFarms/FindFarm";
import AddFarmScreen from "./src/screens/AddFarm/AddFarm";


const store = configureStore();

// Register Screens
Navigation.registerComponent("agri-mapp.AuthScreen", () => AuthScreen, store, Provider);
Navigation.registerComponent("agri-mapp.AddFarmScreen", () => AddFarmScreen, store, Provider);
Navigation.registerComponent("agri-mapp.FindFarmScreen", () => FindFarmScreen, store, Provider);

// Start a App
Navigation.startSingleScreenApp({
  screen: {
    screen: "agri-mapp.AuthScreen",
    title: "Login"
  }
});