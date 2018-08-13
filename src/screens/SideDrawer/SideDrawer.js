import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";

import { authLogout, loadEarthQuakes, loadFarms } from "../../store/actions/index";
import { AsyncStorage } from "react-native"
import { Navigation } from "react-native-navigation";




class SideDrawer extends Component {

  constructor(props) {
    super(props);

  }

  logOutPressed = () => {
    // remove the storage email I had
    AsyncStorage.removeItem('email');

    // Start the app again, this is what was called from App.js
    Navigation.startSingleScreenApp({
      screen: {
        screen: "agri-mapp.AuthScreen",
        title: "Login"
      }
    });
  }

  loadEarthQuakes = () => {
    // send an action to have earthquakes shown on heat map
    this.props.onLoadEathQuakes();
  }

  loadFarms = () => {
    // send an action to have farms shown on heat map
    this.props.onLoadFarms();
  }

  render() {
    let extraButtons;
    if(this.props.findFarmScreen === false && this.props.addFarmScreen === false && this.props.heatMapScreen === true){
      extraButtons = (
        <View>
          <TouchableOpacity onPress={this.loadEarthQuakes}>
          <View style={[styles.drawerItem, this.props.loadEarthquakes ? styles.selectedButton : null]}>
            <Icon
              name={Platform.OS === "android" ? "md-wifi" : "ios-wifi"}
              size={30}
              color="red"
              style={styles.drawerItemIcon}
            />
            <Text>Load EarthQuake</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.loadFarms}>
          <View style={[styles.drawerItem, this.props.loadFarms ? styles.selectedButton: null]}>
            <Icon
              name={Platform.OS === "android" ? "md-leaf" : "ios-leaf"}
              size={30}
              color="#88BEA3"
              style={styles.drawerItemIcon}
            />
            <Text>Load Farm</Text>
          </View>
        </TouchableOpacity>
        </View>
      )
    }
    return (
      <View
        style={[
          styles.container,
          { width: Dimensions.get("window").width * 0.8 },
        ]}
      >
        <TouchableOpacity onPress={this.logOutPressed}>
          <View style={styles.drawerItem}>
            <Icon
              name={Platform.OS === "android" ? "md-log-out" : "ios-log-out"}
              size={30}
              color="#aaa"
              style={styles.drawerItemIcon}
            />
            <Text>Sign Out</Text>
          </View>
        </TouchableOpacity>
        {extraButtons}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: "#8c8d9f",
    flex: 1
  },
  // make it a row to have items be in a row vs default column
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#eee"
  },
  drawerItemIcon: {
    marginRight: 10
  },
  selectedButton: {
    backgroundColor: '#ffcf5a'
  }
});

const mapStateToProps = state => {
  return {
    loadEarthquakes: state.ui.loadEarthQuakes,
    loadFarms: state.ui.loadFarms,
    findFarmScreen: state.ui.findFarmScreen,
    addFarmScreen: state.ui.addFarmScreen,
    heatMapScreen: state.ui.heatMapScreen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(authLogout()),
    onLoadEathQuakes: () => dispatch(loadEarthQuakes()),
    onLoadFarms: () => dispatch(loadFarms())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideDrawer);
