import React from 'react';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import {getFarms} from "../../store/actions/index";

import {
    View,
    Text,
    StyleSheet,

} from "react-native";
import { connect } from "react-redux";

const LATITUDE = 38.79930767201779;
const LONGITUDE = -77.12911152370515;

MapboxGL.setAccessToken('pk.eyJ1Ijoic3BhY2lsbHVjYXMiLCJhIjoiY2pra2xhaHgyMXJtZjNxcDliZW01ZHhkZyJ9.rp87COSDjcs097pfP4iFNw');

class HeatMap extends React.Component {
    constructor() {
        super();
        this.state = {
            farms: null
        }
      }

    componentDidMount(){
      // loading the farms when component mounts
      console.log('$$$', this.props.farms);

      this.createFarmPoints();
    }

    createFarmPoints = () => {
      // converting the strings into ints to use on the map
      let features = [];

      this.props.farms.map((point) => {

        let layOut = {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "Point",
            "coordinates": []
          }
        }

        let first_point = point.coords[0]
        let two_points = first_point.split(',');

        console.log(two_points);

        layOut.geometry.coordinates.push(parseFloat(two_points[0]));
        layOut.geometry.coordinates.push(parseFloat(two_points[1]));

        features.push(layOut);
      })
      this.setState({
        farms: {
          "type": "FeatureCollection",
          "features": features
        }
      })

    }

  render() {
    return (
      <View style={{flex: 1}}>
        <MapboxGL.MapView
          zoomLevel={7}
          centerCoordinate={[LONGITUDE, LATITUDE]}
          style={{flex: 1}}
          styleURL={MapboxGL.StyleURL.Dark}>
          <MapboxGL.ShapeSource
            id="earthquakes"
            cluster
            clusterRadius={50}
            // will keep items clustered when you zoom into at least a 14 
            clusterMaxZoom={14}
            // shape={this.state.farms}
            url="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
            >

            <MapboxGL.CircleLayer
              id="clusteredPoints"
              belowLayerID="pointCount"
              filter={['has', 'point_count']}
              style={layerStyles.clusteredPoints}
            />

            <MapboxGL.CircleLayer
              id="singlePoint"
              filter={['!has', 'point_count']}
              style={layerStyles.singlePoint}
            />
          </MapboxGL.ShapeSource>
        </MapboxGL.MapView>
      </View>
    );
  }
}

const layerStyles = MapboxGL.StyleSheet.create({
  singlePoint: {
    circleColor: 'green',
    circleOpacity: 0.84,
    circleStrokeWidth: 2,
    circleStrokeColor: 'white',
    circleRadius: 5,
    circlePitchAlignment: 'map',
  },

  clusteredPoints: {
    circlePitchAlignment: 'map',
    circleColor: MapboxGL.StyleSheet.source(
    //how to read if there are two in a cluster collor orange
      [
        [2, 'yellow'],
        [3, 'red'],
        [4, 'blue'],
        [5, 'orange'],
        [6, 'pink'],
        [10, 'white'],
      ],
      'point_count',
      MapboxGL.InterpolationMode.Exponential,
    ),

    circleRadius: MapboxGL.StyleSheet.source(
      [[0, 15], [4, 20], [6, 30]],
      'point_count',
      MapboxGL.InterpolationMode.Exponential,
    ),
    circleBlur: 1,
    circleOpacity: 0.84,
  }
});

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

export default connect(mapStateToProps, mapDispatchToProps)(HeatMap);