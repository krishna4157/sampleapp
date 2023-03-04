// Import Dependencies
import {
    Image,
    View,
    Dimensions,
    StyleSheet,
} from 'react-native';

const { default: Images } = require('../images/Images');

//Loader UI Component
export const Loader = () => {
    return (
        <View style={styles.mainContainer}>
            <Image source={Images.loaderImage} style={styles.imageStyle} />
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        position: 'absolute',
        zIndex: 1,
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageStyle: { resizeMode: 'contain', height: '10%' },
});
