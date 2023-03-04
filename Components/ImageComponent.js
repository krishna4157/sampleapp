// Import Dependencies
import React from 'react';
import {Image, View, Dimensions, StyleSheet} from 'react-native';

const {default: Images} = require('../images/Images');
const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

//Image UI Component
export const ImageComponent = props => {
  const [loading, setLoading] = React.useState(false);
  const {uri, style} = props;
  return (
    <>
      {loading && (
        <Image
          source={Images.loaderImage}
          style={{
            resizeMode: 'contain',
            ...style,
            position: 'absolute',
            zIndex: 10,
          }}
        />
      )}
      <Image
        source={{uri: uri}}
        style={style}
        onLoadStart={() => {
          setLoading(true);
        }}
        onLoadEnd={() => {
          setLoading(false);
        }}
      />
    </>
  );
};
