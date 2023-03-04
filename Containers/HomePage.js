// Import Dependencies
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

// Import Component
import HomeScreen from '../Components/HomeScreen';

class HomePage extends Component {
    state = {
        loading : true
    };
    componentDidMount(){
        this.props.fetchRestaurantDetails();
    }

    componentDidUpdate(prevProps,prevState){
        if(prevProps.restaurantDataList != this.props.restaurantDataList){
            this.setState({
                loading : false
            })
        }
    }

    render() {
        const { navigation, screenProps, restaurantDataList, loading} = this.props;
        return (
            <View style={{ flex: 1 }}>
                <HomeScreen loading={loading} restaurantDataList={restaurantDataList} screenProps={screenProps} navigation={navigation} />
            </View>
        );
    }
}

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
    // Redux Store --> Component
    return {
      restaurantDataList: state.restaurantDataList.restaurantDataList,
      loading: state.restaurantDataList.loading,
      
    };
  };

  // Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
  const mapDispatchToProps = (dispatch) => {
    // Action
    return {
      // fetch Restaurant Data
      fetchRestaurantDetails: () => dispatch({
        type: 'FETCH_DATA'
      }),
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

