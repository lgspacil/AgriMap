import React, { Component } from "react";
import {
    View,
    Button,
    StyleSheet,
    ImageBackground,
} from "react-native";
import { connect } from "react-redux";
import { AsyncStorage } from "react-native";
import { testSignIn, autoLogin } from "../../store/actions/index";
import DefaultInput from "../../components/UI/DefaultInput/DefaultInput";
import validate from "../../utility/validation";

class Auth extends Component {

    state = {
        controls: {
            email: {
                value: "",
                valid: false,
                validationRules: {
                    isEmail: true
                },
                touched: false
            },
            name: {
                value: "",
                valid: false,
                validationRules: {
                    minLength: 3
                },
                touched: false
            },
            password: {
                value: "",
                valid: false,
                validationRules: {
                    minLength: 3
                },
                touched: false
            }
        }
    };

    componentDidMount() {
        // calling function when component mounts
        this.getEmailFromStorage();
    }

    // Checking the phone's storage for email info
    getEmailFromStorage = async () => {
        try {
            const email = await AsyncStorage.getItem('email');
            if (email !== null) {
                // If we have the email call redux action to onAutoLogin
                // checking if the email is in the DataBase
                this.props.onAutoLogin(email)
            }
        } catch (error) {
            // Error retrieving data
        }
    }

    // Function gets called everytime the user inputs something into the input
    updateInputState = (key, val) => {
        if (key == "password") {
            this.setState(prevState => {
                return {
                    controls: {
                        ...prevState.controls,
                        password: {
                            ...prevState.controls.password,
                            value: val,
                            valid: validate(val, prevState.controls.password.validationRules),
                            touched: true
                        }
                    }
                }
            })
        } else if (key == "email") {
            this.setState(prevState => {
                return {
                    controls: {
                        ...prevState.controls,
                        email: {
                            ...prevState.controls.email,
                            value: val,
                            valid: validate(val, prevState.controls.email.validationRules),
                            touched: true
                        }
                    }
                }
            })
        } else if (key == "name") {
            this.setState(prevState => {
                return {
                    controls: {
                        ...prevState.controls,
                        name: {
                            ...prevState.controls.name,
                            value: val,
                            valid: validate(val, prevState.controls.name.validationRules),
                            touched: true
                        }
                    }
                }
            })
        };
    };

    // when the user submits the information we send this info to redux
    loginHandler = () => {
        this.props.onTestSignIn({name: this.state.controls.name.value, password: this.state.controls.password.value, email: this.state.controls.email.value});
    }

    render() {
        return (
            <ImageBackground source={require("../../assets/farm.png")} style={styles.backgroundImage} >
                <View style={styles.container}>
                    <DefaultInput
                        placeholder="Enter Name"
                        onChangeText={val => this.updateInputState("name", val)}
                        value={this.state.controls.name.value}
                        valid={this.state.controls.name.valid}
                    />
                    <DefaultInput
                        placeholder="Enter Email"
                        onChangeText={val => this.updateInputState("email", val)}
                        keyboardType="email-address"
                        value={this.state.controls.email.value}
                        valid={this.state.controls.email.valid}
                    />
                    <DefaultInput
                        placeholder="Enter Password"
                        onChangeText={val => this.updateInputState("password", val)}
                        value={this.state.controls.password.value}
                        valid={this.state.controls.password.valid}
                        secureTextEntry
                    />
                    <Button 
                        title="Login" 
                        onPress={this.loginHandler}
                        color="#ffcf5a"
                        disabled={!this.state.controls.password.valid ||
                        !this.state.controls.name.valid ||
                        !this.state.controls.email.valid}></Button>
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        width: "100%",
        height: "100%"
    },
    container: {
        flex: 1,
        flexDirection: "column",
    }
})


const mapDispatchToProps = dispatch => {
    return {
        onTestSignIn: (info) => dispatch(testSignIn(info)),
        onAutoLogin: (email) => dispatch(autoLogin(email))
    };
};

export default connect(null, mapDispatchToProps)(Auth);