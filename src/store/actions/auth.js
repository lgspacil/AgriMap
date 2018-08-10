import { AsyncStorage } from "react-native";
var storage = require('react-native-local-storage');
import { TRY_AUTH, AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN } from "./actionTypes";
import { uiStartLoading, uiStopLoading, getFarms } from "./index";
import startMainTabs from "../../screens/MainTabs/startMainTabs";
import App from "../../../App";

const API_KEY = "AIzaSyBDgdcyCHrbsEyS5p0rM1hYVe656e1g8y4";

export const testSignIn = (info) => {
  return dispatch => {
    console.log('made it to the actions test sign in with ', info);
    let url = "http://10.0.0.31:8080/login";
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
        console.log('the response is: ', res);
        if (res === true) {
          //save to asyncStorage
          AsyncStorage.setItem('email', info.email);
          dispatch(getFarms())
          startMainTabs();
        }
      })
  }
}

export const autoLogin = () => {
  return async dispatch => {
    try {
      // let fetchedEmail = await AsyncStorage.getItem('email');
      let fetchedEmail = "spacillucas07@gmail.com"
      let url = "http://10.0.0.31:8080/auto_login";
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: fetchedEmail
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
            dispatch(getFarms());
            startMainTabs();
          }
        })
    } catch (err) {
    console.log('error', err)
  }

}

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------


}
