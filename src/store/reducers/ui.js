import { LOAD_FARMS, LOAD_EARTHQUAKES, FIND_FARM_SCREEN, ADD_FARM_SCREEN, HEAT_MAP_SCREEN } from "../actions/actionTypes";

const initialState = {
  loadEarthQuakes: false,
  loadFarms: true,
  findFarmScreen: false,
  addFarmScreen: false,
  heatMapScreen: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_EARTHQUAKES:
      return {
        ...state,
        loadEarthQuakes: true,
        loadFarms: false
      };
    case LOAD_FARMS:
      return {
        ...state,
        loadEarthQuakes: false,
        loadFarms: true
      }
    case FIND_FARM_SCREEN: 
      return {
        ...state,
        findFarmScreen: true,
        addFarmScreen: false,
        heatMapScreen: false
      }
    case ADD_FARM_SCREEN: 
      return {
        ...state,
        findFarmScreen: false,
        addFarmScreen: true,
        heatMapScreen: false
      }
    case HEAT_MAP_SCREEN:
      return {
        ...state,
        findFarmScreen: false,
        addFarmScreen: false,
        heatMapScreen: true
      }


    default:
      return state;
  }
};

export default reducer;