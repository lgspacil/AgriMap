import React from 'react';
import MapboxGL from '@mapbox/react-native-mapbox-gl';

import {
    View,
    Text,
    StyleSheet,

} from "react-native";

const LATITUDE = 38.79930767201779;
const LONGITUDE = -77.12911152370515;


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

MapboxGL.setAccessToken('pk.eyJ1Ijoic3BhY2lsbHVjYXMiLCJhIjoiY2pra2xhaHgyMXJtZjNxcDliZW01ZHhkZyJ9.rp87COSDjcs097pfP4iFNw');

class EarthQuakes extends React.Component {
    constructor() {
        super();
        this.state = {
            info: {
                "type": "FeatureCollection",
                "features": [
                  {
                    "type": "Feature",
                    "properties": {
                    },
                    "geometry": {
                      "type": "Point",
                      "coordinates": [
                        -77.12911152370515,
                        38.79930767201779
                      ]
                    }
                  },
                  {
                    "type": "Feature",
                    "properties": {

                    },
                    "geometry": {
                      "type": "Point",
                      "coordinates": [
                        -77.16797018042666,
                        38.766521892689916
                      ]
                    }
                  },
                  {
                    "type": "Feature",
                    "properties": {

                    },
                    "geometry": {
                      "type": "Point",
                      "coordinates": [
                        -77.01586821694521,
                        38.885072355144786
                      ]
                    }
                  },
                  {
                    "type": "Feature",
                    "properties": {

                    },
                    "geometry": {
                      "type": "Point",
                      "coordinates": [
                        -77.01663895662587,
                        38.896090317663166
                      ]
                    }
                  },
                  {
                    "type": "Feature",
                    "properties": {

                    },
                    "geometry": {
                      "type": "Point",
                      "coordinates": [
                        -77.00513941992737,
                        38.885062500925
                      ]
                    }
                  },
                  {
                    "type": "Feature",
                    "properties": {

                    },
                    "geometry": {
                      "type": "Point",
                      "coordinates": [
                        -77.02807799718069,
                        38.89831447321318
                      ]
                    }
                  },
                  {
                    "type": "Feature",
                    "properties": {

                    },
                    "geometry": {
                      "type": "Point",
                      "coordinates": [
                        -77.02191539042379,
                        38.89831680979661
                      ]
                    }
                  },
                  {
                    "type": "Feature",
                    "properties": {

                    },
                    "geometry": {
                      "type": "Point",
                      "coordinates": [
                        -77.02191438038649,
                        38.906436814951725
                      ]
                    }
                  },
                  {
                    "type": "Feature",
                    "properties": {

                    },
                    "geometry": {
                      "type": "Point",
                      "coordinates": [
                        -77.0274958929489,
                        38.91700239924426
                      ]
                    }
                  },
                  {
                    "type": "Feature",
                    "properties": {

                    },
                    "geometry": {
                      "type": "Point",
                      "coordinates": [
                        -77.00741429219985,
                        38.89776603923524
                      ]
                    }
                  },
                  {
                    "type": "Feature",
                    "properties": {

                    },
                    "geometry": {
                      "type": "Point",
                      "coordinates": [
                        -76.98851193260715,
                        38.84565770287511
                      ]
                    }
                  },
                  {
                    "type": "Feature",
                    "properties": {
  
                    },
                    "geometry": {
                      "type": "Point",
                      "coordinates": [
                        -76.95626270945314,
                        38.8513013835867
                      ]
                    }
                  },
                  {
                    "type": "Feature",
                    "properties": {

                    },
                    "geometry": {
                      "type": "Point",
                      "coordinates": [
                        -76.93187015895299,
                        38.84396455441679
                      ]
                    }
                  }
                ]
            }
        }
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
            shape={this.state.info}
            // url="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
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

export default EarthQuakes;