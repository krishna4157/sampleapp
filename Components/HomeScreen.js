// Import Dependencies
import React from 'react';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import Images from '../images/Images';
import { Loader } from './Loader';

// Import Components
import { Ratings } from './Ratings';

class HomeScreen extends React.Component {
  state = {
    resList: [],
    loading: true,
  };

  componentDidUpdate(prevProps, prevState) {
    const { restaurantDataList } = this.props;
    if (prevProps.restaurantDataList != restaurantDataList) {
      this.setState({
        resList: restaurantDataList,
        loading: false,
      });
    }
  }

  componentDidMount() {
    const { restaurantDataList } = this.props;
    this.setState({
      resList: restaurantDataList,
      loading: false,
    });
  }

  navigateToMaps = (item) => {
    const { navigation } = this.props;
    navigation.navigate('MapScreen', { item: item });
  }

  // UI item of FlatList
  renderItem = ({ item, index }) => {
    const rating = parseInt(Math.floor(item.rating));
    const floatValue = (item.rating - rating) * 15;
    return (
      <View key={index} style={styles.cardStyle}>
        <View style={styles.cardContainer}>
          <View style={styles.firstContainer}>
            {/* Restaurant Image */}
            <Image
              source={{ uri: item.images[0].url }}
              style={styles.imageStyle}
            />
          </View>
          <View style={styles.secondContainer}>
            {/* title */}
            <Text style={styles.titleStyle}>{item.title}</Text>

            {/* Rating Component */}
            <Ratings rating={rating} floatValue={floatValue} size={15} />
          </View>

          {/* {Button to navigate MapScreen} */}
          <View style={styles.thirdContainer}>
            <TouchableOpacity
              onPress={() => this.navigateToMaps(item)}
              style={styles.mapButton}>
              <Image
                source={Images.mapImage}
                resizeMode={'center'}
                style={styles.mapButtonImage}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  render() {
    const { resList } = this.state;
    const { loading } = this.props;

    return (
      <View style={styles.mainContainer}>
        {loading ? (
          <Loader />
        ) : (
          <FlatList data={resList} renderItem={this.renderItem} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1 },
  cardStyle: {
    elevation: 5,
    backgroundColor: 'white',
    width: '90%',
    margin: 5,
    padding: 15,
    alignSelf: 'center',
    borderRadius: 15,
  },
  cardContainer: { flex: 1, flexDirection: 'row' },

  firstContainer: { flex: 1.5 },
  imageStyle: {
    height: 60,
    width: 60,
    overflow: 'hidden',
    borderRadius: 5,
  },
  secondContainer: { flex: 3.5, alignSelf: 'center' },
  titleStyle: { color: 'black', fontWeight: 'bold' },
  thirdContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  mapButton: {
    height: 40,
    width: 40,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'green',
  },
  mapButtonImage: { height: '100%', width: '100%' },
});

export default HomeScreen;
