// Import Dependencies
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Loader } from '../Components/Loader';

// Import Component
import LoginScreen from '../Components/LoginScreen';

class LoginPage extends Component {
    state = {};

    render() {
        const { loading } = this.props;
        return (
            <View style={styles.container}>
                {loading && <Loader />}
                <LoginScreen {...this.props} />
            </View>
        );
    }
}

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = state => {
    // Redux Store --> Component
    return {
        restaurantDataList: state.restaurantDataList.restaurantDataList,
        loading: state.restaurantDataList.loading,
        loginState: state.restaurantDataList.loginState,
        loginFailed : state.restaurantDataList.loginFailed
    };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = dispatch => {
    // Action
    return {
        // fetch login Data
        fetchLoginDetails: data =>
            dispatch({
                type: 'FETCH_LOGIN_DATA',
                params: data,
            }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

const styles = StyleSheet.create({
    container: { flex: 1 },
});
