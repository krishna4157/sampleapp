// Import Dependencies
import {
    Image,
    View,
    Dimensions,
    StyleSheet,
} from 'react-native';

const { default: Images } = require('../images/Images');
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

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
        height: SCREEN_HEIGHT,
        width: SCREEN_WIDTH,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageStyle: { resizeMode: 'contain', height: '10%' },
});
