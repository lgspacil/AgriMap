import {
  SET_PLACES,
  SET_FARMS,
  REMOVE_PLACE,
  PLACE_ADDED,
  START_ADD_PLACE,
  ADD_NEW_PLACE,
  SUBMIT_FARM_AREA,
  REMOVE_FARM
} from "./actionTypes";
import { uiStartLoading, uiStopLoading, authGetToken } from "./index";


export const submitFarmArea = (info) => {
  console.log('in the submit farm area: ', info)
  return dispatch => {
    let url = "http://10.0.0.31:8080/submit_farm";
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        name: info.name,
        coords: info.coordinates,
        description: info.description
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .catch((err) => {
        console.log('the error is: ', err)
      })
      .then(res => res.json())
      .then((res) => {
        console.log('just added a farm: ', res);
      })
  }
}

// fetches all the farms from the database
export const getFarms = () => {
  console.log('fetching all farms')
  return dispatch => {
    let url = "http://10.0.0.31:8080/get_all_farms";
    fetch(url)
      .catch((err) => {
        console.log('unable to fetch all farms')
      })
      .then(res => res.json())
      .then((res) => {
        var new_data = JSON.stringify(res)
        console.log('all the farms are: ', JSON.parse(new_data))

        // when all the farms are fetched set the state to them
        dispatch(setFarms(JSON.parse(new_data)));
      })
  }
}

export const deleteFarm = id => {
  return dispatch => {
    let url = "http://10.0.0.31:8080/delete_farm";
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        id: id
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .catch((err) => {
      console.log('the error is: ', err)
    })
    .then(res => res.json())
    .then((res) => {
      if(res == true){
        console.log('the response from deleting the farm is: ', res);
        dispatch(removeFarm(id));
      }
      
    })
  }
}

export const removeFarm = id => {
  return {
    type: REMOVE_FARM,
    id: id
  }
}


export const setFarms = farms => {
  return {
    type: SET_FARMS,
    farms: farms
  };
};

// ------------------------------------------------------------------------
// ------------------------------------------------------------------------
// ------------------------------------------------------------------------

export const addNewPlace = (info) => {
  console.log('The info is: ', info)
  return {
    type: ADD_NEW_PLACE
  };
};

export const startAddPlace = () => {
  return {
    type: START_ADD_PLACE
  };
};

export const addPlace = (placeName, location, image, description) => {
  return dispatch => {
    let authToken;
    dispatch(uiStartLoading());
    dispatch(authGetToken())
      .catch(() => {
        alert("No valid token found!");
      })
      .then(token => {
        authToken = token;
        return fetch(
          "https://us-central1-react-native-myt-1530315514387.cloudfunctions.net/storeImage",
          {
            method: "POST",
            body: JSON.stringify({
              image: image.base64
            }),
            headers: {
              Authorization: "Bearer " + authToken
            }
          }
        );
      })
      .catch(err => {
        console.log(err);
        alert("Something went wrong, please try again!");
        dispatch(uiStopLoading());
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error();
        }
      })
      .then(parsedRes => {
        const placeData = {
          name: placeName,
          location: location,
          description: description,
          image: parsedRes.imageUrl,
          imagePath: parsedRes.imagePath
        };
        return fetch(
          "https://react-native-myt-1530315514387.firebaseio.com/places.json?auth=" +
          authToken,
          {
            method: "POST",
            body: JSON.stringify(placeData)
          }
        );
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error();
        }
      })
      .then(parsedRes => {
        console.log(parsedRes);
        dispatch(uiStopLoading());
        dispatch(placeAdded());
      })
      .catch(err => {
        console.log(err);
        alert("Something went wrong, please try again!");
        dispatch(uiStopLoading());
      });
  };
};

export const placeAdded = () => {
  return {
    type: PLACE_ADDED
  };
};

export const getPlaces = () => {
  return dispatch => {
    dispatch(authGetToken())
      .then(token => {
        return fetch(
          "https://react-native-myt-1530315514387.firebaseio.com/places.json?auth=" +
          token
        );
      })
      .catch(() => {
        alert("No valid token found!");
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error();
        }
      })
      .then(parsedRes => {
        const places = [];
        for (let key in parsedRes) {
          places.push({
            ...parsedRes[key],
            image: {
              uri: parsedRes[key].image
            },
            key: key
          });
        }
        dispatch(setPlaces(places));
      })
      .catch(err => {
        alert("Something went wrong, sorry :/");
        console.log(err);
      });
  };
};

export const setPlaces = places => {
  return {
    type: SET_PLACES,
    places: places
  };
};

export const deletePlace = key => {
  return dispatch => {
    dispatch(authGetToken())
      .catch(() => {
        alert("No valid token found!");
      })
      .then(token => {
        dispatch(removePlace(key));
        return fetch(
          "https://react-native-myt-1530315514387.firebaseio.com/places/" +
          key +
          ".json?auth=" +
          token,
          {
            method: "DELETE"
          }
        );
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error();
        }
      })
      .then(parsedRes => {
        console.log("Done!");
      })
      .catch(err => {
        alert("Something went wrong, sorry :/");
        console.log(err);
      });
  };
};

export const removePlace = key => {
  return {
    type: REMOVE_PLACE,
    key: key
  };
};
