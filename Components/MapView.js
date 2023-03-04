// Import Dependencies
import React from 'react';
import { Image, View, PermissionsAndroid, StyleSheet, Text } from 'react-native';
import MapView, { Callout } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { Marker } from 'react-native-maps';
import { Dimensions } from 'react-native';
import { StatusBar } from 'react-native';
import Images from '../images/Images';
import { getBoundsOfDistance } from 'geolib';

// Import Components
import PolylineComponent from './PolyLineComponent';
import { Loader } from './Loader';
import { Ratings } from './Ratings';
import { SvgImageComponent } from './SvgImage';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const latitudeDelta = 0.0042;
const longitudeDelta = 0.0021;

class MapViewScreen extends React.Component {
  constructor(props) {
    super(props);

    this.cordsRef = React.createRef([]);
    this.mapsRef = React.createRef();
    this.camLoadRef = React.createRef(false);
  }

  state = {
    mapRegion: null,
    hasLocationPermissions: false,
    locationResult: null,
    markedCoordinates: '',
    location: { coords: { latitude: 37.78825, longitude: -122.4324 } },
    coords: [],
    loading: true,
    showDirections: false,
    distanceToDestination: 0,
    ready: false,
  };

  componentDidMount() {
    this.setState({
      loading: true,
    });

    this.getLocationAsync();

    // Interval to get current location every 5 seconds
    this.interval = setInterval(() => {
      this.getCurrentLocation();
    }, 5000);
  }

  // gets current location
  getCurrentLocation = () => {
    const { showDirections, mapRegion } = this.state;

    Geolocation.getCurrentPosition(
      position => {
        let location1 = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        if (!this.camLoadRef.current) {
          this.setCamRegion(location1);
          this.camLoadRef.current = true;
        }
        this.setState({ mapRegion: location1, loading: false });
      },
      error => console.log(error.message),
      { enableHighAccuracy: true, timeout: 1000, maximumAge: 1000 },
    );
    this.watchID = Geolocation.watchPosition(position => {
      const lastPosition = JSON.stringify(position);
      this.setState({ lastPosition });
    });

    if (showDirections) {
      this.getLocationAsync();
      this.getDirections(mapRegion.latitude, mapRegion.longitude);
    }
  };

  // clear interval when screen is unmounted
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  // Zooms the Map to current user location
  setCamRegion(region) {
    const coordinates = region;
    const radiusBoundaries = getBoundsOfDistance(coordinates, 3 * 1000);

    this.mapsRef.fitToCoordinates(radiusBoundaries, {
      edgePadding: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
      },
    });
  }

  // Gets Permission to access location
  getLocationAsync = async () => {
    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Geolocation Permission',
        message: 'Can we access your location?',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (status !== 'granted') {
      this.setState({
        locationResult: 'Permission to access location was denied',
      });
      ('Please turn on location services.');
    } else {
      this.setState({ hasLocationPermissions: true });
    }
  };

  // Sets the location on Tap of Map View
  setlocation = async event => {
    const { mapRegion } = this.state;
    this.setState({
      coords: [],
    });
    const location = {
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
      latitudeDelta: latitudeDelta,
      longitudeDelta: longitudeDelta,
    };
    this.setState({ markedCoordinates: location });

    this.setState({
      loading: true,
    });
    this.getDirections(mapRegion.latitude, mapRegion.longitude);

    setTimeout(() => {
      this.showDirections();
    }, 1000);
  };

  // Gets the Direction Routing
  getDirections = async (latitude, longitude) => {
    const { markedCoordinates } = this.state;
    this.setState({
      loading: true,
    });
    try {
      let resp = await fetch(
        `https://api.tomtom.com/routing/1/calculateRoute/${latitude},${longitude}:${markedCoordinates.latitude},${markedCoordinates.longitude}/json?key=I6ZQpMS93FxiP6lxrwWzxDK2SfS3OVGN`,
      );
      let respJson = await resp.json();

      let lengthInMeters = respJson.routes[0].summary.lengthInMeters;

      this.setState({
        distanceToDestination: lengthInMeters,
        showDirections: true,
      });

      let points = respJson.routes[0].legs[0].points;
      let coords = points.map(point => {
        return {
          latitude: point.latitude,
          longitude: point.longitude,
          latitudeDelta: latitudeDelta,
          longitudeDelta: longitudeDelta,
        };
      });
      this.cordsRef.current = coords;
      this.setState({
        loading: false,
      });
    } catch (error) {
      console.log(error);
      this.setState({
        loading: false,
      });
    }
  };

  // Trigger function to Show Directions
  showDirections = () => {
    const { mapRegion } = this.state;
    this.setState({
      showDirections: true,
    });
    this.getDirections(mapRegion.latitude, mapRegion.longitude);
  };

  render() {
    const { loading, location, markedCoordinates, showDirections } = this.state;
    const { item } = this.props;

    const rating = parseInt(Math.floor(item.rating));
    const floatValue = (item.rating - rating) * 15;

    return (
      <View style={styles.mainContainer}>
        <StatusBar />
        <Image
          source={{ uri: item.images[0].url }}
          style={styles.renderDummyImage}
        />

        <Image source={Images.starFill} style={styles.renderDummyImage} />
        <Image source={Images.starEmpty} style={styles.renderDummyImage} />

        {loading && <Loader />}

        {/* MapView Screen */}
        <MapView
          ref={map => {
            this.mapsRef = map;
          }}
          onPress={event => this.setlocation(event)}
          showsUserLocation={true}
          showsPointsOfInterest={true}
          followsUserLocation={true}
          showsMyLocationButton={true}
          onMapReady={() => {
            this.setState({
              ready: true,
            });
          }}
          style={styles.mapViewStyle}
          showsTraffic={true}>
          {/* Marker on MapView */}
          {markedCoordinates != '' && (
            <Marker key={'2'} coordinate={markedCoordinates}>
              <Image
                source={Images.markerImage}
                style={styles.markedImageStyle}
              />

              {/* Call Out Popup on Tap of Marker */}
              <Callout style={styles.callOutStyle}>
                <View style={styles.imageContainer}>
                  <SvgImageComponent
                    uri={item?.images[0].url}
                    size={40}
                    round={true}
                  />
                </View>
                <View style={styles.titleContainer}>
                  <Text style={styles.titleStyle}>{item.title}</Text>
                  <Ratings rating={rating} floatValue={floatValue} size={15} />
                </View>
              </Callout>
            </Marker>
          )}

          {/* Direction Routing Polylines */}
          {markedCoordinates != '' && !loading && showDirections && (
            <PolylineComponent coords={this.cordsRef.current} />
          )}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1 },
  imageStyle: { resizeMode: 'contain', height: '10%' },
  markedImageStyle: { height: 40, resizeMode: 'contain', width: 80 },
  mapViewStyle: { alignSelf: 'stretch', flex: 1 },
  renderDummyImage: { width: 10, height: 10, position: 'absolute' },
  callOutStyle: {
    borderRadius: 10,
    elevation: 1,
    shadowColor: 'black',
    flexDirection: 'row',
    width: SCREEN_WIDTH / 1.5,
    flex: 1,
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 10,
  },
  imageContainer: {
    borderRadius: 40,
    flex: 1,
    flexWrap: 'wrap',
  },
  titleContainer: { paddingLeft: 10, flex: 5 },
  titleStyle: { color: 'black' },
});

export default MapViewScreen;
