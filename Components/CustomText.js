// Import Dependencies
import { Dimensions, Text } from 'react-native';

export const CustomText = props => {
    return (
        <Text
            style={[{ fontSize: Dimensions.get('screen').width * 0.04 }, props.style]}>
            {props.children}
        </Text>
    );
};
