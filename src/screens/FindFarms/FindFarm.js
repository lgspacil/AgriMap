import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button
} from "react-native";

import Mapbox from '@mapbox/react-native-mapbox-gl';
import { getFarms } from "../../store/actions/index";
import { connect } from "react-redux";
import FarmList from "../../components/FarmList/FarmList";

Mapbox.setAccessToken('pk.eyJ1Ijoic3BhY2lsbHVjYXMiLCJhIjoiY2pra2xhaHgyMXJtZjNxcDliZW01ZHhkZyJ9.rp87COSDjcs097pfP4iFNw');


class FindFarm extends Component {

  static navigatorStyle = {
    navBarButtonColor: "orange"
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
      }
    }
    // if (event.type === "NavBarButtonPress") {
    //   if (event.id === "sideDrawerToggle") {
    //     this.props.navigator.toggleDrawer({
    //       side: "left"
    //     });
    //   } else if (event.id === "rightButtonCardView") {
    //     if (this.state.viewType === "list") {
    //       this.setState({
    //         viewType: "card"
    //       })
    //     } else {
    //       this.setState({
    //         viewType: "list"
    //       })
    //     }

    //   }
    // }
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
    onLoadPlaces: () => dispatch(getFarms())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FindFarm);
