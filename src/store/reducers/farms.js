import {
  SET_PLACES,
  REMOVE_PLACE,
  PLACE_ADDED,
  START_ADD_PLACE,
  ADD_NEW_PLACE,
  SET_FARMS,
  REMOVE_FARM
} from "../actions/actionTypes";

const initialState = {
  farms: [],
  placeAdded: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REMOVE_FARM:
    console.log('deleting farms')
      return {
        ...state,
        farms: state.farms.filter(farm => {
          console.log('the farm is: ', farm._id)
          console.log('the action is: ', action.id)
          return farm._id != action.id;
        })
      }
    case SET_FARMS:
      return {
        ...state,
        farms: action.farms
      };
    case SET_PLACES:
      return {
        ...state,
        places: action.places
      };
    case REMOVE_PLACE:
      return {
        ...state,
        places: state.places.filter(place => {
          return place.key !== action.key;
        })
      };
    case START_ADD_PLACE:
      return {
        ...state,
        placeAdded: false
      };
    case PLACE_ADDED:
      return {
        ...state,
        placeAdded: true
      };
    case ADD_NEW_PLACE: 
      return {
        ...state
      }
    default:
      return state;
  }
};

export default reducer;
