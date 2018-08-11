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
import { Navigation } from "react-native-navigation";




class SideDrawer extends Component {

  constructor(props) {
    super(props);

  }

  logOutPressed = () => {
    // this.props.onLogout();

    // // Start a App
    // Navigation.startSingleScreenApp({
    //   screen: {
    //     screen: "awesome-places.AuthScreen",
    //     title: "Login"
    //   }
    // });

  }

  loadEarthQuakes = () => {
    console.log('clicked to load earth quakes');
    this.props.onLoadEathQuakes();
  }

  loadFarms = () => {
    console.log('clicked to load farms');
    this.props.onLoadFarms();
  }

  playMusic = () => {
    console.log('play music')
    // const sound = new Sound('../../assets/song.mp3', null, (error) => {
    //   if (error) {
    //     // do something
    //   }

    //   // play when loaded
    //   sound.play();
    // });
  }

  render() {
    return (
      <View
        style={[
          styles.container,
          { width: Dimensions.get("window").width * 0.8 }
        ]}
      >
        <TouchableOpacity onPress={this.logOutPressed}>
          <View style={[styles.drawerItem, styles.logOut]}>
            <Icon
              name={Platform.OS === "android" ? "md-log-out" : "ios-log-out"}
              size={30}
              color="#aaa"
              style={styles.drawerItemIcon}
            />
            <Text>Sign Out</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.loadEarthQuakes}>
          <View style={styles.drawerItem}>
            <Icon
              name={Platform.OS === "android" ? "md-wifi" : "ios-wifi"}
              size={30}
              color="#aaa"
              style={styles.drawerItemIcon}
            />
            <Text>Load EarthQuake</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.loadFarms}>
          <View style={styles.drawerItem}>
            <Icon
              name={Platform.OS === "android" ? "md-leaf" : "ios-leaf"}
              size={30}
              color="#aaa"
              style={styles.drawerItemIcon}
            />
            <Text>Load Farm</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.playMusic}>
          <View style={styles.drawerItem}>
            <Icon
              name={Platform.OS === "android" ? "md-musical-notes" : "ios-musical-notes"}
              size={30}
              color="#aaa"
              style={styles.drawerItemIcon}
            />
            <Text>Play Music</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: "white",
    flex: 1
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#eee"
  },
  drawerItemIcon: {
    marginRight: 10
  },
  logOut: {
    backgroundColor: 'red'
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(authLogout()),
    onLoadEathQuakes: () => dispatch(loadEarthQuakes()),
    onLoadFarms: () => dispatch(loadFarms())
  };
};

export default connect(null, mapDispatchToProps)(SideDrawer);
