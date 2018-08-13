import {  LOAD_EARTHQUAKES, LOAD_FARMS, ADD_FARM_SCREEN, FIND_FARM_SCREEN, HEAT_MAP_SCREEN } from './actionTypes';

export const loadEarthQuakes = () => {
    return {
        type: LOAD_EARTHQUAKES
    };
};

export const loadFarms = () => {
    return {
        type: LOAD_FARMS
    };
};

export const addFarmScreen = () => {
    return {
        type: ADD_FARM_SCREEN
    }
}

export const findFarmScreen = () => {
    return {
        type: FIND_FARM_SCREEN
    };
};

export const heatMapScreen = () => {
    return {
        type: HEAT_MAP_SCREEN
    };
};