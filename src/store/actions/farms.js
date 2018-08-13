import {
  SET_FARMS,
  REMOVE_FARM
} from "./actionTypes";

export const submitFarmArea = (info) => {
  return dispatch => {
    let url = "https://secure-retreat-74173.herokuapp.com/submit_farm";
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
  return dispatch => {
    let url = "https://secure-retreat-74173.herokuapp.com/get_all_farms";
    fetch(url)
      .catch((err) => {
        console.log('unable to fetch all farms')
      })
      .then(res => res.json())
      .then((res) => {
        var new_data = JSON.stringify(res)

        // when all the farms are fetched set the state to them so the entire app has access
        dispatch(setFarms(JSON.parse(new_data)));
      })
  }
}

export const deleteFarm = id => {
  return dispatch => {
    let url = "https://secure-retreat-74173.herokuapp.com/delete_farm";
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
        // deleting farms from the backend and now remove it from state
        dispatch(removeFarm(id));
      }
      
    })
  }
}

// removing the farm from state 
export const removeFarm = id => {
  return {
    type: REMOVE_FARM,
    id: id
  }
}

// setting the state to all the farms that were fetched from the database
export const setFarms = farms => {
  return {
    type: SET_FARMS,
    farms: farms
  };
};



