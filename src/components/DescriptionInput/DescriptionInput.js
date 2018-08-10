import React, { Component } from "react";
import DefaultInput from "../UI/DefaultInput/DefaultInput";

const descriptionInput = props => (
  <DefaultInput
    placeholder="Description about location"
    value={props.descriptionData.value}
    valid={props.descriptionData.valid}
    touched={props.descriptionData.touched}
    onChangeText={props.onChangeText}
    style={{
        height: 100, 
        width: '100%',
        fontSize: 17
      }}
  />
);

export default descriptionInput;
