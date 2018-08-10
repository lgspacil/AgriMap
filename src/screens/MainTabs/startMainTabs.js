import { Navigation } from 'react-native-navigation';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const startTabs = () => {
    Promise.all([
        Icon.getImageSource(Platform.OS === 'android' ? "md-globe" : "ios-globe", 30),
        Icon.getImageSource(Platform.OS === 'android' ? "md-share-alt" : "ios-share", 30),
        Icon.getImageSource(Platform.OS === 'android' ? "md-menu" : "ios-menu", 30),
        Icon.getImageSource(Platform.OS === 'android' ? "md-card" : "ios-card", 30),
        Icon.getImageSource(Platform.OS === 'android' ? "md-navigate" : "ios-navigate", 30),
        Icon.getImageSource(Platform.OS === 'android' ? "md-locate" : "ios-locate", 30)
    ]).then(sources => {
        console.log('!!!!!', sources);
        Navigation.startTabBasedApp({
            tabs: [
                {
                    screen: "agri-mapp.EarthquakeScreen",
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
                        ],
                        rightButtons: [
                            {
                                icon: sources[3],
                                title: "Card View",
                                id: "rightButtonCardView"
                            }
                        ]
                    }
                },
                {
                    screen: "agri-mapp.AddFarmScreen",
                    label: "Share Place",
                    title: "Share Place",
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
                                icon: sources[5],
                                title: "Menu",
                                id: "sideDrawerToggle"
                            }
                        ],
                        rightButtons: [
                            {
                                icon: sources[3],
                                title: "Card View",
                                id: "rightButtonCardView"
                            }
                        ]
                    }
                },
            ],
            tabsStyle: {
                tabBarSelectedButtonColor: "orange"
            },
            drawer: {
                left: {
                    // screen: "awesome-places.SideDrawer"
                }
            },
            appStyle: {
                tabBarSelectedButtonColor: "orange"
            },
        });
    });
};

export default startTabs;