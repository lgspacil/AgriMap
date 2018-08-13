import React from "react";
import { TextInput, StyleSheet } from "react-native";

// A function that is called immediately 
const defaultInput = props => (
  <TextInput
    underlineColorAndroid="transparent"
    // passing in the props included
    {...props}
    // the style takes in these styles and the props styles
    // the props style will override these
    style={[styles.input, props.style, !props.valid && props.touched ? styles.invalid : null]}
  />
);

const styles = StyleSheet.create({
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ffcf5a",
    padding: 5,
    marginTop: 8,
    marginBottom: 8,
    fontWeight: 'bold'
  },
  invalid: {
    backgroundColor: '#f9c0c0',
    borderColor: "red"
  }
});

export default defaultInput;
