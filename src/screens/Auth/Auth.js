import React, { Component } from "react";
import startMainTabs from '../MainTabs/startMainTabs';
import {
    View,
    Text,
    Button,
    TextInput,
    StyleSheet,
    ImageBackground,
    Dimensions,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback,
    ActivityIndicator
  } from "react-native";

  class Auth extends Component {
      state = {
          marker: {
              coordinate: {
                latitude: 47.6062,
                longitude: -122.3321
              }
          }
      }

      loginHandler = () => {
        startMainTabs();
      }

      render(){
          return(
              <View style={styles.container}>
                  <TextInput placeholder="login here"></TextInput>
                  <Button title="Submit" onPress={this.loginHandler}></Button>
              </View>
          )
      }
  }

  const styles = StyleSheet.create({
      container: {
        flex: 1,
        flexDirection: "column"
      },
      map: {
          height: '90%',
          width: '90%',
          backgroundColor: 'green'
      },
      mapContainer: {
          flex: 2,
          backgroundColor: 'blue',
          alignItems: 'center',
          justifyContent: 'center'

      },
      secondBox: {
          flex: 1,
          backgroundColor: 'red'
      }
  })

  export default Auth;