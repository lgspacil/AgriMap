import React, { Component } from "react";
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Button,
    ScrollView,
    TextInput
} from "react-native";
import { connect } from "react-redux";
const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE = 38.79930767201779;
const LONGITUDE = -77.12911152370515;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
import MapboxGL from "@mapbox/react-native-mapbox-gl";
import { lineString as makeLineString, lineString } from "@turf/helpers";
import MainText from "../../components/UI/MainText/MainText";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import {submitFarmArea} from "../../store/actions/index";
import { getFarms } from "../../store/actions/index";

MapboxGL.setAccessToken('pk.eyJ1Ijoic3BhY2lsbHVjYXMiLCJhIjoiY2pra2xhaHgyMXJtZjNxcDliZW01ZHhkZyJ9.rp87COSDjcs097pfP4iFNw');

class AddFarm extends Component {
    state = {
        name: "",
        points: [],
        connected: true,
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
            ]
        }
    };

    onPress = (e, c) => {

        // new feature is needed so you can show the farms on a heat map
        let newFeature = {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Point",
                "coordinates": []
            }
        }
        // adding a new coordinate to a new feature
        newFeature.geometry.coordinates.push(e.geometry.coordinates[0]);
        newFeature.geometry.coordinates.push(e.geometry.coordinates[1]);

        this.setState(prevState => {
            return {
                info: {
                    ...prevState.info,
                    features: [
                        ...prevState.info.features,
                        newFeature
                    ]
                }
            }
        })

        this.setState({ points: [...this.state.points, e.geometry.coordinates] });
    };

    toggleFill = () => {
        this.setState({
            connected: this.state.connected ? false : true
        })
    }

    componentDidMount() {
        console.log('component mounted')
        this.props.onLoadPlaces();
    }

    deletePoint = (i) => {
        // removing the index from the array clicked
        this.setState({
            points: this.state.points.filter(
                // if the index does not equal the index clicked keep them
                (x, index) => index !== i
            )
        })
    }

    submit = () => {
        console.log('submit with info of: ', this.state.name, this.state.points);
        this.props.onSubmitFarmArea({name: this.state.name, coordinates: this.state.points})
    }

    updateInputState = (text) => {
        this.setState({
            name: text
        })
    }

    render() {
        let pointsOnMap = null;
        if (this.state.points.length > 0) {
            pointsOnMap = this.state.points.map((point, i) => (
                // console.log(point.geometry.coordinates)
                <MapboxGL.PointAnnotation
                    key={String(point[0] + point[1])}
                    id={String(point[0] + point[1])}
                    title="Test"
                    coordinate={point}
                >
                    <View style={styles.annotationContainer}>
                        <View style={[styles.annotationFill]} />
                    </View>
                    <MapboxGL.Callout title="Look an anotation">
                        <View style={styles.calloutContainer}>
                            <View style={styles.calloutContent}>
                                <Button
                                    title="Delete"
                                    onPress={() => this.deletePoint(i)}
                                />
                            </View>
                        </View>
                    </MapboxGL.Callout>
                </MapboxGL.PointAnnotation>
            ))
        }

        let linesOnMap = null;
        if (this.state.points.length > 1 && !this.state.connected) {
            linesOnMap = (
                <MapboxGL.ShapeSource
                    id="routeSource"
                    shape={lineString(this.state.points)}
                >
                    <MapboxGL.LineLayer id="routeFill" style={layerStyles.route} />
                </MapboxGL.ShapeSource>
            );
        } else if (this.state.connected && this.state.points.length > 1) {
            linesOnMap = (
                <MapboxGL.ShapeSource
                    id="routeSource"
                    shape={lineString(this.state.points)}
                >
                    <MapboxGL.FillLayer id="routeFill" style={layerStyles.fillLayer} />
                </MapboxGL.ShapeSource>
            );
        }

        return (
            <ScrollView>
                <View style={styles.mainContainer}>
                    <MainText>
                        <HeadingText>Map out an area</HeadingText>
                    </MainText>

                    <TextInput style={{width: '100%'}}placeholder="Enter Name" onChangeText={val => this.updateInputState(val)}></TextInput>
                    <View style={styles.mapContainer}>
                        <MapboxGL.MapView
                            onPress={this.onPress}
                            style={styles.map}
                            centerCoordinate={[LONGITUDE, LATITUDE]}
                        >
                            {pointsOnMap}
                            {linesOnMap}
                        </MapboxGL.MapView>
                    </View>
                    <View>
                    {/* <Button title="Toggle Area Mapped" onPress={this.toggleFill}/> */}
                    <Button title="Submit Area Mappsed" onPress={this.submit}/>
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
    button: {
        margin: 30,
        color: 'red'
    },
    mainContainer: {
        flex: 1,
        alignItems: "center"
    },
    mapContainer: {
        width: '100%',
        alignItems: 'center',
    },
    map: {
        width: "100%",
        height: 250
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
    calloutContainer: {
        alignItems: "center",
        justifyContent: "center",
        width: 180,
        zIndex: 9999999
    },
    calloutContent: {
        position: "relative",
        padding: 8,
        flex: 1,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.2)",
        backgroundColor: "white",
        flexDirection: 'row'
    },
    calloutTip: {
        zIndex: 1000,
        marginTop: -2,
        elevation: 0,
        backgroundColor: "transparent",
        borderTopWidth: 16,
        borderRightWidth: 8,
        borderBottomWidth: 0,
        borderLeftWidth: 8,
        borderTopColor: "white",
        borderRightColor: "transparent",
        borderBottomColor: "transparent",
        borderLeftColor: "transparent"
    }
});

// const mapStateToProps = state => {
    // return {
    //     isLoading: state.ui.isLoading
    // };
// };

const mapDispatchToProps = dispatch => {
    return {
        onSubmitFarmArea: (info) => dispatch(submitFarmArea(info)),
        onLoadPlaces: () => dispatch(getFarms())
        // onTryAuth: (authData, authMode) => dispatch(tryAuth(authData, authMode)),
        // onAutoSignIn: () => dispatch(authAutoSignIn())
    };
};
  
export default connect(null, mapDispatchToProps)(AddFarm);