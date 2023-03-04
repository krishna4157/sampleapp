// Import Dependencies
import React from 'react';
import { Image } from 'react-native';

const { default: Images } = require('../images/Images');

//Image UI Component
export const ImageComponent = props => {
    const [loading, setLoading] = React.useState(false);
    const { uri, style } = props;
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
                resizeMode="cover"
                source={{ uri: uri }}
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
