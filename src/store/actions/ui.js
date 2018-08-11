import { UI_START_LOADING, UI_STOP_LOADING, LOAD_EARTHQUAKES, LOAD_FARMS } from './actionTypes';

export const uiStartLoading = () => {
    return {
        type: UI_START_LOADING
    };
};

export const uiStopLoading = () => {
    return {
        type: UI_STOP_LOADING
    };
};

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