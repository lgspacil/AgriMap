import { Navigation } from 'react-native-navigation';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const startTabs = () => {
    Promise.all([
        Icon.getImageSource(Platform.OS === 'android' ? "md-globe" : "ios-globe", 30),
        Icon.getImageSource(Platform.OS === 'android' ? "md-add" : "ios-add", 30),
        Icon.getImageSource(Platform.OS === 'android' ? "md-menu" : "ios-menu", 30),
        Icon.getImageSource(Platform.OS === 'android' ? "md-card" : "ios-card", 30),
        Icon.getImageSource(Platform.OS === 'android' ? "md-navigate" : "ios-navigate", 30),
        Icon.getImageSource(Platform.OS === 'android' ? "md-locate" : "ios-locate", 30)
    ]).then(sources => {
        Navigation.startTabBasedApp({
            tabs: [
                {
                    screen: "agri-mapp.HeatMapScreen",
                    label: "Heat Map",
                    title: "Heat Map",
                    icon: sources[0],
                    navigatorButtons: {
                        leftButtons: [
                            {
                                icon: sources[2],
                                title: "Menu",
                                id: "sideDrawerToggle"
                            }
                        ]
                    }
                },
                {
                    screen: "agri-mapp.AddFarmScreen",
                    label: "Add Farm",
                    title: "Add Farm",
                    icon: sources[1],
                    navigatorButtons: {
                        leftButtons: [
                            {
                                icon: sources[2],
                                title: "Menu",
                                id: "sideDrawerToggle"
                            }
                        ]
                    }
                },
                {
                    screen: "agri-mapp.FindFarmScreen",
                    label: "Find Farm",
                    title: "Find Farm",
                    icon: sources[5],
                    navigatorButtons: {
                        leftButtons: [
                            {
                                icon: sources[2],
                                title: "Menu",
                                id: "sideDrawerToggle"
                            }
                        ]
                    }
                },
            ],
            drawer: {
                left: {
                    screen: "agri-mapp.SideDrawer"
                }
            },
            // the color of the tabs
            appStyle: {
                tabBarSelectedButtonColor: "#88BEA3"
            },
        });
    });
};

export default startTabs;