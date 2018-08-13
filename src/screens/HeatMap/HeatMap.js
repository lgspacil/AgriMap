import React from 'react';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import { getFarms, heatMapScreen } from "../../store/actions/index";
import {
  View
} from "react-native";
import { connect } from "react-redux";

MapboxGL.setAccessToken('pk.eyJ1Ijoic3BhY2lsbHVjYXMiLCJhIjoiY2pra2xhaHgyMXJtZjNxcDliZW01ZHhkZyJ9.rp87COSDjcs097pfP4iFNw');

class HeatMap extends React.Component {

  static navigatorStyle = {
    navBarButtonColor: "green"
  };

  state = {
    earthquakes: null,
    farms: null,
    latitude: 47.606,  // fall back case is seattle
    longitude: -122.3321 // fall back case is seattle
  }

  constructor(props) {
    super(props);
    // allows the user to listen to navigaor events
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  //calling the earthquake api every 5 seoncds
  componentDidMount(){
    // calls it the first time to load info
    this.getEarthquakeData();
    // then calls it every 5 mins since api is updated every 5 min
    this.timer = setInterval(()=> this.getEarthquakeData(), 300000);
  }

  async getEarthquakeData(){

    fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson', {method: "GET"})
     .then((response) => response.json())
     .then((responseData) =>
     {
        this.setState({
          earthquakes: responseData

        })
       //set your data here
        console.log(responseData);
     })
     .catch((error) => {
         console.error(error);
     });
   
   }

  onNavigatorEvent = event => {
    // checking navigaor events
    if (event.type === "ScreenChangedEvent") {
      if (event.id === "willAppear") {
        // re create the farms when the user comes to the page
        this.createFarmPoints();
        this.props.onHeatMapScreen();
      }
    }
    // if the side bar button is pressed toggel the side drawer
    if (event.type === "NavBarButtonPress") {
      if (event.id === "sideDrawerToggle") {
        this.props.navigator.toggleDrawer({
          side: "left"
        });
      }
    }
  }

  componentWillMount() {
    //getting the location of your center for the heat map
    this.getLocationHandler();
  }

  getLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(pos => {
      this.setState({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude
      })
    },
      err => {
        console.log(err);
        alert("Fetching the Position failed, please pick one manually!");
      })
  }

  // a function that will convert the strings of coordinates into geoJson info
  createFarmPoints = () => {
    // converting the strings into ints to use on the map
    let features = [];

    this.props.farms.map((point) => {

      // this is the layout that the map can read for each heat map point
      let layOut = {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "Point",
          "coordinates": []
        }
      }

      // the heat map will only plot the first coordinate
      let first_point = point.coords[0]
      // split the coordinates
      let two_points = first_point.split(',');
      //converting the points into int floats
      layOut.geometry.coordinates.push(parseFloat(two_points[0]));
      layOut.geometry.coordinates.push(parseFloat(two_points[1]));
      // adding them to the layout coordinates
      features.push(layOut);
    })
    // when the loop is completed we can set the state to contain this feature
    this.setState({
      farms: {
        "type": "FeatureCollection",
        "features": features
      }
    })

  }

  render() {
    // data is all the geoJson points that will be shown
    let data;
    // if the sidedrawer button was clicked to view earthquakes this will be true
    if (this.props.loadEarthquakes && this.state.earthquakes !== null) {
      data = (
        <MapboxGL.ShapeSource
          id="earthquakes"
          cluster
          // Specifies the radius of each cluster if clustering is enabled.
          clusterRadius={50}
          // loads the geoJson info called from the fetch every 5 min
          shape={this.state.earthquakes}
        >

          <MapboxGL.CircleLayer
            id="clusteredPoints"
            // will display a cluster style if it is in a cluster
            filter={['has', 'point_count']}
            style={layerStyles.clusteredPoints}
          />

          <MapboxGL.CircleLayer
            id="singlePoint"
            // will display a single point if it does not match the cluster params
            filter={['!has', 'point_count']}
            style={layerStyles.singlePoint}
          />
        </MapboxGL.ShapeSource>
      )
    }
    // if the sidedrawer button was clicked to view farms this will be true 
    else if (this.props.loadFarms) {
      data = (
        <MapboxGL.ShapeSource
          id="earthquakes"
          cluster
          // Specifies the radius of each cluster if clustering is enabled.
          clusterRadius={50}
          // loads the geoJson info created from the createFarmPoints() function
          shape={this.state.farms}
        >

          <MapboxGL.CircleLayer
            id="clusteredPoints"
            // will display a cluster style if it is in a cluster
            filter={['has', 'point_count']}
            style={layerStyles.clusteredPoints}
          />

          <MapboxGL.CircleLayer
            id="singlePoint"
            // will display a single point if it does not match the cluster params
            filter={['!has', 'point_count']}
            style={layerStyles.singlePoint}
          />
        </MapboxGL.ShapeSource>
      )
    }
    // the main map 
    return (
      <View style={{ flex: 1 }}>
        <MapboxGL.MapView
          zoomLevel={7}
          centerCoordinate={[this.state.longitude, this.state.latitude]}
          style={{ flex: 1 }}
          styleURL={MapboxGL.StyleURL.Dark}>
          {data}
        </MapboxGL.MapView>
      </View>
    );
  }
}

const layerStyles = MapboxGL.StyleSheet.create({
  // a single point that can be viewed
  singlePoint: {
    circleColor: 'green',
    circleOpacity: 0.84,
    circleStrokeWidth: 2,
    circleStrokeColor: 'white',
    circleRadius: 5,
    circlePitchAlignment: 'map',
  },

  // the colors of different clusters
  clusteredPoints: {
    circlePitchAlignment: 'map',
    circleColor: MapboxGL.StyleSheet.source(
      //how to read: if there are two in a cluster collor yellow
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

    // How to read: if there are 4 in a cluster have a radius of 20
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
    farms: state.farms.farms,
    loadEarthquakes: state.ui.loadEarthQuakes,
    loadFarms: state.ui.loadFarms,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadPlaces: () => dispatch(getFarms()),
    onHeatMapScreen: () => dispatch(heatMapScreen())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeatMap);