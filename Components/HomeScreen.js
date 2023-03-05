// Import Dependencies
import React from 'react';
import {
  Image,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Images from '../images/Images';
import { Loader } from './Loader';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('screen');

// Import Components
import { Ratings } from './Ratings';
import { ImageComponent } from './ImageComponent';
import { CustomText } from './CustomText';
import Strings from './Strings';

class HomeScreen extends React.Component {
  state = {
    resList: [],
    loading: true,
    spliceIndex: 1,
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

  navigateToMaps = item => {
    const { navigation } = this.props;
    navigation.navigate('MapScreen', { item: item });
  };

  // UI item of FlatList
  renderItem = ({ item, index }) => {
    const rating = parseInt(Math.floor(item.rating));
    const floatValue = (item.rating - rating) * 15;
    return (
      <View key={index} style={styles.cardStyle}>
        <View style={styles.cardContainer}>
          <View style={styles.firstContainer}>
            {/* Restaurant Image */}
            <ImageComponent
              uri={item.images[0]?.url}
              style={styles.imageStyle}
            />
          </View>
          <View style={styles.secondContainer}>
            {/* title */}
            <CustomText style={styles.titleStyle}>{item.title}</CustomText>

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

  // Returns this UI Component when data is empty
  EmptyComponent = () => {
    const { fetchRestaurantDetails } = this.props;
    return (
      <View style={styles.emptyContainerStyle}>
        <CustomText style={styles.noDataTextStyle}>
          {Strings.noDataText}
        </CustomText>

        <TouchableOpacity
          style={styles.tryAgainStyle}
          onPress={() => {
            fetchRestaurantDetails();
          }}>
          <CustomText style={{ color: 'white' }}>{Strings.tryAgain}</CustomText>
        </TouchableOpacity>
      </View>
    );
  };

  // Returns this UI Component when data needs to load more
  FooterComponent = () => {
    const { resList, spliceIndex } = this.state;

    if (spliceIndex < resList.length && resList.length > 0) {
      return (
        <View style={styles.footerContainer}>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                spliceIndex: spliceIndex + 1,
              });
            }}>
            <CustomText style={styles.loadMoreStyle}>{Strings.loadMore}</CustomText>
          </TouchableOpacity>
        </View>
      );
    } else {
      return <></>;
    }
  };

  render() {
    const { resList, spliceIndex } = this.state;
    const { loading } = this.props;
    const data = resList.length > 0 ? resList.slice(0, spliceIndex) : [];

    return (
      <View style={styles.mainContainer}>
        {loading ? (
          <Loader />
        ) : (
          <FlatList
            contentContainerStyle={styles.contentContainerStyle}
            data={data}
            renderItem={this.renderItem}
            style={styles.flatStyle}
            ListEmptyComponent={this.EmptyComponent}
            ListFooterComponent={this.FooterComponent}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  emptyContainerStyle: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadMoreStyle: { color: 'black' },
  noDataTextStyle: { color: 'black', fontSize: 20, padding: 10 },
  tryAgainStyle: { backgroundColor: '#0077b6', padding: 10, borderRadius: 10 },
  footerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  mainContainer: { flex: 1 },
  flatStyle: { flex: 1, width: '100%', height: '100%', display: 'flex' },
  contentContainerStyle: { flexGrow: 1 },
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
    height: SCREEN_WIDTH / 6,
    width: SCREEN_WIDTH / 6,
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
    height: SCREEN_WIDTH / 8,
    width: SCREEN_WIDTH / 8,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'green',
  },
  mapButtonImage: { height: '100%', width: '100%' },
});

export default HomeScreen;
