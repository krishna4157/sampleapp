// Import Dependencies
import React, { Component } from 'react';
import { View } from 'react-native';

// Import Component
import MapViewScreen from '../Components/MapView';

class MapViewPage extends Component {
    render() {
        const { navigation, screenProps, route } = this.props;
        const item = route?.params?.item;
        return (
            <View style={{ flex: 1 }}>
                <MapViewScreen
                    item={item}
                    screenProps={screenProps}
                    navigation={navigation}
                />
            </View>
        );
    }
}

export default MapViewPage;


