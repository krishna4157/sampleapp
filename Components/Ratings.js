// Import Dependencies
import { Image, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
const { default: Images } = require('../images/Images');

export const Ratings = ({ rating, floatValue, size }) => {
    
    const styles = StyleSheet.create({
        mainContainer: { flexDirection: 'row', marginTop: 5 },
        ratingViewContainer: { height: size, width: size, flexWrap: 'wrap' },
        starFillStyle: { margin: 0, height: '100%', width: '100%' },
        ratingViewContainer2: {
            marginLeft: -(size - floatValue),
            backgroundColor: 'transparent',
            height: size,
            width: size,
            flexWrap: 'wrap',
            overflow: 'hidden',
        },
        starFillStyle2: {
            marginLeft: size - floatValue,
            height: '100%',
            width: '100%',
        },
        emptyRatingContainer: {
            position: 'absolute',
            flexDirection: 'row',
            zIndex: -1,
        },
        emptyContainer: { height: size, width: size, flexWrap: 'wrap' },
    });

    return (
        <View style={styles.mainContainer}>
            {Array(rating)
                .fill(0)
                .map((v, i) => {
                    return (
                        <View key={i} style={styles.ratingViewContainer}>
                            <Image
                                style={styles.starFillStyle}
                                resizeMethod={'resize'}
                                source={Images.starFill}
                            />
                        </View>
                    );
                })}
            {floatValue != 0 &&
                Array(1)
                    .fill(floatValue)
                    .map((v, i) => {
                        return (
                            <View key={i} style={styles.ratingViewContainer2}>
                                <Image
                                    style={styles.starFillStyle2}
                                    resizeMethod={'resize'}
                                    source={Images.starFill}
                                />
                            </View>
                        );
                    })}
            <View style={styles.emptyRatingContainer}>
                {Array(5)
                    .fill(0)
                    .map((v, i) => {
                        return (
                            <View key={i} style={styles.emptyContainer}>
                                <Image
                                    style={styles.starFillStyle}
                                    resizeMethod={'resize'}
                                    source={Images.starEmpty}
                                />
                            </View>
                        );
                    })}
            </View>
        </View>
    );
};
