import React, { Component } from "react";
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

  class FindFarm extends Component {
      
      render(){
          return(
              <View style={styles.container}>
                  
                  <Text>Find Farm</Text>
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

  export default FindFarm;