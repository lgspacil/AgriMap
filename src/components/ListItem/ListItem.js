import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native";

class ListItem extends Component {

  state = {
    animated: new Animated.Value(0)
  }

  constructor(props) {
    super(props);
  }

  componentDidUpdate(){
    //resetting
    this.state.animated.setValue(0);
  }

  annimate = () => {
    //resetting the annimation
    Animated.timing(this.state.animated, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start(() => {
      this.props.onItemPressed();
      this.state.animated.setValue(0);
    });
  }

  render(){
    //move item to the right
    const translateX = this.state.animated.interpolate({
      inputRange:[0,1],
      outputRange:[0,500]
    })

    //translate needs to be passed to transform 
    const transform = [{translateX}];

    return (
      <Animated.View style={{transform}}>
      <TouchableOpacity onPress={this.annimate}>
        <View style={styles.listItem}>
          <Text style={styles.farmName}>{this.props.farmName}</Text>
        </View>
      </TouchableOpacity>
      </Animated.View>
    )
  };
};

const styles = StyleSheet.create({
  listItem: {
    width: "100%",
    marginBottom: 5,
    padding: 10,
    backgroundColor: "#eee",
    flexDirection: "row",
    alignItems: "center"
  },
  placeImage: {
      marginRight: 8,
      height: 30,
      width: 30
  },
  farmName: {
    fontSize: 18,
    fontWeight: "bold"
  }
});

export default ListItem;
