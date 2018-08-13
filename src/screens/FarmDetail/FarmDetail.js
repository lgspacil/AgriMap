import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
    ScrollView
} from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import { deleteFarm } from "../../store/actions/index";
import MapboxGL from "@mapbox/react-native-mapbox-gl";
import { lineString as lineString } from "@turf/helpers";
import HeadingText from "../../components/UI/HeadingText/HeadingText";


MapboxGL.setAccessToken('pk.eyJ1Ijoic3BhY2lsbHVjYXMiLCJhIjoiY2pra2xhaHgyMXJtZjNxcDliZW01ZHhkZyJ9.rp87COSDjcs097pfP4iFNw');

class FarmDetail extends Component {
    state = {
        modal: false,
        imageView: false,
        intCoords: null
    };

    constructor(props) {
        super(props);
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
            <ScrollView style={styles.scrollViewContainer}>
                <View style={styles.container}>

                    <View style={styles.mapContainer}>
                        {map}
                    </View>

                    <View>
                        <HeadingText>
                            {this.props.selectedFarm.name}
                        </HeadingText>
                    </View>

                    <View>
                        <Text style={{color: "white"}}>
                            {this.props.selectedFarm.description}
                        </Text>
                    </View>

                    <View>
                        <TouchableOpacity onPress={this.placeDeletedHandler}>
                            <View style={styles.deleteButton}>
                                <Icon
                                    size={30}
                                    name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
                                    color="#ffcf5a"
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
    fillLayer: {
        fillAntialias: true,
        fillColor: 'green',
        fillOpacity: 0.5,
        fillOutlineColor: 'rgba(255, 255, 255, 0.84)'
    }
});

const ANNOTATION_SIZE = 20;

const styles = StyleSheet.create({
    scrollViewContainer: {
        backgroundColor: "#8c8d9f",
        flex: 1
    },
    container: {
        margin: 22,
        alignItems: 'center',
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
        width: '95%',
        borderWidth: 4,
        borderColor: "#ffcf5a"
    },
    annotationContainer: {
        width: ANNOTATION_SIZE,
        height: ANNOTATION_SIZE,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
        borderRadius: ANNOTATION_SIZE / 2,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "rgba(0, 0, 0, 0.45)"
    },
    annotationFill: {
        width: ANNOTATION_SIZE - 3,
        height: ANNOTATION_SIZE - 3,
        borderRadius: (ANNOTATION_SIZE - 3) / 2,
        backgroundColor: "#ffcf5a",
        transform: [{ scale: 0.6 }]
    },
});

const mapDispatchToProps = dispatch => {
    return {
        onDeleteFarm: id => dispatch(deleteFarm(id))
    };
};

export default connect(null, mapDispatchToProps)(FarmDetail);
