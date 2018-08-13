import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Button,
    ScrollView,
} from "react-native";
import { connect } from "react-redux";
import MapboxGL from "@mapbox/react-native-mapbox-gl";
import { lineString as lineString } from "@turf/helpers";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import { submitFarmArea, addFarmScreen } from "../../store/actions/index";
import validate from "../../utility/validation";
import PlaceInput from "../../components/PlaceInput/PlaceInput";
import DescriptionInput from "../../components/DescriptionInput/DescriptionInput";

MapboxGL.setAccessToken('pk.eyJ1Ijoic3BhY2lsbHVjYXMiLCJhIjoiY2pra2xhaHgyMXJtZjNxcDliZW01ZHhkZyJ9.rp87COSDjcs097pfP4iFNw');

class AddFarm extends Component {

    static navigatorStyle = {
        navBarButtonColor: "green"
    };

    constructor(props) {
        super(props);
        // allows the user to listen to navigaor events
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    onNavigatorEvent = event => {
        // checking navigaor events
        if (event.type === "ScreenChangedEvent") {
            if (event.id === "willAppear") {
                this.props.onAddFarmScreen();
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
    }

    // when component mounts you set the state
    // aloows for a way to remove the filled in items with reset()
    componentWillMount() {
        this.reset();

        //setting the location
        this.getLocationHandler('willMount')
    }


    reset = () => {
        this.setState({
            points: [],
            latitude: 47.606,  // fall back case is seattle
            longitude: -122.3321, // fall back case is seattle
            controls: {
                placeName: {
                    value: "",
                    valid: false,
                    touched: false,
                    validationRules: {
                        notEmpty: true
                    }
                },
                description: {
                    value: "",
                    valid: false,
                    touched: false,
                    validationRules: {
                        notEmpty: true
                    }
                }
            }
        })
    }

    getLocationHandler = (id) => {
        // will run when the component mounts as to center on your location
        if (id === "willMount") {
            navigator.geolocation.getCurrentPosition(pos => {
                console.log('pos -->', pos.coords)
                this.setState({
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude
                })
            },
                err => {
                    console.log(err);
                    alert("Fetching the Position failed, will default to Seattle");
                })
        } else if (id === "setLocation") {
            // if I set locate me from the button click set a point on the map
            let coordinates;
            navigator.geolocation.getCurrentPosition(pos => {
                // fly to your location
                this._map.flyTo([pos.coords.longitude, pos.coords.latitude], 2500);
                coordinates = [pos.coords.longitude, pos.coords.latitude]
                this.setState({ points: [...this.state.points, coordinates] });
            },
                err => {
                    console.log(err);
                    alert("Fetching the Position failed, please pick one manually!");
                })
        }

    }

    // function that handles the maps on press
    // writes out the previous states as well as the new coords
    onPress = (e, c) => {
        this.setState({ points: [...this.state.points, e.geometry.coordinates] });
    };

    // removing one of the index
    deletePoint = (i) => {
        // removing the index from the array clicked
        this.setState({
            points: this.state.points.filter(
                // if the index does not equal the index clicked keep them
                (x, index) => index !== i
            )
        })
    }

    // a validator and check to see if the name field was inputed and checked by the validator
    placeNameChangedHandler = val => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    placeName: {
                        ...prevState.controls.placeName,
                        value: val,
                        valid: validate(val, prevState.controls.placeName.validationRules),
                        touched: true
                    }
                }
            };
        });
    };

    // a validator and check to see if the description field was inputed and checked by the validator
    descriptionChangedHandler = val => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    description: {
                        ...prevState.controls.description,
                        value: val,
                        valid: validate(val, prevState.controls.description.validationRules),
                        touched: true
                    }
                }
            };
        });
    };

    // called when we want to submit the data to database and action
    placeAddedHandler = () => {
        // calling an action
        this.props.onSubmitFarmArea({
            name: this.state.controls.placeName.value,
            coordinates: this.state.points,
            description: this.state.controls.description.value
        });
        // resetting the values when submitting
        this.reset();
        // routing to the second index to see the new farm that was added
        this.props.navigator.switchToTab({ tabIndex: 2 });
    };

    render() {
        // points on the map are the coordinates stored in this.state.points
        // will render them on the map if there is more than one
        let pointsOnMap = null;
        if (this.state.points.length > 0) {
            pointsOnMap = this.state.points.map((point, i) => (
                <MapboxGL.PointAnnotation
                    key={String(point[0] + point[1])}
                    id={String(point[0] + point[1])}
                    title="Test"
                    coordinate={point}
                >
                    <View style={styles.annotationContainer}>
                        <View style={styles.annotationFill} />
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
        if (this.state.points.length > 1) {
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

                    <HeadingText>Map out an area</HeadingText>

                    <View style={styles.mapContainer}>
                        <MapboxGL.MapView
                            ref={(c) => this._map = c}
                            onPress={this.onPress}
                            style={styles.map}
                            centerCoordinate={[this.state.longitude, this.state.latitude]}
                        >
                            {pointsOnMap}
                            {linesOnMap}
                        </MapboxGL.MapView>
                    </View>

                    <View style={styles.button}>
                        <Button title="Locate Me" onPress={() => this.getLocationHandler('setLocation')} />
                    </View>

                    <PlaceInput
                        placeData={this.state.controls.placeName}
                        onChangeText={this.placeNameChangedHandler}
                    />

                    <DescriptionInput
                        onChangeText={this.descriptionChangedHandler}
                        multiline={true}
                        descriptionData={this.state.controls.description}
                    />


                    <View style={styles.button}>
                        <Button
                            title="Share the Place!"
                            onPress={this.placeAddedHandler}
                            color="orange"
                            disabled={
                                !this.state.controls.placeName.valid ||
                                !this.state.controls.description.valid ||
                                this.state.points.length < 3
                            }
                        />
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
    }
});

const ANNOTATION_SIZE = 20;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#8c8d9f"
    },
    mapContainer: {
        width: '100%',
        alignItems: 'center',
    },
    map: {
        width: "90%",
        height: 400,
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
    calloutContainer: {
        alignItems: "center",
        justifyContent: "center",
        width: 180
    },
    calloutContent: {
        padding: 8,
        flex: 1,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.2)",
        backgroundColor: "white",
        flexDirection: 'row'
    },
    button: {
        margin: 8,
        width: '90%',
    }
});


const mapDispatchToProps = dispatch => {
    return {
        onSubmitFarmArea: (info) => dispatch(submitFarmArea(info)),
        onAddFarmScreen: () => dispatch(addFarmScreen())
    };
};

export default connect(null, mapDispatchToProps)(AddFarm);