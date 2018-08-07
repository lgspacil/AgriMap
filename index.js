import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import App from './App';

import configureStore from './src/store/configureStore';
const store = configureStore();

// Needed to make this a function since it was expecting one
const RNRedux = () =>(
    <Provider store={store}>
        <App />
    </Provider>
)

AppRegistry.registerComponent('AgriMap', () => RNRedux);
