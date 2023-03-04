// Import Dependencies
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

// Import Component
import MapViewScreen from '../Components/MapView';

class MapViewPage extends Component {
    render() {
        const { navigation, screenProps, route } = this.props;
        const item = route?.params?.item;
        return (
            <View style={styles.container}>
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

const styles = StyleSheet.create({
    container: { flex: 1 },
});
