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

  class AddFarm extends Component {
      
      render(){
          return(
              <View style={styles.container}>
                  
                  <Text>Add Farm</Text>
              </View>
          )
      }
  }

  const styles = StyleSheet.create({
      container: {
        flex: 1,
        flexDirection: "column"
      }
  })

  export default AddFarm;