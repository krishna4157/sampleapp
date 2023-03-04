// Import Dependencies
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

// Import Component
import LoginScreen from '../Components/LoginScreen';

class LoginPage extends Component {
    state = {};

    render() {
        const { navigation, screenProps } = this.props;
        return (
            <View style={styles.container}>
                <LoginScreen screenProps={screenProps} navigation={navigation} />
            </View>
        );
    }
}

export default LoginPage;

const styles = StyleSheet.create({
    container: { flex: 1 },
});
