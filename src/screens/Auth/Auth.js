import React, { Component } from "react";
import startMainTabs from '../MainTabs/startMainTabs';
import {
    View,
    Text,
    Button,
    TextInput,
    StyleSheet,
    ImageBackground,
    Dimensions,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback,
    ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import { AsyncStorage } from "react-native";
import { testSignIn, autoLogin } from "../../store/actions/index";

class Auth extends Component {
    state = {
        loginInfo: {
            name: "",
            email: "",
            password: ""
        }
    };

    componentDidMount() {
        this.getEmailFromStorage();
    }

    getEmailFromStorage = async () => {
        try {
            const email = await AsyncStorage.getItem('email');
            if (email !== null) {
                // We have data!!
                console.log(email);
                this.props.onAutoLogin(email)
            }
        } catch (error) {
            // Error retrieving data
        }
    }

    updateInputState = (key, val) => {
        if (key == "password") {
            this.setState(prevState => {
                return {
                    loginInfo: {
                        ...prevState.loginInfo,
                        password: val
                    }
                }
            })
        } else if (key == "email") {
            this.setState(prevState => {
                return {
                    loginInfo: {
                        ...prevState.loginInfo,
                        email: val
                    }
                }
            })
        } else if (key == "name") {
            this.setState(prevState => {
                return {
                    loginInfo: {
                        ...prevState.loginInfo,
                        name: val
                    }
                }
            })
        };
    };

    loginHandler = () => {
        this.props.onTestSignIn(this.state.loginInfo);

        // startMainTabs();
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput placeholder="Enter Name" onChangeText={val => this.updateInputState("name", val)}></TextInput>
                <TextInput placeholder="Enter Email" onChangeText={val => this.updateInputState("email", val)}></TextInput>
                <TextInput placeholder="Enter Password" onChangeText={val => this.updateInputState("password", val)}></TextInput>
                <Button title="Submit" onPress={this.loginHandler}></Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
    map: {
        height: '90%',
        width: '90%',
        backgroundColor: 'green'
    },
    mapContainer: {
        flex: 2,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center'

    },
    secondBox: {
        flex: 1,
        backgroundColor: 'red'
    }
})

const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onTestSignIn: (info) => dispatch(testSignIn(info)),
        onAutoLogin: (email) => dispatch(autoLogin(email))
        // onTryAuth: (authData, authMode) => dispatch(tryAuth(authData, authMode)),
        // onAutoSignIn: () => dispatch(authAutoSignIn())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);