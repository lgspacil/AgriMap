import {
  SET_FARMS,
  REMOVE_FARM
} from "../actions/actionTypes";

const initialState = {
  farms: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REMOVE_FARM:
      return {
        ...state,
        farms: state.farms.filter(farm => {
          return farm._id != action.id;
        })
      }
    case SET_FARMS:
      return {
        ...state,
        farms: action.farms
      };
    default:
      return state;
  }
};

export default reducer;
