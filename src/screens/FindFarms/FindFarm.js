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

    state = {
        
    };

    componentDidMount() {
      console.log('component mounted')
      this.props.onLoadPlaces();
    }
    
    itemSelectedHandler = id => {
      console.log('you hit me!', id)
      const selFarm = this.props.farms.find(farm => {
        return farm._id === id;
      });

      console.log('the selected farm is: ', selFarm);
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
