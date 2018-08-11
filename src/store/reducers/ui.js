import { UI_START_LOADING, UI_STOP_LOADING, LOAD_FARMS, LOAD_EARTHQUAKES } from "../actions/actionTypes";

const initialState = {
  isLoading: false,
  loadEarthQuakes: false,
  loadFarms: true
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
    case UI_START_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case UI_STOP_LOADING:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};

export default reducer;