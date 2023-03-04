// Import Dependencies
import React, { Component } from 'react';
import { View } from 'react-native';

// Import Component
import LoginScreen from '../Components/LoginScreen';

class LoginPage extends Component {
    state = {};

    render() {
        const { navigation, screenProps } = this.props;
        return (
            <View style={{ flex: 1 }}>
                <LoginScreen screenProps={screenProps} navigation={navigation} />
            </View>
        );
    }
}

export default LoginPage;
