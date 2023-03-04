// Import Dependencies
import { Image, View, StyleSheet } from 'react-native';
import { SvgImageComponent } from './SvgImage';
import FullStar from '../images/Star-fill.png';
import StarEmpty from '../images/Star-empty.png';


export const Ratings = ({ rating, floatValue, size }) => {
    const fullStarUri = Image.resolveAssetSource(FullStar).uri;
    const StarEmptyUri = Image.resolveAssetSource(StarEmpty).uri;

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
                            {/* <Image
                                resizeMethod={'resize'}
                                source={Images.starFill}
                            /> */}
                            <View style={styles.starFillStyle}>
                                <SvgImageComponent uri={fullStarUri} size={size} />
                            </View>
                        </View>
                    );
                })}
            {floatValue != 0 &&
                Array(1)
                    .fill(floatValue)
                    .map((v, i) => {
                        return (
                            <View key={i} style={styles.ratingViewContainer2}>
                                <View style={styles.starFillStyle2}>
                                    <SvgImageComponent uri={fullStarUri} size={size} />
                                </View>
                            </View>
                        );
                    })}
            <View style={styles.emptyRatingContainer}>
                {Array(5)
                    .fill(0)
                    .map((v, i) => {
                        return (
                            <View key={i} style={styles.emptyContainer}>
                                <SvgImageComponent uri={StarEmptyUri} size={size} />
                            </View>
                        );
                    })}
            </View>
        </View>
    );
};
