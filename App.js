import { Navigation } from "react-native-navigation";
import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore';

import AuthScreen from "./src/screens/Auth/Auth";
import FindFarmScreen from "./src/screens/FindFarms/FindFarm";
import AddFarmScreen from "./src/screens/AddFarm/AddFarm";
import HeatMapScreen from "./src/screens/HeatMap/HeatMap";
import FarmDetailScreen from "./src/screens/FarmDetail/FarmDetail";
import SideDrawer from "./src/screens/SideDrawer/SideDrawer";

const store = configureStore();

// Register Screens
Navigation.registerComponent("agri-mapp.AuthScreen", () => AuthScreen, store, Provider);
Navigation.registerComponent("agri-mapp.AddFarmScreen", () => AddFarmScreen, store, Provider);
Navigation.registerComponent("agri-mapp.FindFarmScreen", () => FindFarmScreen, store, Provider);
Navigation.registerComponent("agri-mapp.HeatMapScreen", () => HeatMapScreen, store, Provider);
Navigation.registerComponent("agri-mapp.FarmDetailScreen", () => FarmDetailScreen, store, Provider);
Navigation.registerComponent("agri-mapp.SideDrawer", () => SideDrawer, store, Provider);

// Start a App
Navigation.startSingleScreenApp({
  screen: {
    screen: "agri-mapp.AuthScreen",
    title: "Login"
  }
});