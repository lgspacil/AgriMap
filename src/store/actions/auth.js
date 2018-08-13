import { AsyncStorage } from "react-native";
import {  getFarms } from "./index";
import startMainTabs from "../../screens/MainTabs/startMainTabs";

// User is logging in, the info is the name, email and password
export const testSignIn = (info) => {
  return dispatch => {
    //pass this info to my DataBase
    let url = "https://secure-retreat-74173.herokuapp.com/login";
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        name: info.name,
        email: info.email,
        password: info.password
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
        // If the Database sends back true I know that it is okay to save the email address
        if (res === true) {
          //save to asyncStorage
          AsyncStorage.setItem('email', info.email);
          // Now call the action to get all farms to load
          dispatch(getFarms())
          // call this function to start all the main tabs
          startMainTabs();
        }
      })
  }
}

export const autoLogin = (email) => {
  console.log('trying auto login')
  return dispatch => {
    let url = "https://secure-retreat-74173.herokuapp.com/auto_login";
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: email
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
        console.log('the response is: ', res);
        if (res === true) {
          // if auto login is true then load all the farms for the app
          dispatch(getFarms());
          startMainTabs();
        }
      })
  }
}
