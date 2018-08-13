import React, { Component } from "react";
import {
  View,
  StyleSheet,
} from "react-native";

import Mapbox from '@mapbox/react-native-mapbox-gl';
import { getFarms, findFarmScreen } from "../../store/actions/index";
import { connect } from "react-redux";
import FarmList from "../../components/FarmList/FarmList";

Mapbox.setAccessToken('pk.eyJ1Ijoic3BhY2lsbHVjYXMiLCJhIjoiY2pra2xhaHgyMXJtZjNxcDliZW01ZHhkZyJ9.rp87COSDjcs097pfP4iFNw');


class FindFarm extends Component {

  static navigatorStyle = {
    navBarButtonColor: "green"
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onNavigatorEvent = event => {
    // when you open this screen reload the farms
    if (event.type === "ScreenChangedEvent") {
      if (event.id === "willAppear") {
        this.props.onLoadPlaces();
        this.props.onFindFarmScreen();
      }
    }

    // if the side bar button is pressed toggle the side drawer
    if (event.type === "NavBarButtonPress") {
      if (event.id === "sideDrawerToggle") {
        this.props.navigator.toggleDrawer({
          side: "left"
        });
      }
    }
  };

  itemSelectedHandler = id => {
    const selFarm = this.props.farms.find(farm => {
      return farm._id === id;
    });

    this.props.navigator.push({
      screen: "agri-mapp.FarmDetailScreen",
      title: selFarm.name,
      passProps: {
        selectedFarm: selFarm
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <FarmList
          farms={this.props.farms}
          onItemSelected={this.itemSelectedHandler}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

const mapStateToProps = state => {
  return {
    farms: state.farms.farms
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadPlaces: () => dispatch(getFarms()),
    onFindFarmScreen: () => dispatch(findFarmScreen())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FindFarm);
