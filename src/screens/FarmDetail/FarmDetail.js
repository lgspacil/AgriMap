import React, { Component } from "react";
import {
    View,
    Image,
    Text,
    Button,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Dimensions,
    ScrollView
} from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import { deleteFarm } from "../../store/actions/index";
import MapboxGL from "@mapbox/react-native-mapbox-gl";
import { lineString as makeLineString, lineString } from "@turf/helpers";
const LATITUDE = 38.79930767201779;
const LONGITUDE = -77.12911152370515;

MapboxGL.setAccessToken('pk.eyJ1Ijoic3BhY2lsbHVjYXMiLCJhIjoiY2pra2xhaHgyMXJtZjNxcDliZW01ZHhkZyJ9.rp87COSDjcs097pfP4iFNw');

class FarmDetail extends Component {
    state = {
        viewMode: "portrait",
        modal: false,
        imageView: false,
        intCoords: null
    };

    constructor(props) {
        super(props);
        Dimensions.addEventListener("change", this.updateStyles);
    }

    componentWillMount() {
        // converting the strings into ints to use on the map
        let intCoords = [];
        this.props.selectedFarm.coords.map((point) => {
            let pair = [];
            pair.push(parseFloat(point.split(',')[0]))
            pair.push(parseFloat(point.split(',')[1]))
            intCoords.push(pair);
        })

        this.setState({
            intCoords: intCoords
        })

    }

    componentWillUnmount() {
        Dimensions.removeEventListener("change", this.updateStyles);
    }

    updateStyles = dims => {
        this.setState({
            viewMode: dims.window.height > 500 ? "portrait" : "landscape"
        });
    };

    placeDeletedHandler = () => {
        this.props.onDeleteFarm(this.props.selectedFarm._id);
        this.props.navigator.pop();
    };

    render() {
        let pointsOnMap = null;
        if (this.state.intCoords.length > 0) {

            pointsOnMap = this.state.intCoords.map((point, i) => (
                <View key={i}>
                    <MapboxGL.PointAnnotation
                        key={String(point[0] + point[1])}
                        id={String(point[0] + point[1])}
                        title="Test"
                        coordinate={point}
                    >
                        <View style={styles.annotationContainer}>
                            <View style={[styles.annotationFill]} />
                        </View>
                    </MapboxGL.PointAnnotation>
                    <MapboxGL.ShapeSource
                        id="routeSource"
                        shape={lineString(this.state.intCoords)}
                    >
                        <MapboxGL.FillLayer id="routeFill" style={layerStyles.fillLayer} />
                    </MapboxGL.ShapeSource>
                </View>
            ))
        }

        let map;
        if (this.state.intCoords.length > 0) {
            map = (
                <MapboxGL.MapView
                    zoomLevel={12}
                    style={styles.map}
                    centerCoordinate={[this.state.intCoords[0][0], this.state.intCoords[0][1]]}
                >
                    {pointsOnMap}
                </MapboxGL.MapView>
            )
        }
        return (
            <ScrollView>
                <View style={styles.container}>

                    <View style={styles.mapContainer}>
                        {map}
                    </View>

                    <View >
                        <Text style={styles.placeName}>
                            {this.props.selectedFarm.name}
                        </Text>
                    </View>

                    <View>
                        <Text>
                            {this.props.selectedFarm.description}
                        </Text>
                    </View>

                    <View>
                        <TouchableOpacity onPress={this.placeDeletedHandler}>
                            <View style={styles.deleteButton}>
                                <Icon
                                    size={30}
                                    name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
                                    color="red"
                                />
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        );
    }
}

const layerStyles = MapboxGL.StyleSheet.create({
    route: {
        lineColor: "red",
        lineWidth: 3,
        lineOpacity: 0.84
    },
    fillLayer: {
        fillAntialias: true,
        fillColor: 'green',
        fillOpacity: 0.5,
        fillOutlineColor: 'rgba(255, 255, 255, 0.84)'
    }
});

const ANNOTATION_SIZE = 20;

const styles = StyleSheet.create({
    container: {
        margin: 22,
        alignItems: 'center'
    },
    placeImage: {
        width: "100%",
        height: "100%"
    },
    placeName: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 28
    },
    map: {
        flex: 1
    },
    deleteButton: {
        alignItems: "center"
    },
    pictureContainer: {
        height: 300,
        width: '100%',
        marginBottom: 10
    },
    mapContainer: {
        height: 400,
        width: '95%'
    },
    annotationContainer: {
        width: ANNOTATION_SIZE,
        height: ANNOTATION_SIZE,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        borderRadius: ANNOTATION_SIZE / 2,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "rgba(0, 0, 0, 0.45)"
    },
    annotationFill: {
        width: ANNOTATION_SIZE - 3,
        height: ANNOTATION_SIZE - 3,
        borderRadius: (ANNOTATION_SIZE - 3) / 2,
        backgroundColor: "orange",
        transform: [{ scale: 0.6 }]
    },
});

const mapDispatchToProps = dispatch => {
    return {
        onDeleteFarm: id => dispatch(deleteFarm(id))
    };
};

export default connect(null, mapDispatchToProps)(FarmDetail);
